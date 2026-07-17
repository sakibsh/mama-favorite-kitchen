## Sync Admin Menu with New Menu

The admin portal (`/admin` → Menu tab) reads from the `menu_items` database table, while the customer menu on `/menu` is hardcoded in `src/pages/Menu.tsx`. After the recent menu revamp, the DB was never updated, which is why admin still shows the old items.

### Fix

Replace the contents of the `menu_items` table so it matches the new hardcoded menu exactly (same names, so the "Sold Out" toggle continues to link up via `useMenuAvailability`).

Steps:
1. `DELETE FROM public.menu_items` (wipes old items).
2. `INSERT` all items from the new menu across these categories:
   - Signature Stew Bowls (7)
   - Add to Your Bowl (4)
   - Traditional African Meals (6)
   - Grab & Go Wraps (4)
   - Fresh Doubles (3)
   - Fresh & Healthy (3)
   - Add Protein (3)
   - House-Made Sauces (4)
   - Sides & Add-Ons (4)
   - House-Made Drinks (5)
   - Catering Platters & Party Trays (12) — included so admin can toggle availability; customer menu already shows these as call-to-order.

Item `name`, `category`, `price`, and `description` will mirror `menuSections` in `Menu.tsx` precisely so name-based availability matching keeps working. `is_available` defaults to true.

### Not in scope
- No changes to `Menu.tsx`, cart, checkout, or admin UI code.
- No schema changes — this is a data-only migration performed via the insert tool (DELETE + INSERT).
