import { existsSync, lstatSync, readFileSync, realpathSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const SAFE_SQL_IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/;
const SAFE_SCHEMA_PATH = /^apps\/server\/db\/(?:[A-Za-z0-9_-][A-Za-z0-9_.-]*\/)*[A-Za-z0-9_-][A-Za-z0-9_.-]*$/;
const WEBSITE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const RUNTIME_CONTRACT_PATH = ".skywork/crm/templates/runtime-contract.json";
const OPERATION_KINDS = new Set(["list", "read", "create", "update", "archive", "delete", "adjust", "reserve", "release", "transition"]);
const RELATIONSHIP_CARDINALITIES = new Set(["one_to_one", "many_to_one", "one_to_many", "many_to_many"]);
const STATE_NAME = /^[A-Za-z_][A-Za-z0-9_-]*$/;

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function inside(root, candidate) {
  const rel = relative(root, candidate);
  return rel === "" || (!rel.startsWith(`..${sep}`) && rel !== ".." && !isAbsolute(rel));
}

function findWorkspaceRoot(start, manifestPath) {
  let cursor = resolve(start);
  while (true) {
    if (existsSync(resolve(cursor, manifestPath))) return cursor;
    const parent = dirname(cursor);
    if (parent === cursor) return null;
    cursor = parent;
  }
}

function isSafeRelativePath(value, placeholder) {
  if (typeof value !== "string" || !value || isAbsolute(value)) return false;
  const normalized = placeholder ? value.replace(placeholder, "safe-id") : value;
  return inside("/contract-root", resolve("/contract-root", normalized));
}

function isPathWithinPrefix(value, prefix) {
  if (!isSafeRelativePath(value)) return false;
  const root = "/contract-root";
  return inside(resolve(root, prefix), resolve(root, value));
}

function hasOnlyKeys(value, keys) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  return actual.length === expected.length && actual.every((key, index) => key === expected[index]);
}

function isIdentifier(value) {
  return typeof value === "string" && value.length <= 128 && SAFE_SQL_IDENTIFIER.test(value);
}

function isStateName(value) {
  return typeof value === "string" && value.length <= 128 && STATE_NAME.test(value);
}

function loadRuntimeContract(crmRoot) {
  const path = resolve(crmRoot, RUNTIME_CONTRACT_PATH);
  if (!existsSync(path)) throw new Error(`missing ${RUNTIME_CONTRACT_PATH}`);
  const contract = readJson(path);
  const paths = contract.paths ?? {};
  const identity = contract.identity ?? {};
  const ownership = contract.ownership ?? {};
  if (
    contract.schemaVersion !== 2 ||
    contract.id !== "crm-runtime-contract-v2" ||
    !isSafeRelativePath(paths.workspaceManifest) ||
    !isSafeRelativePath(paths.sourceRegistry) ||
    !isSafeRelativePath(paths.sourceRegistrySchema) ||
    !isSafeRelativePath(paths.adapterPattern, "<websiteId>") ||
    !paths.adapterPattern.includes("<websiteId>") ||
    identity.crmAppType !== "crm" ||
    identity.sourceAppType !== "website" ||
    identity.bindingSourceIdField !== "websiteId" ||
    identity.querySourceIdField !== "sourceWebsiteId" ||
    identity.querySourceNameField !== "sourceName" ||
    !Array.isArray(identity.supportStatuses) ||
    identity.supportStatuses.join(",") !== "supported,unsupported" ||
    ownership.sourceEntityOwner !== "website" ||
    ownership.crmTablePrefix !== "crm_"
  ) {
    throw new Error("invalid CRM runtime contract");
  }
  const registrySchemaPath = resolve(crmRoot, paths.sourceRegistrySchema);
  if (!existsSync(registrySchemaPath)) throw new Error(`missing ${paths.sourceRegistrySchema}`);
  const registrySchema = readJson(registrySchemaPath);
  if (
    registrySchema.$id !== "https://skywork.ai/schemas/crm/source-registry-v2.json" ||
    registrySchema.additionalProperties !== false ||
    !Array.isArray(registrySchema.required) ||
    registrySchema.required.join(",") !== "schemaVersion,sources"
  ) {
    throw new Error("invalid CRM source registry schema");
  }
  return contract;
}

function normalizeEntry(entry) {
  return {
    ...entry,
    type: entry.type || "website",
    name: entry.name || entry.websiteId
  };
}

function safeProjectRoot(workspaceRoot, projectPath) {
  if (typeof projectPath !== "string" || !projectPath || isAbsolute(projectPath)) return null;
  const lexical = resolve(workspaceRoot, projectPath);
  if (!inside(workspaceRoot, lexical) || !existsSync(lexical)) return null;
  if (lstatSync(lexical).isSymbolicLink()) return null;
  const workspaceReal = realpathSync(workspaceRoot);
  const projectReal = realpathSync(lexical);
  return inside(workspaceReal, projectReal) ? projectReal : null;
}

