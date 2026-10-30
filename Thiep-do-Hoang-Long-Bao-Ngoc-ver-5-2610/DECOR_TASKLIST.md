# DECOR TASKLIST — THIỆP CƯỚI (FREE-ONLY)
Last reviewed: 2026-10-31. Work branch: `decor-free-qa-fixes` (production remains `thiepmoi-decor-only-from-main`).
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

## 2026-10-30 — Automated envelope audit (Task 01 only)
- Confirmed all five referenced envelope files exist in the GitHub `assets/theme` directory: three envelope artworks, `envelope-bouquet-long-olive-v4.png`, and `hero-couple.webp`. The GitHub binary-reading connector cannot inspect PNG alpha; **G2 remains open**.
- Inspected local cropped reference `envelope_flower_left.png`: it contains ivory background and part of the envelope; it is **not** an isolated floral cutout. Do not upload it as a flower overlay.
- Found concrete CSS animation defect: `drFloat` animates `transform:translateY(...)` and overrides the bouquet's `rotate(-9deg)`. Fixed with `envelopeCallaFloat`, which preserves rotation and existing animation timing. Removed obsolete envelope CSS declarations; other sections untouched.
- Ran a **local isolated HTML/CSS smoke test** in Chromium at 390×844 and 1440×900, including reduced-motion behavior: bouquet keeps rotation, pointer-events are disabled, and the isolated mock has no horizontal overflow. This is **not** an actual website visual test, so G3/G4/Task 01 remain open.
- Cloudflare account lists one Pages project and 20 October deployments. Official Pages Free limit is 500 builds/month; only one further GitHub commit/build is intended. No Browser Rendering API or paid services used.
- Next: inspect the actual bouquet PNG alpha and screenshot the real envelope using a verified free method, then adjust proportions. Do not advance to Task 02 until validated.

## Execution record
- Previous work: `4d6506bd` envelope CSS, `2088c44a` later section CSS. Both code-only; visual signoff absent.
- Next action: verify floral cutout assets and envelope reference; clean envelope-specific CSS without modifying other sections. Do not advance to task 02 until task 01 is visually validated.

## 2026-10-30 — free Playwright regression (isolated timeline fixture)
- Ran Chromium/Playwright via `page.set_content` with the corrected timeline CSS logic on 390×844, 430×932 and 1440×900. All 3 isolated checks passed: paper computed `position:absolute`, heading offset 54px, no horizontal overflow; panel height 328px.
- This **does not** test the deployed website or its full CSS cascade. Actual GitHub/Cloudflare website assets cannot be downloaded into the browser container because outbound DNS is blocked; `file://` navigation is also blocked by administrator. Fixture tests alone cannot close Task 06 or G3/G4.
- QA patch remains on `decor-free-qa-fixes` pending full visual regression. Avoid deploying without verified free build quota. No metered Browser Rendering used.

## 2026-10-31 — Task 01 envelope state consistency
- Scope: **01 Envelope only**; 02–08 untouched this run. The project remains **IN_PROGRESS / NOT PASS**.
- Read the actual branch HTML/CSS/JS and current Cloudflare Pages project/deployment metadata. Git integration remains enabled, production branch is `thiepmoi-decor-only-from-main`, and the latest known production commit `a0d4dcb3` succeeded. Three preview records for `decor-free-qa-fixes` were marked `idle`, **not verified as successful**.
- Confirmed a real CSS cascade defect: the late `style.css` rule for `.cover.is-opening/.is-open .envelope-flower` changed bouquet position/width and applied `rotate:22deg`, while reveal/pulse animations applied `transform:rotate(-22deg)`. Net angle was ~0deg, unlike the -9deg closed bouquet; size and position jumped between states.
- Fixed **only `reference-only.css`**: keep opening/opening-reveal/open bouquet top/left/width aligned with closed state and set independent `rotate:13deg` to preserve the -9deg net angle during existing -22deg transform animations. The JS state machine, timing, content, fonts, photographs and other sections remain unchanged. Code commit `d1a036658f2b3be1052f2c0c7d74a0b010d3ed0e`.
- **Free isolated Chromium/Playwright regression** (not full-site QA): 390×844 and 1440×900, normal and reduced-motion, four envelope states each (closed, opening, decoration-revealing, open). Before: -9deg closed vs 0deg opening/open, with inconsistent top/left/width. After: -9deg in all states, consistent top/left/width, pointer-events disabled, no horizontal overflow in the fixture. Test evidence generated locally in `/mnt/data/envelope_state_qa.py` and `/mnt/data/envelope_state_qa_results.json`; not added to repository.
- **Blocker G2/G3/G4:** GitHub connector returns empty content for the repository PNG and binary blob fetch fails UTF-8 decoding; outbound DNS from local Chromium/container cannot fetch GitHub or Cloudflare. The available cropped reference contains envelope/background and is not a transparent cutout. Consequently, cannot inspect actual PNG alpha or capture/test the **real** website; do not mark Task 01 or full-site visual QA passed.
- To avoid unverified build costs, GitHub changes use the Cloudflare-documented `[CI Skip]` commit prefix; **no deployment is requested**. Verify deployment history after the commits; production must remain unchanged.
- Next free-only action: obtain the actual bouquet asset bytes and a full local site preview using a verified zero-cost transfer path; run real Playwright screenshots and envelope click/reveal tests before signing off Task 01. Do not advance to Task 02 yet.
