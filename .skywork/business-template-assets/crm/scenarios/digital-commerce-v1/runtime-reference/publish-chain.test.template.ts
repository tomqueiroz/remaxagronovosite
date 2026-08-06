/**
 * digital-commerce-v1 runtime-reference — publish-chain contract test template (asset v1)
 *
 * Copy this file to `apps/server/_test/infra/publish-chain.test.ts` only when
 * the source registry declares a products publish transition and the bound
 * product entity exposes both slug and cover-image publish surfaces. A slug or
 * image field alone does not trigger this suite.
 *
 * Replace every `__CRM_CONTRACT_*__` placeholder and implement the harness
 * against the generated adapter and services. These tests are intentionally
 * narrow: they cover the incident-prone publish path, run in-process against an
 * isolated SQLite database, and use no browser, server, network, or fixed port.
 * Main-site resolver/visibility/Coming Soon tests are separate client unit
 * tests wired through `test:publish-contract`. Browser Path A/B is one-time
 * generation acceptance and must not be added here or to a deploy gate.
 */
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

import {
  SLUG_TEST_VECTORS,
  isValidSlug,
  slugify,
} from "__CRM_CONTRACT_SLUGIFY_MODULE__";
import { createHarness } from "__CRM_CONTRACT_HARNESS_MODULE__";

const isAbsoluteHttpUrl = (value: string): boolean => {
  if (/\s/.test(value) || !/^https?:\/\/[^/]/.test(value)) return false;
  try {
    const parsed = new URL(value);
    return (
      (parsed.protocol === "http:" || parsed.protocol === "https:") &&
      parsed.host !== ""
    );
  } catch {
    return false;
  }
};

const ROOT_RELATIVE = /^\/(?!\/)/;
const TOKEN = /^[a-z][a-z0-9_-]*(?:\.[a-z0-9][a-z0-9_-]*)+$/;
const isRenderableByGrammar = (value: string): boolean =>
  isAbsoluteHttpUrl(value) || ROOT_RELATIVE.test(value) || TOKEN.test(value);

const RENDERABLE_ACCEPT = [
  "https://cdn.example.com/a.png",
  "/uploads/a.png",
  "theme.floral",
];
const RENDERABLE_REJECT = [
  "",
  "https:///x",
  "//cdn.example.com/a.png",
  "data:image/png;base64,iVBORw0KGgo=",
  "Theme.Floral",
];

export type PublishContractHarness = {
  setup(): Promise<void>;
  teardown(): Promise<void>;
  reset(): Promise<void>;

  /** Adapter create. Defaults: legal draft state, valid slug, empty heroImage, no media. */
  createProduct(overrides?: {
    slugRaw?: string;
    state?: string;
  }): Promise<{ id: string }>;
  /** Adapter create with an explicit image value, used to prove CRM cannot mint tokens. */
  createProductWithHeroImage(
    value: string
  ): Promise<{ ok: boolean; id?: string; code?: string }>;
  getProduct(id: string): Promise<{
    id: string;
    slug: string;
    status: string;
    heroImage: string;
    revision: number;
  }>;

  /** Test-only raw writes for legacy/pre-existing source data. */
  forceState(id: string, state: string): Promise<void>;
  forceSlug(id: string, value: string): Promise<void>;
  forceHeroImage(id: string, value: string): Promise<void>;
  insertMediaRaw(
    id: string,
    value: string,
    role: "cover" | "gallery"
  ): Promise<{ mediaId: string }>;

  /** Real adapter/service paths. */
  updateSlug(id: string, raw: string): Promise<{ ok: boolean; code?: string }>;
  setHeroImage(
    id: string,
    value: string
  ): Promise<{ ok: boolean; code?: string }>;
  uploadMedia(
    id: string,
    value: string
  ): Promise<{ ok: boolean; mediaId?: string; role?: string }>;
  listMedia(
    id: string
  ): Promise<Array<{ mediaId: string; value: string; role: string }>>;
  isRenderableRef(value: string): boolean;
  publishReadiness(id: string): Promise<{
    slugValid: boolean;
    hasRenderableCover: boolean;
    sellableSkuCount: number;
    missingCodes: string[];
  }>;
  publish(id: string): Promise<{ ok: boolean; code?: string }>;
  /** Omit unless the registry declares an unpublish transition back to a legal publish from-state. */
  unpublish?(id: string): Promise<{ ok: boolean; code?: string }>;
  attemptPublishCas(
    id: string,
    observedRevision: number
  ): Promise<{ applied: boolean }>;

  /** Registry-derived declarations; do not infer either from optional methods. */
  legalPublishFromStates(): string[];
  hasUnpublishRepublishLoop(): boolean;
  hasSkuSupport(): boolean;
  addSku?(
    id: string,
    opts: { ready: boolean; hasDelivery: boolean }
  ): Promise<{ skuId: string }>;

  /** Omit when source seeds reference no resolver token. */
  knownSeedToken?(): string;
};

