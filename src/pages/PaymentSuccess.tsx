import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";

interface OrderDetails {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  pickupTime: string;
  total: number;
}

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [isVerifying, setIsVerifying] = useState(true);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Prevent duplicate verification calls (React StrictMode / re-renders)
  const verificationAttempted = useRef(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setError("No payment session found");
      setIsVerifying(false);
      return;
    }

    // Prevent duplicate calls from React StrictMode or re-renders
    if (verificationAttempted.current) {
      return;
    }
    verificationAttempted.current = true;

    // Check if already verified in this browser session
    const cachedResult = sessionStorage.getItem(`verified_${sessionId}`);
    if (cachedResult) {
      try {
        const cached = JSON.parse(cachedResult);
        setOrderDetails(cached);
        setIsVerifying(false);
        clearCart();
        return;
      } catch {
        // Invalid cache, continue with verification
      }
    }

    const verifyPayment = async () => {
      try {
        const { data, error: fnError } = await supabase.functions.invoke("verify-payment", {
          body: { sessionId },
        });

        if (fnError) throw fnError;

        if (data.success) {
          const details: OrderDetails = {
            orderNumber: data.orderNumber,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            pickupTime: data.pickupTime,
            total: data.total,
          };
          setOrderDetails(details);
          clearCart();
          
          // Cache the result to prevent re-verification on page refresh
          sessionStorage.setItem(`verified_${sessionId}`, JSON.stringify(details));
        } else {
          setError(data.message || "Payment verification failed");
        }
      } catch (err) {
        console.error("Payment verification error:", err);
        setError("Failed to verify payment. Please contact support.");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams, clearCart]);

  if (isVerifying) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-brand-orange mx-auto mb-4" />
          <p className="text-xl text-muted-foreground">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="h-14 w-14 text-red-600" />
            </div>
            <h1 className="text-4xl font-display font-bold text-foreground mb-4">
              Payment Issue
            </h1>
            <p className="text-muted-foreground mb-8">{error}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/checkout")} variant="outline" size="lg">
                Try Again
              </Button>
              <Button onClick={() => navigate("/contact")} size="lg" className="bg-brand-orange hover:bg-brand-orange/90">
                Contact Support
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

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
            Payment Successful!
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Thank you for your order{orderDetails?.customerName ? `, ${orderDetails.customerName}` : ""}!
          </p>
          <p className="text-lg font-semibold text-brand-orange mb-8">
            Order #{orderDetails?.orderNumber}
          </p>

          <Card className="text-left mb-8">
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Pickup Time</p>
                <p className="font-semibold">{orderDetails?.pickupTime}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold">45 Cork St E, Guelph, ON N1H 2W7</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="font-semibold text-brand-orange">
                  ${orderDetails?.total?.toFixed(2)}
                </p>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to{" "}
                  <span className="font-medium">{orderDetails?.customerEmail}</span>
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
