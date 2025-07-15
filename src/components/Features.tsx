import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneCall, Bot, Calendar, Shield, Mic, MapPin } from "lucide-react";
import voiceAiImage from "@/assets/voice-ai-care.png";
import emergencyQrImage from "@/assets/emergency-qr.png";

const features = [
  {
    icon: Mic,
    title: "Voice SOS Trigger",
    description: "Shout 'Ambulance needed!' to instantly trigger emergency response. Works offline with on-device wake-word detection.",
    benefits: ["< 3 second activation", "Works offline", "No false triggers"]
  },
  {
    icon: MapPin,
    title: "Smart Dispatch",
    description: "AI-powered fleet management finds the nearest available ambulance with real-time traffic optimization.",
    benefits: ["Real-time tracking", "Traffic optimization", "ETA predictions"]
  },
  {
    icon: Calendar,
    title: "Medication Reminders",
    description: "Automated voice and SMS reminders for medications, with caregiver notifications and compliance tracking.",
    benefits: ["Voice & SMS alerts", "Caregiver notifications", "Compliance tracking"]
  },
  {
    icon: Bot,
    title: "AI Care Assistant",
    description: "24/7 AI-powered health coach answering questions, providing first-aid guidance, and triaging concerns.",
    benefits: ["24/7 availability", "Multilingual support", "Medical triage"]
  },
  {
    icon: Shield,
    title: "Emergency Health Records",
    description: "QR code medical cards with allergies, medications, and emergency contacts accessible to paramedics.",
    benefits: ["Instant access", "Critical info", "HIPAA compliant"]
  },
  {
    icon: PhoneCall,
    title: "Family Notifications",
    description: "Automatic alerts to emergency contacts with live tracking and status updates during emergencies.",
    benefits: ["Auto notifications", "Live tracking", "Status updates"]
  }
];

export const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Complete Emergency Healthcare Platform
          </h2>
          <p className="text-xl text-muted-foreground">
            From voice-triggered emergency response to ongoing care management, 
            we've built a comprehensive platform that keeps you and your loved ones safe.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="relative group hover:shadow-healthcare transition-all duration-300 border-border/50 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* AI Care Assistant */}
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 text-primary text-sm font-medium">
                <Bot className="h-4 w-4" />
                AI-Powered Care
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                Your Personal Health Coach, Available 24/7
              </h3>
              <p className="text-lg text-muted-foreground">
                Get instant answers to health questions, first-aid guidance, and smart triage 
                that knows when to recommend self-care vs. professional help.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Smart Health Triage</h4>
                  <p className="text-muted-foreground">AI determines urgency and recommends appropriate care level</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Multilingual Support</h4>
                  <p className="text-muted-foreground">Communicate in English, Hindi, and regional languages</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Voice & Text Interface</h4>
                  <p className="text-muted-foreground">Chat on website or call the AI hotline for voice assistance</p>
                </div>
              </div>
            </div>

            <Button className="bg-gradient-primary hover:shadow-healthcare transition-all duration-300">
              <Bot className="mr-2 h-5 w-5" />
              Try AI Assistant
            </Button>
          </div>

          <div className="relative animate-slide-up">
            <img 
              src={voiceAiImage} 
              alt="Medical professional using AI voice assistant" 
              className="rounded-2xl shadow-healthcare w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Emergency QR Feature */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mt-20">
          <div className="relative animate-slide-up lg:order-first">
            <img 
              src={emergencyQrImage} 
              alt="QR code emergency medical card" 
              className="rounded-2xl shadow-healthcare w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-emergency/10 rounded-full px-4 py-2 text-emergency text-sm font-medium">
                <Shield className="h-4 w-4" />
                Emergency Ready
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                Instant Access to Critical Medical Information
              </h3>
              <p className="text-lg text-muted-foreground">
                QR code wristbands and cards give paramedics immediate access to your 
                allergies, medications, blood type, and emergency contacts.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emergency/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-emergency rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Critical Allergies & Medications</h4>
                  <p className="text-muted-foreground">Prevent dangerous drug interactions and allergic reactions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emergency/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-emergency rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Blood Type & Medical History</h4>
                  <p className="text-muted-foreground">Essential information for emergency treatment decisions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emergency/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-emergency rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Emergency Contacts</h4>
                  <p className="text-muted-foreground">Instantly notify family members and healthcare providers</p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="border-emergency text-emergency hover:bg-emergency hover:text-white transition-colors">
              <Shield className="mr-2 h-5 w-5" />
              Generate Emergency Card
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};