const harness: PublishContractHarness = createHarness();
const hasSkuSupport = harness.hasSkuSupport();
const itWithSku = hasSkuSupport ? it : it.skip;
const hasUnpublishRepublishLoop = harness.hasUnpublishRepublishLoop();
const itWithUnpublish = hasUnpublishRepublishLoop ? it : it.skip;
const seedToken = harness.knownSeedToken?.() ?? "";
const itWithSeedToken = seedToken !== "" ? it : it.skip;

beforeAll(async () => {
  await harness.setup();
});
afterAll(async () => {
  await harness.teardown();
});
beforeEach(async () => {
  await harness.reset();
});

describe("slug adapter contract", () => {
  it("keeps the canonical vectors and pattern", () => {
    for (const { input, expected } of SLUG_TEST_VECTORS) {
      expect(slugify(input), JSON.stringify(input)).toBe(expected);
      if (expected !== "") expect(isValidSlug(expected)).toBe(true);
    }
  });

  it("normalizes on create and update, and rejects an empty result", async () => {
    const { id } = await harness.createProduct({ slugRaw: "/Test2" });
    expect((await harness.getProduct(id)).slug).toBe("test2");

    const update = await harness.updateSlug(id, "  New_Name Here ");
    expect(update.ok).toBe(true);
    expect((await harness.getProduct(id)).slug).toBe("new-name-here");

    const invalid = await harness.updateSlug(id, "///");
    expect(invalid.ok).toBe(false);
    expect(invalid.code).toBe("SLUG_INVALID");
  });

  it("surfaces duplicate writes as SLUG_CONFLICT", async () => {
    await harness.createProduct({ slugRaw: "taken" });
    const { id } = await harness.createProduct({ slugRaw: "other" });
    const result = await harness.updateSlug(id, "taken");
    expect(result.ok).toBe(false);
    expect(result.code).toBe("SLUG_CONFLICT");
  });
});

describe("image value and token boundaries", () => {
  it("production grammar agrees with representative fixed vectors", () => {
    for (const value of RENDERABLE_ACCEPT) {
      expect(isRenderableByGrammar(value), value).toBe(true);
      expect(harness.isRenderableRef(value), value).toBe(true);
    }
    for (const value of RENDERABLE_REJECT) {
      expect(isRenderableByGrammar(value), value).toBe(false);
      expect(harness.isRenderableRef(value), value).toBe(false);
    }
  });

  itWithSeedToken(
    "preserves a token that already exists in source seed data",
    async () => {
      const { id } = await harness.createProduct();
      await harness.forceHeroImage(id, seedToken);
      const keep = await harness.setHeroImage(id, seedToken);
      expect(keep.ok).toBe(true);
    }
  );

  it("rejects CRM-minted token values on create and update", async () => {
    const token = "theme.never_stored_before";
    expect((await harness.createProductWithHeroImage(token)).ok).toBe(false);

    const { id } = await harness.createProduct();
    expect((await harness.setHeroImage(id, token)).ok).toBe(false);
  });
});

describe("first and single cover", () => {
  it("promotes the first upload and keeps later uploads as gallery", async () => {
    const { id } = await harness.createProduct();
    const first = await harness.uploadMedia(
      id,
      "https://cdn.example.com/first.png"
    );
    const second = await harness.uploadMedia(
      id,
      "https://cdn.example.com/second.png"
    );
    expect(first.ok).toBe(true);
    expect(first.role).toBe("cover");
    expect(second.ok).toBe(true);
    expect(second.role).toBe("gallery");
    expect((await harness.getProduct(id)).heroImage).toBe(
      "https://cdn.example.com/first.png"
    );
    expect((await harness.listMedia(id)).filter((m) => m.role === "cover")).toHaveLength(1);
  });

  it("repairs an illegal stored heroImage with the first legal upload", async () => {
    const { id } = await harness.createProduct();
    await harness.forceHeroImage(id, "data:image/png;base64,AAA");
    const upload = await harness.uploadMedia(
      id,
      "https://cdn.example.com/fix.png"
    );
    expect(upload.ok).toBe(true);
    expect(upload.role).toBe("cover");
    expect((await harness.getProduct(id)).heroImage).toBe(
      "https://cdn.example.com/fix.png"
    );
  });

  it("concurrent first uploads both persist and leave exactly one cover", async () => {
    const { id } = await harness.createProduct();
    const [a, b] = await Promise.all([
      harness.uploadMedia(id, "https://cdn.example.com/a.png"),
      harness.uploadMedia(id, "https://cdn.example.com/b.png"),
    ]);
    expect(a.ok).toBe(true);
    expect(b.ok).toBe(true);
    const media = await harness.listMedia(id);
    expect(media).toHaveLength(2);
    expect(media.filter((m) => m.role === "cover")).toHaveLength(1);
  });
});

