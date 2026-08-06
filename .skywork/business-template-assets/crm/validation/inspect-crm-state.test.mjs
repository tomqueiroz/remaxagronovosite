import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { inspectCrmState } from "./inspect-crm-state.mjs";

const tempRoot = mkdtempSync(resolve(tmpdir(), "crm-inspector-"));
const sourceWebsiteId = "019f1234-5678-7abc-8def-0123456789ab";
const crmWebsiteId = "019f1234-5678-7abc-8def-0123456789ac";

function writeJson(path, value) {
  mkdirSync(resolve(path, ".."), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function setup() {
  const workspace = resolve(tempRoot, crypto.randomUUID());
  const website = resolve(workspace, `web_apps/${sourceWebsiteId}`);
  const crm = resolve(workspace, `web_apps/${crmWebsiteId}`);
  mkdirSync(resolve(website, "apps/server/db"), { recursive: true });
  mkdirSync(resolve(crm, "apps/server/crm/adapters"), { recursive: true });
  mkdirSync(resolve(crm, "apps/server/migrations"), { recursive: true });
  mkdirSync(resolve(crm, ".skywork/crm/templates"), { recursive: true });
  cpSync(resolve(new URL("../runtime-contract.json", import.meta.url).pathname), resolve(crm, ".skywork/crm/templates/runtime-contract.json"));
  cpSync(resolve(new URL("../source-registry.schema.json", import.meta.url).pathname), resolve(crm, ".skywork/crm/templates/source-registry.schema.json"));
  writeFileSync(resolve(website, "apps/server/db/schema.ts"), "export const customers = {};\nexport const orders = {};\n");
  writeJson(resolve(workspace, ".skywork/web-apps.json"), {
    schemaVersion: 2,
    kind: "businessWebApps",
    webApps: [
      { websiteId: sourceWebsiteId, type: "website", name: "Store", path: `web_apps/${sourceWebsiteId}`, template: "self-host" },
      { websiteId: crmWebsiteId, type: "crm", name: "CRM", path: `web_apps/${crmWebsiteId}`, template: "self-host" }
    ]
  });
  writeJson(resolve(crm, "apps/server/crm/source-registry.json"), {
    schemaVersion: 2,
    sources: [{
      websiteId: sourceWebsiteId,
      name: "Store",
      supportStatus: "supported",
      entities: [
        {
          entity: "customers",
          tableName: "customers",
          schemaPath: "apps/server/db/schema.ts",
          exportName: "customers",
          primaryKey: "id",
          relationships: [],
          operations: [
            { id: "list", kind: "list", adapterMethod: "listCustomers" },
            { id: "create", kind: "create", adapterMethod: "createCustomer" }
          ]
        },
        {
          entity: "orders",
          tableName: "orders",
          schemaPath: "apps/server/db/schema.ts",
          exportName: "orders",
          primaryKey: "id",
          relationships: [{ targetEntity: "customers", cardinality: "many_to_one", required: true }],
          operations: [
            { id: "list", kind: "list", adapterMethod: "listOrders" },
            { id: "create", kind: "create", adapterMethod: "createOrder", requiredRelations: ["customers"] },
            { id: "confirm", kind: "transition", adapterMethod: "confirmOrder", transition: { from: ["draft"], to: "confirmed" } }
          ]
        }
      ]
    }]
  });
  writeFileSync(resolve(crm, `apps/server/crm/adapters/${sourceWebsiteId}.ts`), [
    'export const customers = { tableName: "customers", exportName: "customers" };',
    'export const orders = { tableName: "orders", exportName: "orders" };',
    "export async function listCustomers() {}",
    "export async function createCustomer() {}",
    "export async function listOrders() {}",
    "export async function createOrder() {}",
    "export async function confirmOrder() {}"
  ].join("\n"));
  const presetRoot = resolve(new URL("../auth/local-admin-v1/overlay/apps/server/migrations", import.meta.url).pathname);
  cpSync(presetRoot, resolve(crm, "apps/server/migrations"), { recursive: true });
  return { workspace, website, crm };
}

try {
  const ready = setup();
  assert.equal(inspectCrmState({ cwd: ready.crm }).state, "ready");

  const wrongCurrentProject = setup();
  assert.equal(inspectCrmState({ cwd: wrongCurrentProject.website }).state, "invalid");

  const missingSource = setup();
  const registryPath = resolve(missingSource.crm, "apps/server/crm/source-registry.json");
  const registry = JSON.parse(await import("node:fs").then(({ readFileSync }) => readFileSync(registryPath, "utf8")));
  registry.sources = [];
  writeJson(registryPath, registry);
  assert.equal(inspectCrmState({ cwd: missingSource.crm }).state, "mismatch");

  const legacyHeader = setup();
  const legacyRegistryPath = resolve(legacyHeader.crm, "apps/server/crm/source-registry.json");
  const legacyRegistry = JSON.parse(await import("node:fs").then(({ readFileSync }) => readFileSync(legacyRegistryPath, "utf8")));
  legacyRegistry.workspaceId = "workspace-1";
  writeJson(legacyRegistryPath, legacyRegistry);
  assert.equal(inspectCrmState({ cwd: legacyHeader.crm }).state, "mismatch");

  const missingAdapter = setup();
  rmSync(resolve(missingAdapter.crm, `apps/server/crm/adapters/${sourceWebsiteId}.ts`));
  assert.equal(inspectCrmState({ cwd: missingAdapter.crm }).state, "invalid");

  const missingAdapterMethod = setup();
  const missingAdapterMethodRegistryPath = resolve(missingAdapterMethod.crm, "apps/server/crm/source-registry.json");
  const missingAdapterMethodRegistry = JSON.parse(await import("node:fs").then(({ readFileSync }) => readFileSync(missingAdapterMethodRegistryPath, "utf8")));
  missingAdapterMethodRegistry.sources[0].entities[1].operations[1].adapterMethod = "createOrderWithoutAdapter";
  writeJson(missingAdapterMethodRegistryPath, missingAdapterMethodRegistry);
  const missingAdapterMethodResult = inspectCrmState({ cwd: missingAdapterMethod.crm });
  assert.equal(missingAdapterMethodResult.state, "invalid");
  assert.match(missingAdapterMethodResult.reasons.join("\n"), /createOrderWithoutAdapter/);

  const escapingSchemaPath = setup();
  const escapingRegistryPath = resolve(escapingSchemaPath.crm, "apps/server/crm/source-registry.json");
  const escapingRegistry = JSON.parse(await import("node:fs").then(({ readFileSync }) => readFileSync(escapingRegistryPath, "utf8")));
  escapingRegistry.sources[0].entities[0].schemaPath = "apps/server/db/../../../outside.ts";
  writeJson(escapingRegistryPath, escapingRegistry);
  assert.equal(inspectCrmState({ cwd: escapingSchemaPath.crm }).state, "mismatch");

  const invalidOperation = setup();
  const invalidOperationRegistryPath = resolve(invalidOperation.crm, "apps/server/crm/source-registry.json");
  const invalidOperationRegistry = JSON.parse(await import("node:fs").then(({ readFileSync }) => readFileSync(invalidOperationRegistryPath, "utf8")));
  invalidOperationRegistry.sources[0].entities[0].operations[0].id = "not an operation";
  writeJson(invalidOperationRegistryPath, invalidOperationRegistry);
  assert.equal(inspectCrmState({ cwd: invalidOperation.crm }).state, "mismatch");

  const duplicateOperation = setup();
  const duplicateOperationRegistryPath = resolve(duplicateOperation.crm, "apps/server/crm/source-registry.json");
  const duplicateOperationRegistry = JSON.parse(await import("node:fs").then(({ readFileSync }) => readFileSync(duplicateOperationRegistryPath, "utf8")));
  duplicateOperationRegistry.sources[0].entities[1].operations[1].id = "list";
  writeJson(duplicateOperationRegistryPath, duplicateOperationRegistry);
  assert.equal(inspectCrmState({ cwd: duplicateOperation.crm }).state, "mismatch");

  const missingCustomerRelation = setup();
  const missingCustomerRelationRegistryPath = resolve(missingCustomerRelation.crm, "apps/server/crm/source-registry.json");
  const missingCustomerRelationRegistry = JSON.parse(await import("node:fs").then(({ readFileSync }) => readFileSync(missingCustomerRelationRegistryPath, "utf8")));
  missingCustomerRelationRegistry.sources[0].entities[1].relationships[0].required = false;
  writeJson(missingCustomerRelationRegistryPath, missingCustomerRelationRegistry);
  const missingCustomerRelationResult = inspectCrmState({ cwd: missingCustomerRelation.crm });
  assert.equal(missingCustomerRelationResult.state, "mismatch");
  assert.match(missingCustomerRelationResult.reasons.join("\n"), /requires a required relationship to customers/);

  const duplicateManifestId = setup();
  const manifestPath = resolve(duplicateManifestId.workspace, ".skywork/web-apps.json");
  const manifest = JSON.parse(await import("node:fs").then(({ readFileSync }) => readFileSync(manifestPath, "utf8")));
  manifest.webApps.push({ ...manifest.webApps[0] });
  writeJson(manifestPath, manifest);
  assert.equal(inspectCrmState({ cwd: duplicateManifestId.crm }).state, "invalid");

  const missingRuntimeContract = setup();
  rmSync(resolve(missingRuntimeContract.crm, ".skywork/crm/templates/runtime-contract.json"));
  assert.equal(inspectCrmState({ cwd: missingRuntimeContract.crm }).state, "invalid");

  const noFingerprint = setup();
  const result = inspectCrmState({ cwd: noFingerprint.crm });
  assert.equal(result.state, "ready");
  assert.equal(JSON.stringify(result).includes("fingerprint"), false);

  console.log("[inspect-crm-state.test] OK");
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}
