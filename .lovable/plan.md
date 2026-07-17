## Goal
Make it clear across the site that all our meats are available in halal options.

## Changes

### 1. Menu page (`src/pages/Menu.tsx`)
- Add a prominent green "Halal Available" notice near the top of the menu (below the ordering status / dine-in line), stating: **"All our meats are available halal on request."**
- Add the same short line into the description of every meat-containing section:
  - Signature Stew Bowls
  - Traditional African Meals
  - Grab & Go Wraps
  - Add to Your Bowl / Add Protein
  - Catering Platters & Party Trays
- Add a small `Halal` badge (new badge variant styled in brand-green) on key meat items (Chicken/Beef/Goat/Lamb bowls, Curry Chicken/Goat catering trays, Jerk Chicken trays).

### 2. Home page (`src/pages/Home.tsx`)
- Add a compact "Halal available" highlight to the hero area (small pill under the CTA buttons, styled consistently with the existing gold "Dine-in now available" banner but using brand-green so they don't compete).
- Add one line mentioning halal in the existing "Why choose us" / story section (whichever section currently lists our value props) so it appears in body content for SEO.

### 3. FAQ (new lightweight section on Home)
- Add a small FAQ block near the bottom of Home with 3–4 Q&As, the first being **"Are your meats halal?"** answered with a clear yes. Other Q&As pulled from existing info (pickup hours, dine-in, catering) so the section feels complete rather than one-off.
- Include FAQ JSON-LD structured data for SEO.

### 4. SEO metadata (`index.html`)
- Append "Halal options available" to the meta description so it surfaces in search snippets.

## Technical notes
- New `Halal` badge: add a case in the existing badge color switch in `Menu.tsx` (brand-green background, white text). No new component needed.
- FAQ section: plain React + Tailwind, no new dependencies. Add a `<script type="application/ld+json">` via a small `SEOHead` update or inline in the section using `dangerouslySetInnerHTML` on a `<script>` element rendered in the section.
- No database or backend changes.

## Out of scope
- No change to admin portal, cart, checkout, or menu_items table.
- Not adding a halal certificate image (can be added later if you have one).

## Question
Do you want the halal note phrased as **"All meats are halal"** (i.e. always) or **"Halal options available on request"**? The plan currently uses "available on request" — say the word and I'll switch to the stronger phrasing everywhere.