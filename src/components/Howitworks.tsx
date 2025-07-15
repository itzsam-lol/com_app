import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, MapPin, Truck, Heart } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Mic,
    title: "Voice Activation",
    description: "Shout 'Ambulance needed!' to trigger the emergency response. Our offline wake-word engine activates instantly.",
    details: ["Works without internet", "No false positives", "< 3 second response"]
  },
  {
    step: "02", 
    icon: MapPin,
    title: "Location & Dispatch",
    description: "GPS coordinates are captured and sent to our dispatch system, which finds the nearest available ambulance.",
    details: ["Real-time GPS tracking", "Traffic optimization", "Fleet management AI"]
  },
  {
    step: "03",
    icon: Truck,
    title: "Ambulance Deployed",
    description: "Paramedics receive your location and medical information, with live navigation to reach you quickly.",
    details: ["Live navigation", "Medical history access", "Family notifications"]
  },
  {
    step: "04",
    icon: Heart,
    title: "Ongoing Care",
    description: "After emergency care, our platform provides medication reminders and AI health coaching for recovery.",
    details: ["Medication adherence", "Recovery tracking", "24/7 AI support"]
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How Emergency Response Works
          </h2>
          <p className="text-xl text-muted-foreground">
            From voice trigger to ongoing care, our platform ensures you get help when you need it most.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-primary transform -translate-y-1/2 z-0"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <Card 
                key={step.step}
                className="relative bg-background border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-healthcare animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  {/* Step Number */}
                  <div className="relative">
                    <Badge 
                      variant="outline" 
                      className="absolute -top-3 -right-3 bg-primary text-primary-foreground border-primary text-xs px-2 py-1"
                    >
                      {step.step}
                    </Badge>
                    
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    
                    {/* Details */}
                    <ul className="space-y-1 text-sm">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-1 h-1 bg-primary rounded-full"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center space-y-2 animate-fade-in">
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              98.5%
            </div>
            <div className="text-lg font-semibold text-foreground">Success Rate</div>
            <div className="text-muted-foreground">Emergency responses completed successfully</div>
          </div>
          
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              2.3min
            </div>
            <div className="text-lg font-semibold text-foreground">Avg Response</div>
            <div className="text-muted-foreground">From voice trigger to ambulance dispatch</div>
          </div>
          
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              24/7
            </div>
            <div className="text-lg font-semibold text-foreground">AI Support</div>
            <div className="text-muted-foreground">Always-available health coaching and triage</div>
          </div>
        </div>
      </div>
    </section>
  );
};