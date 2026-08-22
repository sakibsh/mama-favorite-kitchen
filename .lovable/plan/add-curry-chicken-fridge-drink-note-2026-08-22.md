## Add Curry Chicken + fridge drink note

### New item
- **Curry Chicken** — $21.99, added to the **Signature Stew Bowls** section (with the usual can of drink + 4oz quinoa salad, choice of rice/quinoa/greens/roti, Halal available).

### Drink note
- Update the Signature Stew Bowls section note to read that every bowl/dinner includes your choice of drink from the fridge plus a 4oz quinoa salad. Shown once as the highlighted section line, not repeated on each item.

### Where the changes land
- `src/pages/Menu.tsx` — add the item to the Signature Stew Bowls array and adjust the section subtitle text.
- `menu_items` table — insert Curry Chicken so it shows in the admin portal and can be toggled sold out with real-time sync to the menu.
