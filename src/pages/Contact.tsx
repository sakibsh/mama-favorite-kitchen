import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? Need catering for your event? We'd love to hear from you!
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl font-display text-primary">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiryType">Inquiry Type</Label>
                  <Select
                    value={formData.inquiryType}
                    onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="takeout">Take-out Order</SelectItem>
                      <SelectItem value="catering">Catering Request</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full gap-2" size="lg" disabled={isSubmitting}>
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl font-display text-primary">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Location</h3>
                    <p className="text-muted-foreground">45 Cork St E</p>
                    <p className="text-muted-foreground">Guelph, ON N1H 2W7</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <a href="tel:5198245741" className="text-primary hover:underline block">
                      (519) 824-5741
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Call us for take-out orders or catering inquiries
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a href="mailto:egcguelph@gmail.com" className="text-primary hover:underline block">
                      egcguelph@gmail.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Manager: Favour J. Idahosa
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Hours of Operation</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="font-medium">Monday:</span>
                        <span className="text-muted-foreground">11 AM - 10 PM</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="font-medium">Tue - Thu:</span>
                        <span className="text-muted-foreground">11 AM - 10 PM</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="font-medium">Fri - Sat:</span>
                        <span className="text-muted-foreground">11 AM - 2 AM</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="font-medium">Sunday:</span>
                        <span className="text-muted-foreground">1 PM - 8 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Catering Info */}
            <Card className="shadow-card bg-primary/5 border-2 border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-2xl font-display font-bold text-primary mb-3">
                  Catering Services for All Occasions
                </h3>
                <p className="text-muted-foreground mb-4 font-medium">
                  We offer professional catering services with authentic African & Caribbean cuisine for all types of events:
                </p>
                <ul className="space-y-2 text-muted-foreground mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 text-lg">•</span>
                    <span>Weddings and celebrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 text-lg">•</span>
                    <span>Corporate events and meetings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 text-lg">•</span>
                    <span>Birthday parties and anniversaries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 text-lg">•</span>
                    <span>Community gatherings and fundraisers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 text-lg">•</span>
                    <span>Private parties and social events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 text-lg">•</span>
                    <span>Religious and cultural celebrations</span>
                  </li>
                </ul>
                <div className="bg-white rounded-md p-4 mb-4">
                  <p className="font-semibold text-secondary mb-2">Customizable Menu Options:</p>
                  <p className="text-sm text-muted-foreground">
                    From intimate gatherings to large celebrations, we'll work with you to create the perfect menu. Choose from our signature dishes or let us customize a spread for your event.
                  </p>
                </div>
                <p className="text-sm font-semibold text-primary">
                  📞 Call us at (519) 824-5741 to discuss your catering needs and get a custom quote!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 max-w-6xl mx-auto">
          <Card className="shadow-card overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-display text-primary">Find Us</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2900.3!2d-80.2491!3d43.5448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDMyJzQxLjMiTiA4MMKwMTQnNTYuOCJX!5e0!3m2!1sen!2sca!4v1234567890"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mama Favourite Kitchen Location"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;