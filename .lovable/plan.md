## Add Extra Roti ($6.49) to Menu

The Sides & Add-Ons section currently lists "Extra Roti — $2.50" (a single piece add-on). The new $6.49 price appears to be for a larger roti order (e.g. a full portion / pack), so it should sit alongside the existing item rather than replace it.

### Change
In `src/pages/Menu.tsx`, under **Sides & Add-Ons**, add a new item right after the existing "Extra Roti":
- Name: `Roti (Full Portion)` — $6.49

### Database sync
Insert the same item into the `menu_items` table (category: `Sides & Add-Ons`) so it appears in the Admin portal Sold Out toggles.

### Not in scope
- No changes to the existing $2.50 Extra Roti.
- No layout/UI changes.

### Question
Is $6.49 meant to **replace** the $2.50 Extra Roti (price update), or is it a **separate larger portion** to add alongside it? Default in this plan is: add as separate item labeled "Roti (Full Portion)". Let me know if you'd rather I just update the existing price.