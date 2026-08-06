/**
 * digital-commerce-v1 runtime-reference — slug normalization (asset v1)
 *
 * Copy this file into the generated project that owns product slug writes
 * (e.g. `apps/server/services/slug.ts` on the CRM side) and keep `slugify`
 * byte-identical. The publish contract depends on this exact normalization
 * order; `SLUG_TEST_VECTORS` are fixed acceptance fixtures — assert every
 * vector in the contract tests, do not edit or trim them.
 *
 * If this asset is missing at generation time, re-implement the function
 * inline from the documented normalization order and report the degradation.
 */

/** Canonical slug shape. Normalization must produce this or "" (reject ""). */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Normalize a raw operator-provided slug. The step order is contractual:
 * trim → strip leading/trailing "/" → lowercase → whitespace and "_" to "-"
 * → drop chars outside [a-z0-9-] → collapse "-" runs → trim "-".
 * Returns "" when nothing survives; callers MUST reject "" as SLUG_INVALID
 * instead of storing it. Normalization runs BEFORE any length/shape check,
 * on both create and update, at the adapter/service write path (the single
 * mandatory enforcement point — client-side mirroring is UX only).
 */
export function slugify(raw: string): string {
  return raw
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isValidSlug(value: string): boolean {
  return SLUG_PATTERN.test(value);
}

/**
 * Fixed contract fixtures. `expected === ""` means the input MUST be
 * rejected with SLUG_INVALID after normalization.
 */
export const SLUG_TEST_VECTORS: ReadonlyArray<{ input: string; expected: string }> = [
  { input: "/test2", expected: "test2" }, // the incident case: stored as "/test2", detail lookup never matched
  { input: "  /Hello World/  ", expected: "hello-world" },
  { input: "My_Product Name", expected: "my-product-name" },
  { input: "--Double--Dash--", expected: "double-dash" },
  { input: "summer/sale", expected: "summersale" }, // interior "/" is not a separator; it is dropped
  { input: "新品-Sale", expected: "sale" }, // non-latin chars drop; latin remainder survives
  { input: "UPPER-case-123", expected: "upper-case-123" },
  { input: "///", expected: "" },
  { input: "!!!***", expected: "" },
  { input: "新品上架", expected: "" }, // non-latin only → reject (P0 scope: no transliteration)
  { input: "   ", expected: "" },
  { input: "___", expected: "" }, // "_"→"-" then collapsed and trimmed away
];
