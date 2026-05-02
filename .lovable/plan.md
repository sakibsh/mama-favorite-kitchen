## Problem

The admin portal only shows ~27 hardcoded items (in `defaultMenuItems` inside `src/pages/Admin.tsx`). The customer Menu has many more items that are NOT in this list and NOT in the `menu_items` database table — including:

- **Jerk Chicken Cuts**: Half Jerk Chicken, Whole Jerk Chicken
- **Side Orders**: Plantain chips, Small Pie, Large Pie, Curry Chicken (side), (Festival)Fried dumplings, Roti Skins, Moi-moi, Assorted Meat, Plantain Poutine, Fufu (1 wrap)
- **Salad**: Coleslaw (Small), Coleslaw (Large)
- **Sauces**: Hot sauce
- **Vegetarian**: Peas & Fried Plantain, Doubles with Rice & Grilled Vegetables, Yam Porridge
- **Desserts**: Assorted
- **Beverages**: Pop, Bottle water, Bottle Soda drink, Tea, Coffee, Sugar Cane Juice, Smoothie (Small/Large)
- **Catering trays** (12 items)

Because these names don't exist in the `menu_items` table, `useMenuAvailability` defaults them to "available" with no way for admin to toggle them off.

## Fix

1. **Seed the database** with every item shown on the customer Menu (`src/pages/Menu.tsx`), using the exact display names so the case-insensitive name match in `useMenuAvailability` works. Use `INSERT ... ON CONFLICT DO NOTHING` (after adding a unique index on `lower(name)`) so existing rows aren't duplicated.

2. **Remove the hardcoded `defaultMenuItems` fallback** in `src/pages/Admin.tsx`. Always load from the DB so the admin list is the single source of truth. If load fails, show an error rather than a stale hardcoded list.

3. **Name normalization**: a few customer-menu names differ slightly from existing DB rows (e.g. Menu shows "Curry Chicken" under ROTI WRAPS, DB has "Curry Chicken Roti"; Menu shows "Suya Dinner (grilled beef tenderloin)", DB has "Suya Dinner"; Menu shows "Doubles: Make it Exclusive add Any Meat", DB has "Doubles: Make it Exclusive"; Menu shows "Vegetable Soup (No Meat)", DB has "Vegetable Soup"). I will update the Menu.tsx labels OR rename DB rows so the names match exactly — easiest is to update DB rows to match the customer-facing labels (since those are what the user sees and what the availability hook compares against).

4. **Catering items** are not orderable (orderable: false on that section). Still seed them so admin can mark them unavailable if desired — but they won't render an "Add to Cart" button on the menu regardless. We'll add an `is_orderable` column? Not needed — the menu's orderable flag stays section-level. Just seeding is enough.

## Technical steps

1. Migration: add `CREATE UNIQUE INDEX menu_items_name_lower_idx ON menu_items (lower(name));`
2. Data inserts (via insert tool): add ~40 missing rows; rename ~4 mismatched rows to match Menu.tsx labels.
3. Edit `src/pages/Admin.tsx`:
   - Delete the `defaultMenuItems` array (lines ~46–74).
   - In `loadMenuItems`, remove the fallback that seeds `defaultMenuItems`; on empty/error show a toast and an empty state.

After this, every item on the menu will appear in the admin "Menu Availability" tab and toggling "Sold Out" will reflect on the customer site in real time (already wired via `useMenuAvailability`).