describe("publish gate and declared lifecycle", () => {
  it("blocks a missing or illegal cover value", async () => {
    const missing = await harness.createProduct();
    const readiness = await harness.publishReadiness(missing.id);
    expect(readiness.hasRenderableCover).toBe(false);
    expect(readiness.missingCodes).toContain("NO_RENDERABLE_COVER");
    expect((await harness.publish(missing.id)).code).toBe(
      "NO_RENDERABLE_COVER"
    );

    const illegal = await harness.createProduct();
    await harness.insertMediaRaw(
      illegal.id,
      "data:image/png;base64,AAA",
      "cover"
    );
    expect((await harness.publish(illegal.id)).code).toBe(
      "NO_RENDERABLE_COVER"
    );
  });

  it("blocks a legacy invalid slug", async () => {
    const { id } = await harness.createProduct();
    await harness.uploadMedia(id, "https://cdn.example.com/cover.png");
    await harness.forceSlug(id, "/test2");
    const readiness = await harness.publishReadiness(id);
    expect(readiness.slugValid).toBe(false);
    expect(readiness.missingCodes).toContain("SLUG_INVALID");
    expect((await harness.publish(id)).code).toBe("SLUG_INVALID");
  });

  it("rejects publish outside the declared lifecycle", async () => {
    expect(harness.legalPublishFromStates()).not.toContain("archived");
    const { id } = await harness.createProduct();
    await harness.uploadMedia(id, "https://cdn.example.com/cover.png");
    await harness.forceState(id, "archived");
    const result = await harness.publish(id);
    expect(result.ok).toBe(false);
    expect(result.code).toBe("INVALID_STATE");
  });

  it("publishes a cover-complete Coming Soon product", async () => {
    const { id } = await harness.createProduct();
    await harness.uploadMedia(id, "https://cdn.example.com/cover.png");
    expect((await harness.publishReadiness(id)).sellableSkuCount).toBe(0);
    expect((await harness.publish(id)).ok).toBe(true);
    expect((await harness.getProduct(id)).status).toBe("published");
  });

  it("implements addSku exactly when the registry declares SKU support", () => {
    expect(typeof harness.addSku === "function").toBe(hasSkuSupport);
  });

  it("implements the unpublish loop only when the registry declares it", () => {
    expect(typeof harness.unpublish === "function").toBe(
      hasUnpublishRepublishLoop
    );
  });

  itWithSku(
    "counts sellability only when readiness and delivery hold on the same SKU",
    async () => {
      const { id } = await harness.createProduct();
      await harness.uploadMedia(id, "https://cdn.example.com/cover.png");
      await harness.addSku!(id, { ready: true, hasDelivery: false });
      await harness.addSku!(id, { ready: false, hasDelivery: true });
      expect((await harness.publishReadiness(id)).sellableSkuCount).toBe(0);
      await harness.addSku!(id, { ready: true, hasDelivery: true });
      expect((await harness.publishReadiness(id)).sellableSkuCount).toBe(1);
    }
  );

  it("publishes from every declared state", async () => {
    const states = [...new Set(harness.legalPublishFromStates())];
    expect(states.length).toBeGreaterThan(0);
    for (const state of states) {
      const { id } = await harness.createProduct();
      await harness.uploadMedia(id, "https://cdn.example.com/cover.png");
      await harness.forceState(id, state);
      expect((await harness.publish(id)).ok, `publish from ${state}`).toBe(true);
    }
  });

  itWithUnpublish(
    "supports unpublish → republish when both transitions form a loop",
    async () => {
      const { id } = await harness.createProduct();
      await harness.uploadMedia(id, "https://cdn.example.com/loop.png");
      expect((await harness.publish(id)).ok).toBe(true);
      expect((await harness.unpublish!(id)).ok).toBe(true);
      expect((await harness.publish(id)).ok).toBe(true);
    }
  );
});

describe("publish revision CAS", () => {
  it("invalidates a stale observer and bumps revision on publish", async () => {
    const { id } = await harness.createProduct();
    await harness.uploadMedia(id, "https://cdn.example.com/cover.png");
    const observed = (await harness.getProduct(id)).revision;
    await harness.setHeroImage(id, "https://cdn.example.com/late.png");
    expect((await harness.attemptPublishCas(id, observed)).applied).toBe(false);

    const beforePublish = (await harness.getProduct(id)).revision;
    expect((await harness.publish(id)).ok).toBe(true);
    expect((await harness.getProduct(id)).revision).toBeGreaterThan(beforePublish);
  });
});
