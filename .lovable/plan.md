## New meal sections, Mama's Pot, and removing quinoa salad

### New sections (added alongside the current ones, on the customer menu and in the admin portal)

**Chicken Meals**
- Small Lunch: $9.99. 2 pieces of fried chicken. Can only be ordered 11:00am to 2:00pm.
- Medium Lunch: $14.99. 3 pieces of fried chicken, no drink. Can only be ordered 2:00pm to 5:00pm.
- Dinner: $19.99. 4 pieces of chicken plus any drink.

**Curry & Stew Meals** (Curry Goat, Curry Chicken, Stew Goat, Stew Lamb, Stew Fish)
- Medium: $19.99 each
- Dinner: $23.99 each, with any drink

**Mama's Pot**
- Soups: $19.99
- Add Protein: $6.99

### Lunch time limits
- All times use Toronto time. Outside its window, a lunch item shows "Available 11am–2pm" (or 2pm–5pm) and can't be added to the cart.
- The checkout also rejects a lunch item if the time window closes while it is still in the cart.

### Remove quinoa salad everywhere
- Take every "4oz quinoa salad" mention out of item descriptions and the Signature Stew Bowls note. The note becomes: "Every dinner bowl includes your choice of drink from the fridge."
- Take Quinoa out of the bowl side choices, and remove the Quinoa Power Bowl.

### Technical details
- `src/pages/Menu.tsx`: add the three sections, add an optional `availableWindow` field on items, and check it with the Toronto helpers in `src/lib/timezone.ts`. Remove the quinoa text and the Quinoa Power Bowl.
- `src/pages/Checkout.tsx`: check time windows again before payment.
- `menu_items`: insert the new rows (categories "Chicken Meals", "Curry & Stew Meals", "Mama's Pot"), delete Quinoa Power Bowl, and clean up the quinoa text in descriptions. Sold-out toggles and live updates keep working the same way.
- Add a small test for the time-window rule: 11:00–13:59 allowed for Small Lunch, 14:00–16:59 for Medium Lunch.
