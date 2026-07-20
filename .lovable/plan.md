## Plan

### 1. Process & add the 4 uploaded dish images
The uploaded photos are phone shots of hotel-pan trays that need cropping/rotating for presentation. Process each with Python (PIL) to:
- Auto-rotate to landscape orientation (matching existing gallery images)
- Center-crop to a 4:3 ratio focused on the food
- Convert to optimized WebP (per project rule: all images must be WebP)
- Save to `src/assets/gallery/`:
  - `stew-curry-chicken.webp` (from image-16 — curry chicken with onions)
  - `stew-curry-fish.webp` (from image-17 — fish with peppers & dill)
  - `fresh-roti.webp` (from image-18 — freshly baked roti)
  - `stew-chicken-bone-in.webp` (from image-19 — bone-in stew chicken with peppers)

### 2. Add to Signature Dishes carousel on Home
Edit `src/pages/Home.tsx`:
- Add 4 new imports for the WebP files
- Append 4 new entries to the `dishes` array (lines 115–141) with names and short descriptions:
  - "Stew Curry Chicken" — Slow-simmered curry chicken in rich, aromatic sauce
  - "Stew Curry Fish" — Fresh fish braised in vibrant curry with bell peppers & dill
  - "Freshly Baked Roti" — Warm, flaky roti baked in-house daily
  - "Stew Chicken (Bone-In)" — Traditional bone-in stew chicken with peppers & herbs
- The existing auto-play carousel will pick them up automatically.

### 3. Update salad portion 2oz → 4oz
In `src/pages/Menu.tsx`, replace every "2oz quinoa salad" with "4oz quinoa salad" in the Signature Stew Bowls section subtitle and each of the 7 stew bowl item descriptions.

### Notes
- No admin/database changes needed (dish names/descriptions on Home are static; menu descriptions are frontend-only text).
- No memory update needed — signature dishes gallery memory already covers the pattern.