function validateRelationship(relationship) {
  if (!relationship || typeof relationship !== "object") return "relationship must be an object";
  if (!hasOnlyKeys(relationship, ["targetEntity", "cardinality", "required"])) return "relationship has unsupported or missing fields";
  if (!isIdentifier(relationship.targetEntity)) return "relationship has an invalid targetEntity";
  if (!RELATIONSHIP_CARDINALITIES.has(relationship.cardinality)) return `relationship to ${relationship.targetEntity} has an invalid cardinality`;
  if (typeof relationship.required !== "boolean") return `relationship to ${relationship.targetEntity} must declare required`;
  return null;
}

function validateTransition(transition) {
  if (!transition || typeof transition !== "object") return "transition must be an object";
  if (!hasOnlyKeys(transition, ["from", "to"])) return "transition has unsupported or missing fields";
  if (!Array.isArray(transition.from) || transition.from.length === 0 || transition.from.some((state) => !isStateName(state)) || new Set(transition.from).size !== transition.from.length) return "transition has invalid from states";
  if (!isStateName(transition.to)) return "transition has an invalid target state";
  return null;
}

function validatePreconditions(preconditions) {
  if (!preconditions || typeof preconditions !== "object") return "preconditions must be an object";
  if (!hasOnlyKeys(preconditions, ["statusIn"])) return "preconditions have unsupported or missing fields";
  if (!Array.isArray(preconditions.statusIn) || preconditions.statusIn.length === 0 || preconditions.statusIn.some((state) => !isStateName(state)) || new Set(preconditions.statusIn).size !== preconditions.statusIn.length) return "preconditions have invalid statusIn states";
  return null;
}

function validateOperation(operation) {
  if (!operation || typeof operation !== "object") return "operation must be an object";
  const supportedKeys = ["id", "kind", "adapterMethod", "requiredRelations", "transition", "preconditions"];
  if (Object.keys(operation).some((key) => !supportedKeys.includes(key))) return "operation has unsupported fields";
  if (!isIdentifier(operation.id)) return "operation has an invalid id";
  if (!OPERATION_KINDS.has(operation.kind)) return `operation ${operation.id} has an invalid kind`;
  if (!isIdentifier(operation.adapterMethod)) return `operation ${operation.id} has an invalid adapterMethod`;
  if (operation.requiredRelations !== undefined && (!Array.isArray(operation.requiredRelations) || operation.requiredRelations.some((relation) => !isIdentifier(relation)) || new Set(operation.requiredRelations).size !== operation.requiredRelations.length)) return `operation ${operation.id} has invalid requiredRelations`;
  if (operation.kind === "transition") {
    const transitionReason = validateTransition(operation.transition);
    if (transitionReason) return `operation ${operation.id} ${transitionReason}`;
  } else if (operation.transition !== undefined) {
    return `operation ${operation.id} may only declare transition when kind is transition`;
  }
  if (operation.preconditions !== undefined) {
    const preconditionReason = validatePreconditions(operation.preconditions);
    if (preconditionReason) return `operation ${operation.id} ${preconditionReason}`;
  }
  return null;
}

function validateEntity(entity) {
  if (!entity || typeof entity !== "object") return "entity binding must be an object";
  if (!hasOnlyKeys(entity, ["entity", "tableName", "schemaPath", "exportName", "primaryKey", "relationships", "operations"])) return "entity binding has unsupported or missing fields";
  if (!isIdentifier(entity.entity)) return "entity binding has an invalid entity";
  if (!isIdentifier(entity.tableName)) return `${entity.entity} has an invalid tableName`;
  if (!SAFE_SCHEMA_PATH.test(entity.schemaPath ?? "") || !isPathWithinPrefix(entity.schemaPath, "apps/server/db")) return `${entity.entity} has an invalid schemaPath`;
  if (!isIdentifier(entity.exportName)) return `${entity.entity} has an invalid exportName`;
  if (!isIdentifier(entity.primaryKey)) return `${entity.entity} has an invalid primaryKey`;
  if (!Array.isArray(entity.relationships)) return `${entity.entity} has invalid relationships`;
  for (const relationship of entity.relationships) {
    const relationshipReason = validateRelationship(relationship);
    if (relationshipReason) return `${entity.entity} ${relationshipReason}`;
  }
  if (new Set(entity.relationships.map((relationship) => relationship.targetEntity)).size !== entity.relationships.length) return `${entity.entity} has duplicate relationships`;
  if (!Array.isArray(entity.operations) || entity.operations.length === 0) return `${entity.entity} has invalid operations`;
  for (const operation of entity.operations) {
    const operationReason = validateOperation(operation);
    if (operationReason) return `${entity.entity} ${operationReason}`;
  }
  if (new Set(entity.operations.map((operation) => operation.id)).size !== entity.operations.length) return `${entity.entity} has duplicate operation IDs`;
  return null;
}

