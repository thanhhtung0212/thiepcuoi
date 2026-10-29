# Decor reference analysis — 8 sections
Status: visual specification from earlier eight reference screenshots and existing theme asset filenames. Exact pixel-level comparison is NOT yet verified.
Do not edit main, event text, fonts, album data, JS or links. Decorative HTML layers only, pointer-events:none.

## Palette and composition
- Background ivory/cream with subtle paper texture; olive and deep sage as the primary dark surfaces; warm champagne gold hairline borders.
- White calla lilies, olive leaves, airy small ivory blooms. Avoid oversaturated lime green, large rectangular image backgrounds, dense repetitive bouquets.
- Floral foreground is concentrated in asymmetric corners, mostly outside text-safe center. Decorative layers must be transparent and not obscure interactions.
- Reuse existing assets first; only isolate/crop/generate missing transparent floral elements after visual inspection.

## Reference mapping (source images /task 1..8 in user's earlier local theme/job folder)
| Task | Visual placement and target | Candidate assets in assets/theme | Layer plan | Verification |
|---|---|---|---|---|
| 1 Envelope opened | Ivory architectural paper, deep olive envelope with gold seal, left-edge long trailing white flowers, scattered petals, tilted portrait | envelope-bouquet-long-olive-v4.png; Cành hoa trắng rủ thanh nhã.png; Olive Green Envelope with Golden Calla Lilies.png | hanging floral front left + petals separate; keep envelope state/animation untouched | REVIEW |
| 2 Ceremony | Ivory rounded card with fine gold border; hanging calla upper left; larger bouquet lower right; center text clear | decor le thanh hon.png; Elegant Calla Lily Floral Corner.png; Elegant White Calla Lily Bouquet olive.png | two corner clusters + sparse leaf tips | REVIEW |
| 3 Countdown | Deep olive rounded horizontal panel; four slightly lighter boxes; white flowers lower left; petals floating right | decor dong ho dem nguoc.png; countdown-calla-bouquet-only-v1.png; existing countdown-petal assets | bouquet foreground lower left + separate petals behind numbers | REVIEW |
| 4 Album | Cream paper panel, prominent center photo with angled side photos; white calla bottom corners | decor album.png; Elegant Calla Lily Floral Corner.png | two asymmetrical bottom bouquets; never change carousel | REVIEW |
| 5 Reception | Deep olive tall panel thin gold border; calla flowers framing bottom corners; map and RSVP unobstructed | decor thong tin tiec cuoi.png; Elegant White Calla Lily Bouquet olive.png | bottom left and bottom right botanical clusters | REVIEW |
| 6 Timeline | Ivory tall card thin gold border; vertical olive/gold line, gold icons; flowers anchored at bottom | decor lich trinh ngay cuoi.png; Elegant Calla Lily Floral Corner.png | bottom corner sprays, keep time markers untouched | REVIEW |
| 7 Wishes | Ivory bordered form card, simple fields, green submit; single bouquet lower right | decor loi chuc.png; White Calla Lily Bouquet Cutout.png | one foreground lower-right, faint botanical corner optional | REVIEW |
| 8 Gifts | Cream card, olive circular focal area, green floral envelope with white flowers | decor hop qua mung.png; Elegant Green Botanical Envelope.png | two peripheral bouquets, central existing interactive gift button untouched | REVIEW |

## Asset selection and quality gate
1. Inspect each candidate visually and check actual alpha/transparency, not just PNG extension.
2. Separate whole flowers, leaves, petals and paper/background elements into transparent assets only when appropriate.
3. Crop to the real nontransparent bounding box; do not stretch or duplicate the same distinctive flower to simulate different bouquets.
4. Use CSS independent layers for scale, rotation, overlap and responsive placement.
5. Compare screenshots at matching viewport and opened/closed state; verify no content obstruction and all interactions.
6. Mark PASS only with screenshot evidence. Current state is REVIEW, not PASS.

## Findings
- Existing theme directory has 146 top-level entries, including multiple botanical collections, individual calla assets and eight decor-named images.
- Existing CSS implementation adds 14 decorative spans across seven sections, but these positions are provisional and have not been visually validated.
- Previous asset replacement through CSS content:url does not isolate individual flowers and may cause rectangular backgrounds; do not treat as finished.
