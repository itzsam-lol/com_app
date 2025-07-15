import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, PhoneCall, Mail, MapPin, Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">VoiceCare</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Revolutionary voice-triggered emergency response platform with comprehensive healthcare management.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-success" />
                HIPAA Compliant
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Emergency Response</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Smart Dispatch</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Medication Reminders</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI Health Coach</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Emergency Records</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Healthcare Partners</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Emergency Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <PhoneCall className="h-4 w-4 text-emergency" />
                <span className="text-sm">Emergency: 108</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <PhoneCall className="h-4 w-4 text-primary" />
                <span className="text-sm">Support: +91-800-VOICECARE</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">help@voicecare.health</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">Mumbai, India</span>
              </div>
            </div>
            
            <Button className="w-full bg-gradient-primary hover:shadow-healthcare transition-all duration-300">
              <PhoneCall className="mr-2 h-4 w-4" />
              Get Emergency Demo
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 VoiceCare. All rights reserved. Built for saving lives.
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};