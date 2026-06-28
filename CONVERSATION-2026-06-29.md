# Conversation Record - 2026-06-29

## Project

`rbtc-nktrefer`

## User requests

- Read the published site and local project context, then prepare to add content.
- Update the hip posterior ligament image and hip ligament-muscle table.
- Iteratively adjust hip image label positions to avoid cutting into the frame, anatomy art, and source labels.
- Update the shoulder ligament image with abbreviations and text changes.
- Add a new shoulder ligament-muscle reference page.
- Normalize shoulder table titles to `韌帶名稱(縮寫)`.
- Push all completed changes and run the project closeout process.

## Key decisions

- Used `/Users/weida6610/Documents/Codex/Projects/rbtc-nktrefer` as the active repository.
- Regenerated edited PNGs from `git show HEAD:<image>` rather than repeatedly editing already-modified images, reducing cumulative artifacts.
- Preserved shoulder leader lines for `肩胛頸` and `肩胛骨` because they pass through anatomical shading.
- Added hash-based section loading for easier previewing and future direct links.
- Created project work logs because the active project did not previously contain a `WORKLOG.md`.

## Implementation summary

- `index.html`
  - Added reusable `clinical-notes` rendering and styles.
  - Replaced the hip ligament-muscle table with detailed clinical note sections.
  - Added the `肩韌帶－肌肉對應表` page.
  - Added hash initial selection support.
- `photos/Hip Ligament Posterior.png`
  - Updated posterior hip ligament labels and abbreviations.
- `photos/Shoulder Ligament.png`
  - Updated shoulder ligament labels, abbreviations, and view marker.
- `WORKLOG.md`
  - Added closeout work log.

## Verification results

- Visual checks were performed on edited image files.
- Chrome headless previews were generated for the hip and shoulder table pages.
- Final changed files before commit:
  - `index.html`
  - `photos/Hip Ligament Posterior.png`
  - `photos/Shoulder Ligament.png`
  - `WORKLOG.md`
  - `CONVERSATION-2026-06-29.md`

## Deployment state

- Pending at the time this record was written; final commit and push were requested as part of closeout.
