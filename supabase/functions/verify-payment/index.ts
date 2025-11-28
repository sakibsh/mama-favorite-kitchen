import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    const { sessionId } = await req.json();
    
    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    console.log("Verifying payment for session:", sessionId);

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return new Response(
        JSON.stringify({ success: false, message: "Payment not completed" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    const metadata = session.metadata || {};
    const orderNumber = metadata.orderNumber;
    const customerName = metadata.customerName;
    const customerEmail = metadata.customerEmail;
    const customerPhone = metadata.customerPhone;
    const pickupTime = metadata.pickupTime;
    const specialInstructions = metadata.specialInstructions;
    const items = JSON.parse(metadata.items || "[]");
    const subtotal = parseFloat(metadata.subtotal || "0");
    const tax = parseFloat(metadata.tax || "0");
    const total = parseFloat(metadata.total || "0");

    console.log("Payment verified, order number:", orderNumber);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Save order to database
    const { error: orderError } = await supabaseClient.from("orders").insert([{
      order_number: orderNumber,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      items: items,
      subtotal: subtotal,
      tax: tax,
      total: total,
      pickup_time: pickupTime,
      special_instructions: specialInstructions || null,
      status: "paid",
    }]);

    if (orderError) {
      console.error("Error saving order:", orderError);
      // Continue even if order save fails - payment was successful
    } else {
      console.log("Order saved to database");
    }

    // Send confirmation emails and SMS
    try {
      const emailResponse = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-order-emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
        },
        body: JSON.stringify({
          orderNumber,
          customerName,
          customerEmail,
          customerPhone,
          items,
          subtotal,
          tax,
          total,
          pickupTime,
          specialInstructions,
        }),
      });
      console.log("Email/SMS notification sent:", await emailResponse.json());
    } catch (emailError) {
      console.error("Error sending notifications:", emailError);
      // Continue even if notifications fail
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderNumber,
        customerName,
        customerEmail,
        pickupTime,
        total,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error verifying payment:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
