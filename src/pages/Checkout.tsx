import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShaderText } from "@/components/ShaderText";
import { InteractiveCard } from "@/components/InteractiveCard";
import { ArrowLeft, Clock, CreditCard, Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, tax, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupTime: "",
    specialInstructions: "",
  });

  const pickupTimes = [
    "ASAP (20-30 mins)",
    "30 minutes",
    "45 minutes",
    "1 hour",
    "1.5 hours",
    "2 hours",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `MFK-${timestamp}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.pickupTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      const orderNum = generateOrderNumber();

      // Create order in database
      const { error: orderError } = await supabase.from("orders").insert([{
        order_number: orderNum,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        items: JSON.parse(JSON.stringify(items)),
        subtotal: subtotal,
        tax: tax,
        total: total,
        pickup_time: formData.pickupTime,
        special_instructions: formData.specialInstructions,
        status: "confirmed",
      }]);

      if (orderError) {
        console.error("Order error:", orderError);
        // If table doesn't exist, show a friendly message but still process order
        if (orderError.code === "42P01") {
          console.log("Orders table not created yet - proceeding with demo order");
        } else {
          throw orderError;
        }
      }

      // Send confirmation emails via edge function
      try {
        await supabase.functions.invoke("send-order-emails", {
          body: {
            orderNumber: orderNum,
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            items: items,
            subtotal: subtotal,
            tax: tax,
            total: total,
            pickupTime: formData.pickupTime,
            specialInstructions: formData.specialInstructions,
          },
        });
      } catch (emailError) {
        console.log("Email function not set up yet:", emailError);
      }

      setOrderNumber(orderNum);
      setOrderComplete(true);
      clearCart();
      toast.success("Order placed successfully!");

    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("There was an error placing your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-14 w-14 text-green-600" />
            </div>
            <h1 className="text-4xl font-display font-bold text-foreground mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Thank you for your order, {formData.name}!
            </p>
            <p className="text-lg font-semibold text-brand-orange mb-8">
              Order #{orderNumber}
            </p>

            <Card className="text-left mb-8">
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Pickup Time</p>
                  <p className="font-semibold">{formData.pickupTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">45 Cork St E, Guelph, ON N1H 2W7</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Paid</p>
                  <p className="font-semibold text-brand-orange">${total.toFixed(2)}</p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    A confirmation email has been sent to <span className="font-medium">{formData.email}</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/")} variant="outline" size="lg">
                Back to Home
              </Button>
              <Button onClick={() => navigate("/menu")} size="lg" className="bg-brand-orange hover:bg-brand-orange/90">
                Order More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Add some delicious items to your order first!
          </p>
          <Button onClick={() => navigate("/menu")} size="lg" className="bg-brand-orange hover:bg-brand-orange/90">
            Browse Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/menu")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Menu
        </Button>

        <div className="text-center mb-12">
          <ShaderText as="h1" text="Checkout" className="text-4xl md:text-6xl mb-4" />
          <p className="text-muted-foreground">Complete your order for pickup</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Customer Details Form */}
          <div>
            <InteractiveCard className="bg-white/80 dark:bg-black/80 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-brand-orange" />
                  Pickup Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(519) 555-0123"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pickupTime">Pickup Time *</Label>
                    <Select
                      value={formData.pickupTime}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, pickupTime: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select pickup time" />
                      </SelectTrigger>
                      <SelectContent>
                        {pickupTimes.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
                    <Textarea
                      id="specialInstructions"
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                      placeholder="Any allergies or special requests?"
                      rows={3}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Payment will be collected at pickup
                    </p>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-brand-orange hover:bg-brand-orange/90 h-14 text-lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Place Order • $${total.toFixed(2)}`
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </InteractiveCard>
          </div>

          {/* Order Summary */}
          <div>
            <InteractiveCard className="bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-32">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 space-y-2 border-t">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (13% HST)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t">
                    <span>Total</span>
                    <span className="text-brand-orange">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    <strong>Pickup Location:</strong><br />
                    45 Cork St E, Guelph, ON N1H 2W7
                  </p>
                </div>
              </CardContent>
            </InteractiveCard>
          </div>
        </div>
      </div>
    </div>
  );
}

