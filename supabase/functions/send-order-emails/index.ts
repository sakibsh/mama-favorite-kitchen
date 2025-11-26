import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const CHEF_EMAIL = Deno.env.get("CHEF_EMAIL") || "admin@mamafavourite.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderEmailRequest {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  pickupTime: string;
  specialInstructions?: string;
}

const formatOrderItems = (items: OrderItem[]) => {
  return items
    .map((item) => `• ${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`)
    .join("\n");
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const order: OrderEmailRequest = await req.json();

    const orderItemsHtml = order.items
      .map(
        (item) =>
          `<tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}x ${item.name}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
          </tr>`
      )
      .join("");

    // Email template for customer
    const customerEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #ea580c; margin: 0;">Mama Favourite Kitchen</h1>
          <p style="color: #666; margin: 5px 0;">Order Confirmation</p>
        </div>
        
        <p style="font-size: 18px;">Hi ${order.customerName},</p>
        <p>Thank you for your order! We're preparing your delicious food.</p>
        
        <div style="background-color: #fff3e0; border-left: 4px solid #ea580c; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold;">Order #${order.orderNumber}</p>
          <p style="margin: 5px 0 0 0;">Pickup Time: ${order.pickupTime}</p>
        </div>
        
        <h3 style="color: #333;">Order Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          ${orderItemsHtml}
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">Subtotal</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${order.subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">Tax (13% HST)</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${order.tax.toFixed(2)}</td>
          </tr>
          <tr style="font-weight: bold; font-size: 18px;">
            <td style="padding: 10px; color: #ea580c;">Total</td>
            <td style="padding: 10px; text-align: right; color: #ea580c;">$${order.total.toFixed(2)}</td>
          </tr>
        </table>
        
        ${order.specialInstructions ? `
        <div style="background-color: #fff9c4; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold;">Special Instructions:</p>
          <p style="margin: 5px 0 0 0;">${order.specialInstructions}</p>
        </div>
        ` : ""}
        
        <h3 style="color: #333;">Pickup Location</h3>
        <p style="margin: 0;">45 Cork St E</p>
        <p style="margin: 0;">Guelph, ON N1H 2W7</p>
        <p style="margin: 10px 0;"><a href="tel:5198245741" style="color: #ea580c;">(519) 824-5741</a></p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;">Thank you for choosing Mama Favourite Kitchen!</p>
          <p style="color: #999; font-size: 12px;">Food That Nurtures Souls</p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Email template for chef/restaurant
    const chefEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Order Alert</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px; background-color: #ea580c; color: white; padding: 20px; border-radius: 10px;">
          <h1 style="margin: 0;">🍽️ NEW ORDER!</h1>
          <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold;">#${order.orderNumber}</p>
        </div>
        
        <div style="background-color: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold; font-size: 18px;">⏰ Pickup: ${order.pickupTime}</p>
        </div>
        
        <h3 style="color: #333;">Customer Details</h3>
        <p><strong>Name:</strong> ${order.customerName}</p>
        <p><strong>Phone:</strong> <a href="tel:${order.customerPhone}">${order.customerPhone}</a></p>
        <p><strong>Email:</strong> ${order.customerEmail}</p>
        
        <h3 style="color: #333;">Order Items</h3>
        <table style="width: 100%; border-collapse: collapse; background-color: #fafafa;">
          ${orderItemsHtml}
        </table>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #ea580c; color: white; border-radius: 5px; text-align: center;">
          <p style="margin: 0; font-size: 24px; font-weight: bold;">Total: $${order.total.toFixed(2)}</p>
        </div>
        
        ${order.specialInstructions ? `
        <div style="background-color: #fff9c4; padding: 15px; border-radius: 5px; margin: 20px 0; border: 2px solid #f9a825;">
          <p style="margin: 0; font-weight: bold; color: #f57f17;">⚠️ Special Instructions:</p>
          <p style="margin: 5px 0 0 0; font-size: 16px;">${order.specialInstructions}</p>
        </div>
        ` : ""}
      </div>
    </body>
    </html>
    `;

    // If RESEND_API_KEY is not configured, just log and return success
    if (!RESEND_API_KEY) {
      console.log("RESEND_API_KEY not configured. Skipping email send.");
      console.log("Order details:", order);
      return new Response(
        JSON.stringify({ success: true, message: "Email service not configured" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send customer confirmation email
    const customerEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Mama Favourite Kitchen <orders@mamafavourite.com>",
        to: [order.customerEmail],
        subject: `Order Confirmation #${order.orderNumber} - Mama Favourite Kitchen`,
        html: customerEmailHtml,
      }),
    });

    // Send chef notification email
    const chefEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Mama Favourite Kitchen Orders <orders@mamafavourite.com>",
        to: [CHEF_EMAIL],
        subject: `🍽️ NEW ORDER #${order.orderNumber} - ${order.customerName}`,
        html: chefEmailHtml,
      }),
    });

    const customerResult = await customerEmailRes.json();
    const chefResult = await chefEmailRes.json();

    return new Response(
      JSON.stringify({
        success: true,
        customerEmail: customerResult,
        chefEmail: chefResult,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending emails:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

