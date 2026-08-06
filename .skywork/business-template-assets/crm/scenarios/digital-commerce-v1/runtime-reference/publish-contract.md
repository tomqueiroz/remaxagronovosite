# Digital Commerce Publish Contract

Read this reference only for a source whose registry declares a products
publish transition and whose bound product entity exposes both slug and
cover-image publish surfaces. The source registry remains authoritative for
every operation and lifecycle state; this reference never creates a capability.

## Adapter And Source Invariants

- Normalize slugs at the adapter on create and update before writing: trim,
  strip leading/trailing `/`, lowercase, map whitespace and `_` to `-`, drop
  characters outside `[a-z0-9-]`, collapse and trim `-`. Reject an empty or
  non-matching result as `SLUG_INVALID`; map both duplicate prechecks and
  database unique violations to `SLUG_CONFLICT`. Use the provided `slugify.ts`
  and its fixed vectors.
- Image values are either an absolute HTTP(S) URL with a real host and no
  whitespace, a root-relative path other than `//...`, or a dot-separated
  lowercase token. Reject every other write, including `data:` URIs. Product,
  media, variant, and preview images share the same resolver.
- CRM never creates a token. It may preserve a token only when the submitted
  value is identical to the stored value; new image values must use a URL form.
  The CRM UI exposes no token input.
- The first legal upload becomes cover when no renderable cover exists and
  syncs `heroImage`. Demote an illegal cover in the same transaction. A loser
  of the unique-cover race retries as gallery so both uploads persist. Cover
  deletion promotes the next media by `createdAt ASC, id ASC`.

## Publish And Consumer Semantics

- Publish requires a valid slug and renderable cover. It is valid only from the
  registry-declared `from` states and uses a monotonic product-revision CAS;
  every `heroImage` or cover-row change bumps that revision in the same
  transaction. Retry one CAS miss after re-read, then return `INVALID_STATE`.
  If a legacy source cannot add revision in the current work item, value-level
  CAS must pin the observed cover row or pin `heroImage` while also requiring
  that no active cover row exists.
- Server readiness reports `slugValid`, `hasRenderableCover`,
  `sellableSkuCount`, and `missingCodes`. SKU sellability requires readiness and
  delivery on the same SKU; product-only sources use their product-level rule.
- CRM shows draft, published preview (Coming Soon), and published sellable.
  Consumer visibility depends only on the published lifecycle state. A degraded
  image falls back to the placeholder and warns in CRM; it never hides a
  published product.

## Conditional Contract Tests

- Copy `publish-chain.test.template.ts` only for a matching source, implement
  its harness, and remove every `__CRM_CONTRACT_` placeholder. Keep it
  in-process and isolated; browser flows and deployed APIs are excluded.
- Implement `addSku` only when the registry declares SKU support. Implement
  seed-token members only when source seeds reference a token. Implement the
  optional `unpublish` harness and republish loop only when an unpublish
  transition returns to a legal publish `from` state.
- Main-site client coverage stays limited to resolver branches and fallback,
  published visibility with fail-open placeholders, and Coming Soon / canBuy.
  Wire only created tests into the local infrastructure gate; unrelated
  projects leave package scripts unchanged.
