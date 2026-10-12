# Switch Stripe to the new live key

## Goal
Point online ordering payments at the new Stripe account using the saved live restricted key (`STRIPE_RESTRICTED_API_KEY`), replacing the old account's key.

## Changes

1. **Update the two payment functions** (no other code changes needed):
   - `supabase/functions/create-checkout/index.ts`
   - `supabase/functions/verify-payment/index.ts`
   - Change both to read `STRIPE_RESTRICTED_API_KEY` from the environment instead of `STRIPE_SECRET_KEY`.

2. **Redeploy both functions** so the new key takes effect.

3. **Verify** the functions deploy cleanly and the key is recognized (a checkout session can be created against the new account).

## Notes
- The key itself is already stored securely; it never appears in code or chat.
- No webhook secret is needed — the current setup does not use Stripe webhooks.
- After switching, payments process on the new account; past orders/customers on the old account stay there.
- A restricted key must have permission to create Checkout Sessions and retrieve them — if the key lacks these, checkout will fail and we'll flag it.
