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

## 2026-06-30 09:29 CST

### Main changes

- Added and refined the ankle ligament reference section:
  - Extracted the two ankle ligament diagrams from page 6 of the local NKT Level 3 PDF.
  - Replaced the left diagram labels with `後距腓韌帶(PTFL)`, `前距腓韌帶(ATFL)`, and `跟腓韌帶(CF)`.
  - Replaced the right diagram heading with `三角韌帶(Deltoid)`.
  - Iteratively adjusted label masks and placement so the edited text does not cut into the original ankle anatomy art.
  - Lowered the `跟腓韌帶(CF)` label after review so its white label area no longer overlaps the foot image.
- Updated the ankle deltoid ligament detail panel:
  - Changed the Chinese names to `前脛距韌帶`, `後脛距韌帶`, `脛跟韌帶`, and `脛舟韌帶`.
  - Removed `脛距部韌帶`.
  - Updated the subtitle from five bundles to four bundles.
- Added the `踝韌帶－肌肉對應表` page with the requested ATFL, PTFL, CF, Deltoid, extensor retinaculum, and flexor retinaculum notes.

### Verification

- Rebuilt `photos/Ankle Ligament.png` from the rendered PDF page rather than stacking edits onto an already-modified PNG.
- Reviewed intermediate and final PNG previews visually.
- Generated Chrome headless page screenshots for:
  - `#ankle`
  - `#ankle-link`
- Checked `git diff --stat`, `git status --short`, and recent commit history before and after push.

### Deployment

- Pushed ankle page implementation commit: `ef6ea8f Update ankle ligament reference page`.
- Pushed ankle label refinement commit: `241186f Refine ankle ligament labels`.
- At closeout, `main`, `origin/main`, and `origin/HEAD` all point to `241186f` before adding this work-log commit.

### Known issues / notes

- GitHub Pages may take a short time to refresh after pushes.
- The source diagrams still include some original English anatomy labels that were not requested for replacement.
