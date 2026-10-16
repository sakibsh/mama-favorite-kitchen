# Edit prices and menu items from the admin portal

## What you'll be able to do
In the admin portal's Menu tab, each item gets an **Edit** button that opens a small form to change:
- Name
- Price (leave at 0 for "call for price", e.g. catering)
- Description
- Section (category)

Plus:
- **Add item** button per section (name, price, description).
- **Delete item** (with a confirm prompt).
- The existing Available/Sold Out switch stays as is.

Changes show up on the customer menu instantly, with no code update needed.

## Why this needs a change
Today the customer menu's prices and descriptions are typed into the page itself; the admin portal only controls sold-out status. So the customer menu will now read name, price and description from the same list the admin edits. Badges ("New", "Popular"), time windows (lunch special hours) and section layout stay as they are now. Any item an admin adds will show up at the end of its section.

## Payment safety
The checkout will look up each item's price from the database, so the amount charged always matches what the admin set, even if someone tampers with the cart.

## Technical details
- `Admin.tsx`: edit dialog (shadcn Dialog + inputs) doing `update` on `menu_items`; add dialog doing `insert`; delete doing `delete`. Existing admin RLS policies already allow this.
- Replace `useMenuAvailability` with a `useMenuItems` hook (select name, price, description, category, is_available, realtime subscription), keyed by lowercase name.
- `Menu.tsx`: static sections keep structure, badges and ordering; price/description/availability come from the database row when present; database rows not in the static list are added to the end of their category. Price 0 renders as "Call".
- `create-checkout` edge function: re-price line items from `menu_items` by id/name before creating the Stripe session; redeploy.
- Renaming an item in admin keeps it matched by updating the record (match by DB id where available, name as fallback).