function validateEntityRelationships(source, websiteId) {
  const reasons = [];
  const entityNames = new Set(source.entities.map((entity) => entity.entity));
  for (const entity of source.entities) {
    if (!Array.isArray(entity.relationships) || !Array.isArray(entity.operations)) continue;
    const requiredRelations = new Set(entity.relationships.filter((relationship) => relationship.required).map((relationship) => relationship.targetEntity));
    for (const relationship of entity.relationships) {
      if (!entityNames.has(relationship.targetEntity)) reasons.push(`${websiteId}: ${entity.entity} relationship references unknown entity ${relationship.targetEntity}`);
    }
    for (const operation of entity.operations) {
      if (!Array.isArray(operation.requiredRelations)) continue;
      for (const targetEntity of operation.requiredRelations) {
        if (!requiredRelations.has(targetEntity)) reasons.push(`${websiteId}: ${entity.entity}.${operation.id} requires a required relationship to ${targetEntity}`);
      }
    }
  }
  return reasons;
}

function validateAdapters(crmRoot, supportedSources, contract) {
  const reasons = [];
  for (const source of supportedSources) {
    const adapterRelativePath = contract.paths.adapterPattern.replace("<websiteId>", source.websiteId);
    const adapterPath = resolve(crmRoot, adapterRelativePath);
    if (!existsSync(adapterPath)) {
      reasons.push(`missing typed adapter for ${source.websiteId}`);
      continue;
    }
    const adapter = readFileSync(adapterPath, "utf8");
    for (const entity of source.entities) {
      if (!adapter.includes(entity.tableName) || !adapter.includes(entity.exportName)) reasons.push(`adapter ${source.websiteId} does not cover ${entity.entity}`);
      for (const operation of entity.operations) {
        if (!adapter.includes(operation.adapterMethod)) reasons.push(`adapter ${source.websiteId} is missing method ${operation.adapterMethod} for ${entity.entity}.${operation.id}`);
      }
    }
  }
  return reasons;
}

function validateCrmMigrations(crmRoot, crmTablePrefix) {
  const migrationRoot = resolve(crmRoot, "apps/server/migrations");
  if (!existsSync(migrationRoot)) return ["missing apps/server/migrations"];
  const reasons = [];
  const migrationNames = ["000_crm_auth.sql", "010_crm_support.sql"];
  for (const name of migrationNames) {
    const path = resolve(migrationRoot, name);
    if (!existsSync(path)) {
      reasons.push(`missing ${name}`);
      continue;
    }
    const sql = readFileSync(path, "utf8");
    const targets = [...sql.matchAll(/\b(?:CREATE\s+TABLE(?:\s+IF\s+NOT\s+EXISTS)?|ALTER\s+TABLE|DROP\s+TABLE(?:\s+IF\s+EXISTS)?)\s+([A-Za-z_][A-Za-z0-9_]*)/gi)].map((match) => match[1]);
    for (const target of targets) if (!target.toLowerCase().startsWith(crmTablePrefix)) reasons.push(`${name} touches non-CRM object ${target}`);
  }
  return reasons;
}

