# DECOR TASKLIST — THIỆP CƯỚI (FREE-ONLY)
Last reviewed: 2026-10-30. Work branch: `thiepmoi-decor-only-from-main`.
Source of truth: 8 reference screenshots supplied by the owner. No change to main, event text, date/time, fonts, JS, RSVP, QR or wedding photographs.

## Mandatory gates
- [x] G0. Inspect GitHub branch and verify Cloudflare deployment (commit `2088c44a` deployed successfully).
- [x] G1. Identify earlier failure: 16 CSS `content:url(...)` image substitutions and duplicated overrides; removed image substitutions in commit `2088c44a`. Remaining cascade cleanup is open.
- [ ] G2. Validate source assets (real alpha transparency, crop, orientation, dimensions) against screenshot. Reject full-frame collage.
- [ ] G3. Inspect actual mobile/desktop screenshots using **only a verified free method**. If unavailable, mark visual validation blocked, not passed.
- [ ] G4. Confirm no horizontal overflow, text occlusion, blocked buttons or broken opening animation.
- [ ] G5. Deploy and independently verify exact commit and resulting website, only when deployment is within verified free allowance.

## Sequential work — do not mark complete from CSS commit alone
- [ ] 01 Envelope: ivory paper, olive envelope/gold seal, tilted couple photo, hanging white calla bouquet. Verify closed/open states and interaction.
- [ ] 02 Ceremony: ivory/gold bordered card; top-left and bottom-right separate floral cutouts, text unobscured.
- [ ] 03 Countdown: deep olive card, four number boxes, bottom-left bouquet, restrained right petals.
- [ ] 04 Album: cream panel, central larger photo, angled side photos, two botanical corners, arrows functional.
- [ ] 05 Reception: tall olive/gold card, lower corner bouquets, map and RSVP links accessible.
- [ ] 06 Timeline: ivory/gold card, olive/gold timeline icons, botanical lower corners.
- [ ] 07 Wishes: ivory form, white fields, olive button, lower-right calla, submissions unaffected.
- [ ] 08 Gifts: cream panel, olive motif, envelope and white calla; QR/modal/copy remain functional.
- [ ] 09 Final mobile (390/430) and desktop (1440) visual regression, all interactive flows.
- [ ] 10 Final GitHub/Cloudflare deployment status and truthful before/after evidence.

## Strict zero-added-cost policy
- Allowed: inspect repository and existing assets, edit local files, GitHub source edits on existing plan, free local preview and tests, read existing Cloudflare deployment status.
- Conditional: Cloudflare Pages builds/deploys **only if verified within remaining free allowance**. If not verified, keep changes local or on a non-deploying branch; do not trigger build.
- Excluded: Cloudflare Browser Rendering API unless confirmed zero additional charge, paid image generation, paid stock assets, paid hosting/domains, plan upgrades, metered API calls, paid third-party services.
- Never claim a screenshot or visual QA was performed if it was not.
- Never claim all 8 tasks complete based on code changes alone.

## Execution record
- Previous work: `4d6506bd` envelope CSS, `2088c44a` later section CSS. Both code-only; visual signoff absent.
- Next action: verify floral cutout assets and envelope reference; clean envelope-specific CSS without modifying other sections. Do not advance to task 02 until task 01 is visually validated.
