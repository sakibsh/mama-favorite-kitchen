## Menu Revamp Plan

Rewrite the online menu in `src/pages/Menu.tsx` to match the two new printed menus. Keep only the Catering Trays section from the current menu.

### New menu structure (in order)

**1. Signature Stew Bowls**
- Subtitle: "Served with your choice of Jollof Rice, White Rice, Quinoa, Mixed Greens, or Fresh Baked Roti. Every bowl includes a can of drink + 2oz quinoa salad."
- Each item description also ends with "Includes can of drink & 2oz quinoa salad."
- Items: Garden Vegetable Stew Bowl (Vegan) $21.99, Chicken $22.99, Beef $23.99, Goat $26.99, Lamb $27.99, Shrimp $26.99, Salmon $28.99

**2. Add to Your Bowl** (orderable add-ons, separate items)
- Extra Protein $6.99, Extra Stew $3.99, Fried Plantain $4.99, Extra Hot Pepper Sauce $1.99

**3. Traditional African Meals**
- Description: "Served with your choice of swallow (Cassava Fufu, Pounded Yam, Plantain Fufu, or Oat Fufu) and one protein (Goat, Chicken, Beef, Fish, or Assorted Meat)."
- Items: Egusi Soup $26.99, Okra $25.99, Bitter Leaf $26.99, Groundnut $25.99, Light Soup $24.99, Goat Pepper Soup (12oz) $15.99

**4. Grab & Go Wraps** (all fresh roti)
- Stew Garden Vegetable Wrap $13.99, Stew Chicken Wrap $16.99, Stew Shrimp Wrap $18.99, Stew Salmon Wrap $19.99

**5. Fresh Doubles**
- Classic Channa Doubles $7.49, Shrimp Doubles $10.99, Doubles Combo (2 Doubles & Drink) $13.99

**6. Fresh & Healthy**
- Quinoa Power Bowl $16.99, Mixed Green Salad $10.99, Fruit Cup $6.99

**7. Add Protein** (separate orderable add-ons)
- Chicken $5.99, Shrimp $7.99, Salmon $8.99

**8. House-Made Sauces** — all $1.99
- Hot Pepper, Green Herb, Garlic, Tamarind

**9. Sides & Add-Ons**
- Fried Plantain $4.99, Extra Roti $2.50, Extra Stew (8oz) $3.99, Extra Hot Pepper Sauce $1.99

**10. House-Made Drinks**
- Ginger Drink $5.99, Fresh Lemonade $4.99, Pop $1.99, Bottled Water $1.75, Bottle Drinks $3.99

**11. Catering Platters & Party Trays** (KEPT as-is, phone to order)

### Sections removed
Jerk Chicken Cuts, Lunch Special, current Roti Wraps, Dinner (Oxtail/Curry Goat/Suya/Jerk Chicken Dinner/Curry Chicken Dinner/Pounded Yam/Fish/Pasta/Shrimp/Yam Porridge/ROTI/Plantain Poutine), current Salad/Soups/Side Orders/Vegetarian/Desserts/Beverages sections.

### Technical notes
- Single file edit: `src/pages/Menu.tsx` — replace the `menuSections` array. No schema, cart, checkout, or admin changes.
- Remove now-unused imports/state: `Flame`, `Clock`, jerk chicken images, `lunchAvailable` state + `isLunchSpecialAvailable`/`getNextLunchSpecialTime`, and the `isLunchSpecial`/`isFeatured` branches in the render.
- Keep pickup-enabled / operating-hours / availability logic and the "Sold Out" toggle exactly as-is.
- Badges: mark "Chicken Stew Bowl" as Popular, "Garden Vegetable Stew Bowl" and "Stew Garden Vegetable Wrap" as Vegetarian, "Goat Pepper Soup" as Chef's Choice, "Hot Pepper Sauce" as Spicy, "Fresh Lemonade" and "Ginger Drink" as Fresh.
- The database `menu_items` table is not currently used by the customer menu (menu is hardcoded in `Menu.tsx`), so no data migration is needed for the UI change. Admin sold-out toggling continues to match by item name.

### Not in scope
No modifier/options UI, no cart schema changes, no email/admin template changes.