# Work Log

## 2026-06-29 06:13 CST

### Main changes

- Updated the hip posterior ligament reference image:
  - Added/adjusted IL, SI, ST, and SS labels.
  - Renamed sacrotuberous wording to `骶結韌帶(ST)`.
  - Replaced the left posterior sacroiliac label with `薦髂韌帶(SI)` and added `上1/3`, `中1/3`, `下1/3`.
  - Reworked label placement from the original image source multiple times to avoid cutting into the blue frame, pelvic bone, and source English text.
- Replaced the hip ligament-muscle table with structured clinical notes.
- Updated the shoulder ligament reference image:
  - Changed the view badge to `正面觀`.
  - Added AC, CC, CA, CH, and GH abbreviations.
  - Renamed `關節囊韌帶` to `盂肱韌帶(GH)`.
  - Removed shoulder neck and scapula text while preserving source leader lines to avoid damaging the anatomy art.
  - Fine-tuned CA and CH label positions.
- Added a new `肩韌帶－肌肉對應表` page.
- Added hash-based initial navigation so URLs such as `#hip-link` and `#shoulder-link` open the requested section directly.

### Verification

- Reviewed edited PNGs visually with local image inspection.
- Rendered local HTML previews with Chrome headless for:
  - `#hip-link`
  - `#shoulder-link`
- Checked `git diff --stat` and `git status --short` before committing.

### Known issues / notes

- The shoulder scapula/neck leader lines remain in place intentionally. Removing them would require retouching over anatomical shading and may degrade the original image.
- The pushed site is GitHub Pages; propagation may take a short time after push.
