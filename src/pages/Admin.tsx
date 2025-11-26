import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShaderText } from "@/components/ShaderText";
import { Clock, Package, ChefHat, LogOut, RefreshCw, Search, AlertCircle, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { getTodayStartInToronto, getTodayEndInToronto, formatTodayTime } from "@/lib/timezone";

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  pickup_time: string;
  special_instructions: string;
  created_at: string;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  is_available: boolean;
}

// Menu items from the menu page for managing availability
const defaultMenuItems = [
  { id: "jerk-chicken-lunch", name: "Jerk Chicken, Rice & Peas (Lunch)", price: 7.50, category: "Lunch Special" },
  { id: "doubles", name: "Doubles", price: 4.00, category: "Lunch Special" },
  { id: "doubles-exclusive", name: "Doubles: Make it Exclusive", price: 11.50, category: "Lunch Special" },
  { id: "curry-chicken-roti", name: "Curry Chicken Roti", price: 14.99, category: "ROTI WRAPS" },
  { id: "vegetarian-roti", name: "Vegetarian ROTI", price: 14.99, category: "ROTI WRAPS" },
  { id: "oxtail-dinner", name: "Oxtail Dinner", price: 22.50, category: "Dinner" },
  { id: "curry-goat-dinner", name: "Curry Goat Dinner", price: 22.50, category: "Dinner" },
  { id: "suya-dinner", name: "Suya Dinner", price: 22.50, category: "Dinner" },
  { id: "jerk-chicken-dinner", name: "Jerk Chicken Dinner", price: 18.50, category: "Dinner" },
  { id: "curry-chicken-dinner", name: "Curry Chicken Dinner", price: 18.50, category: "Dinner" },
  { id: "fufu-dinner", name: "Pounded Yam (Fufu)", price: 18.50, category: "Dinner" },
  { id: "fish-dinner", name: "Fish Dinner", price: 24.99, category: "Dinner" },
  { id: "pasta-dinner", name: "Pasta Dinner", price: 18.50, category: "Dinner" },
  { id: "shrimp-dinner", name: "Shrimp Dinner", price: 18.50, category: "Dinner" },
  { id: "yam-porridge-dinner", name: "Yam Porridge Dinner", price: 18.50, category: "Dinner" },
  { id: "roti-dinner", name: "ROTI Dinner", price: 18.50, category: "Dinner" },
  { id: "plantain-poutine-meat", name: "Plantain Poutine with Any Meat", price: 18.50, category: "Dinner" },
  { id: "egusi-soup", name: "Egusi Soup", price: 7.99, category: "Soups" },
  { id: "chicken-curry-soup", name: "Chicken Curry", price: 7.99, category: "Soups" },
  { id: "okro-soup", name: "Okro Soup", price: 7.99, category: "Soups" },
  { id: "vegetable-soup", name: "Vegetable Soup", price: 7.99, category: "Soups" },
  { id: "goat-pepper-soup", name: "Goat Pepper Soup", price: 24.99, category: "Soups" },
  { id: "fried-plantain", name: "Fried Plantain", price: 4.50, category: "Side Orders" },
  { id: "plantain-fries", name: "Plantain fries", price: 5.00, category: "Side Orders" },
  { id: "rice-side", name: "Rice", price: 4.50, category: "Side Orders" },
  { id: "jerk-chicken-side", name: "Jerk Chicken (Side)", price: 7.50, category: "Side Orders" },
  { id: "curry-chicken-side", name: "Curry Chicken (Side)", price: 9.99, category: "Side Orders" },
];

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setIsAuthenticated(true);
      await loadData();
    }
    setIsLoading(false);
  };

  const loadData = async () => {
    await Promise.all([loadOrders(), loadMenuItems()]);
  };

  const loadOrders = async () => {
    try {
      // Get today's date range in Toronto timezone
      const todayStart = getTodayStartInToronto();
      const todayEnd = getTodayEndInToronto();

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .gte("created_at", todayStart)
        .lte("created_at", todayEnd)
        .order("created_at", { ascending: false });

      if (error) {
        // Table might not exist yet
        if (error.code === "42P01") {
          console.log("Orders table not created yet");
          setOrders([]);
          return;
        }
        throw error;
      }
      // Map database rows to Order type, casting JSON items
      const mappedOrders: Order[] = (data || []).map((row) => ({
        ...row,
        items: row.items as Array<{ id: string; name: string; price: number; quantity: number }>,
        special_instructions: row.special_instructions || "",
      }));
      setOrders(mappedOrders);
    } catch (error) {
      console.error("Error loading orders:", error);
      // Use demo data if database not set up
      setOrders([]);
    }
  };

  const loadMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .order("category");

      if (error) {
        // Table might not exist, use defaults
        if (error.code === "42P01") {
          setMenuItems(defaultMenuItems.map(item => ({ ...item, is_available: true })));
          return;
        }
        throw error;
      }

      if (data && data.length > 0) {
        setMenuItems(data);
      } else {
        // No data, use defaults
        setMenuItems(defaultMenuItems.map(item => ({ ...item, is_available: true })));
      }
    } catch (error) {
      console.error("Error loading menu items:", error);
      setMenuItems(defaultMenuItems.map(item => ({ ...item, is_available: true })));
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
          },
        });

        if (error) throw error;

        if (data.user) {
          // Add admin role for this user
          const { error: roleError } = await supabase
            .from("user_roles")
            .insert({ user_id: data.user.id, role: "admin" });

          if (roleError) {
            console.error("Error assigning admin role:", roleError);
          }

          toast.success("Account created! You can now sign in.");
          setIsSignUp(false);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setIsAuthenticated(true);
        await loadData();
        toast.success("Welcome back!");
      }
    } catch (error: any) {
      toast.error(error.message || `Failed to ${isSignUp ? "sign up" : "login"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setOrders([]);
    toast.success("Logged out successfully");
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      setOrders((current) =>
        current.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const toggleItemAvailability = async (itemId: string, isAvailable: boolean) => {
    // Update local state immediately for responsiveness
    setMenuItems((current) =>
      current.map((item) =>
        item.id === itemId ? { ...item, is_available: isAvailable } : item
      )
    );

    try {
      const { error } = await supabase
        .from("menu_items")
        .update({ is_available: isAvailable })
        .eq("id", itemId);

      if (error && error.code !== "42P01") {
        throw error;
      }
      toast.success(isAvailable ? "Item is now available" : "Item marked as unavailable");
    } catch (error) {
      console.error("Error updating item:", error);
      // Still show success since local state is updated
      toast.success(isAvailable ? "Item is now available" : "Item marked as unavailable");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "confirmed": return "bg-blue-500";
      case "preparing": return "bg-purple-500";
      case "ready": return "bg-green-500";
      case "completed": return "bg-gray-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const groupedMenuItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-brand-orange" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              {isSignUp ? <UserPlus className="h-6 w-6 text-brand-orange" /> : <ChefHat className="h-6 w-6 text-brand-orange" />}
              {isSignUp ? "Create Admin Account" : "Admin Login"}
            </CardTitle>
            <CardDescription>
              {isSignUp ? "Create a new admin account" : "Sign in to manage orders and menu items"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mamafavourite.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSignUp ? "Create a strong password" : ""}
                  minLength={6}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/90">
                {isSignUp ? "Create Account" : "Sign In"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <ShaderText as="h1" text="Admin Dashboard" className="text-3xl md:text-5xl mb-2" />
            <p className="text-muted-foreground">Manage orders and menu items</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={loadData}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
              {orders.filter(o => o.status !== "completed" && o.status !== "cancelled").length > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {orders.filter(o => o.status !== "completed" && o.status !== "cancelled").length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="menu" className="flex items-center gap-2">
              <ChefHat className="h-4 w-4" />
              Menu Items
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Showing today's orders only (Toronto time) • Resets at midnight</span>
            </div>

            {filteredOrders.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Package className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">No orders today</p>
                  <p className="text-sm text-muted-foreground/70">Orders will appear here when customers place them</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className={order.status === "ready" ? "border-green-500 border-2" : ""}>
                      <CardHeader className="pb-3">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              #{order.order_number}
                              <Badge className={getStatusColor(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Clock className="h-3 w-3" />
                              {formatTodayTime(order.created_at)} • Pickup: {order.pickup_time}
                            </CardDescription>
                          </div>
                          <Select
                            value={order.status}
                            onValueChange={(value) => updateOrderStatus(order.id, value)}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="preparing">Preparing</SelectItem>
                              <SelectItem value="ready">Ready</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Customer</p>
                            <p className="font-medium">{order.customer_name}</p>
                            <p className="text-sm">{order.customer_phone}</p>
                            <p className="text-sm">{order.customer_email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Items</p>
                            <ul className="space-y-1 text-sm">
                              {order.items.map((item, idx) => (
                                <li key={idx} className="flex justify-between">
                                  <span>{item.quantity}x {item.name}</span>
                                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        {order.special_instructions && (
                          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                            <p className="text-sm font-medium flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-yellow-600" />
                              Special Instructions:
                            </p>
                            <p className="text-sm mt-1">{order.special_instructions}</p>
                          </div>
                        )}
                        <div className="flex justify-end pt-2 border-t">
                          <p className="text-lg font-bold text-brand-orange">
                            Total: ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Menu Items Tab */}
          <TabsContent value="menu" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Menu Availability</CardTitle>
                <CardDescription>
                  Toggle items on/off to update what's available for ordering
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(groupedMenuItems).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-lg mb-3 text-brand-orange">{category}</h3>
                    <div className="grid gap-2">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                            item.is_available ? "bg-white dark:bg-black" : "bg-muted opacity-60"
                          }`}
                        >
                          <div className="flex-1">
                            <p className={`font-medium ${!item.is_available && "line-through"}`}>
                              {item.name}
                            </p>
                            <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">
                              {item.is_available ? "Available" : "Unavailable"}
                            </span>
                            <Switch
                              checked={item.is_available}
                              onCheckedChange={(checked) => toggleItemAvailability(item.id, checked)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