export function inspectCrmState({ cwd = process.cwd() } = {}) {
  try {
    const crmRoot = realpathSync(resolve(cwd));
    const contract = loadRuntimeContract(crmRoot);
    const workspaceRoot = findWorkspaceRoot(crmRoot, contract.paths.workspaceManifest);
    if (!workspaceRoot) return { state: "invalid", contractValid: false, reasons: [`Workspace ${contract.paths.workspaceManifest} was not found`] };

    const manifest = readJson(resolve(workspaceRoot, contract.paths.workspaceManifest));
    if (manifest.schemaVersion !== 2 || manifest.kind !== "businessWebApps" || !Array.isArray(manifest.webApps)) {
      return { state: "invalid", contractValid: false, reasons: ["Workspace web-apps.json must use schemaVersion 2 and kind businessWebApps"] };
    }
    const entries = manifest.webApps.map(normalizeEntry);
    const entryIds = entries.map((entry) => entry.websiteId);
    if (entryIds.some((websiteId) => !WEBSITE_ID.test(websiteId ?? "")) || new Set(entryIds).size !== entryIds.length) {
      return { state: "invalid", contractValid: false, reasons: ["Workspace web-apps.json has invalid or duplicate Website IDs"] };
    }
    const crmEntries = entries.filter((entry) => entry.type === contract.identity.crmAppType);
    if (crmEntries.length !== 1) return { state: "mismatch", contractValid: false, reasons: ["Workspace must contain exactly one type=crm entry"] };
    const crmEntry = crmEntries[0];
    const declaredCrmRoot = safeProjectRoot(workspaceRoot, crmEntry.path);
    if (!declaredCrmRoot || declaredCrmRoot !== crmRoot) {
      return { state: "mismatch", contractValid: false, reasons: ["Current project is not the Workspace CRM entry"] };
    }

    const websiteEntries = entries.filter((entry) => entry.type === contract.identity.sourceAppType);
    if (websiteEntries.length === 0) return { state: "mismatch", contractValid: false, reasons: ["CRM requires at least one type=website source"] };
    for (const entry of websiteEntries) {
      if (!safeProjectRoot(workspaceRoot, entry.path)) return { state: "invalid", contractValid: false, reasons: [`Website project path is invalid: ${entry.websiteId}`] };
    }

    const registryPath = resolve(crmRoot, contract.paths.sourceRegistry);
    if (!existsSync(registryPath)) return { state: "mismatch", contractValid: false, reasons: [`missing ${contract.paths.sourceRegistry}`] };
    const registry = readJson(registryPath);
    if (!hasOnlyKeys(registry, ["schemaVersion", "sources"]) || registry.schemaVersion !== 2 || !Array.isArray(registry.sources)) {
      return { state: "mismatch", contractValid: false, reasons: ["invalid CRM source registry header"] };
    }

    const expectedById = new Map(websiteEntries.map((entry) => [entry.websiteId, entry]));
    const sourceById = new Map(registry.sources.map((source) => [source.websiteId, source]));
    const reasons = [];
    if (sourceById.size !== registry.sources.length) reasons.push("source registry contains duplicate Website entries");
    for (const entry of websiteEntries) {
      const source = sourceById.get(entry.websiteId);
      if (!source) {
        reasons.push(`missing source decision for ${entry.websiteId}`);
        continue;
      }
      if (!hasOnlyKeys(source, ["websiteId", "name", "supportStatus", "entities"])) reasons.push(`source has unsupported or missing fields: ${entry.websiteId}`);
      if (typeof source.name !== "string" || !source.name.trim() || source.name.length > 160 || source.name !== entry.name) reasons.push(`source metadata does not match manifest for ${entry.websiteId}`);
      if (!contract.identity.supportStatuses.includes(source.supportStatus)) reasons.push(`invalid supportStatus for ${entry.websiteId}`);
      if (!Array.isArray(source.entities)) reasons.push(`missing entities for ${entry.websiteId}`);
      else if (source.supportStatus === "unsupported" && source.entities.length !== 0) reasons.push(`unsupported source must not declare entities: ${entry.websiteId}`);
      else if (source.supportStatus === "supported") {
        if (source.entities.length === 0) reasons.push(`supported source has no entities: ${entry.websiteId}`);
        const sourceRoot = safeProjectRoot(workspaceRoot, entry.path);
        const entityNames = new Set();
        for (const entity of source.entities) {
          const entityReason = validateEntity(entity);
          if (entityReason) reasons.push(`${entry.websiteId}: ${entityReason}`);
          if (entityNames.has(entity.entity)) reasons.push(`${entry.websiteId}: duplicate entity ${entity.entity}`);
          entityNames.add(entity.entity);
          if (sourceRoot && isPathWithinPrefix(entity.schemaPath, "apps/server/db") && !existsSync(resolve(sourceRoot, entity.schemaPath))) reasons.push(`${entry.websiteId}: missing schema file ${entity.schemaPath}`);
        }
        reasons.push(...validateEntityRelationships(source, entry.websiteId));
      }
    }
    for (const source of registry.sources) if (!expectedById.has(source.websiteId)) reasons.push(`registry contains unknown Website ${source.websiteId}`);
    if (reasons.length) return { state: "mismatch", contractValid: false, reasons };

    const supportedSources = registry.sources.filter((source) => source.supportStatus === "supported");
    if (supportedSources.length === 0) return { state: "mismatch", contractValid: false, reasons: ["CRM requires at least one supported Website source"] };
    const deterministicReasons = [
      ...validateAdapters(crmRoot, supportedSources, contract),
      ...validateCrmMigrations(crmRoot, contract.ownership.crmTablePrefix)
    ];
    if (deterministicReasons.length) return { state: "invalid", contractValid: false, reasons: deterministicReasons };

    return {
      state: "ready",
      contractValid: true,
      workspaceRoot,
      crmWebsiteId: crmEntry.websiteId,
      sourceWebsiteIds: websiteEntries.map((entry) => entry.websiteId),
      supportedSourceWebsiteIds: supportedSources.map((source) => source.websiteId),
      reasons: []
    };
  } catch (error) {
    return { state: "invalid", contractValid: false, reasons: [error instanceof Error ? error.message : "CRM state inspection failed"] };
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = inspectCrmState();
  process.stdout.write(`${JSON.stringify(result)}\n`);
  if (result.state !== "ready") process.exitCode = 1;
}
