import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  Phone, 
  MapPin, 
  Heart, 
  Users, 
  Mic, 
  Activity, 
  Clock, 
  Globe, 
  Lock, 
  BarChart3, 
  Truck,
  Star,
  Check,
  Crown,
  Zap,
  AlertTriangle,
  Building2
} from 'lucide-react';

const SubscriptionPage = () => {
  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      period: "/month",
      description: "Essential emergency response for individuals",
      badge: null,
      buttonVariant: "outline" as const,
      features: [
        { icon: Phone, text: "Voice activation with basic commands", included: true },
        { icon: MapPin, text: "Basic location tracking", included: true },
        { icon: Shield, text: "Nearest hospital finder", included: true },
        { icon: Activity, text: "Basic medical profile storage", included: true },
        { icon: Clock, text: "Emergency history (last 30 days)", included: true },
        { icon: Mic, text: "Single language support", included: true },
        { icon: Phone, text: "SMS emergency alerts", included: true },
        { icon: Globe, text: "Offline emergency support", included: false },
        { icon: Users, text: "Guardian mode & group tracking", included: false },
        { icon: Heart, text: "Community blood donation alerts", included: false }
      ]
    },
    {
      name: "Premium",
      price: "$24.99",
      period: "/month",
      description: "Advanced protection with family features",
      badge: { text: "Most Popular", variant: "success" as const },
      buttonVariant: "default" as const,
      features: [
        { icon: Phone, text: "Advanced voice commands & phrases", included: true },
        { icon: Activity, text: "Crash & fall detection sensors", included: true },
        { icon: MapPin, text: "Real-time GPS with ETA calculation", included: true },
        { icon: Shield, text: "Smart hospital routing & load balancing", included: true },
        { icon: Users, text: "Complete medical profile with allergies", included: true },
        { icon: Globe, text: "Multilingual voice support (10+ languages)", included: true },
        { icon: Lock, text: "Privacy controls & data encryption", included: true },
        { icon: Clock, text: "Full emergency history & analytics", included: true },
        { icon: Users, text: "Guardian mode for family safety", included: true },
        { icon: Heart, text: "Blood donation community access", included: true }
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "Complete hospital & organization solution",
      badge: { text: "Healthcare Pro", variant: "emergency" as const },
      buttonVariant: "emergency" as const,
      features: [
        { icon: Building2, text: "Hospital dashboard & alert management", included: true },
        { icon: Truck, text: "Ambulance assignment & tracking system", included: true },
        { icon: MapPin, text: "Live map with multi-patient ETA tracking", included: true },
        { icon: Shield, text: "Complete medical data access for hospitals", included: true },
        { icon: BarChart3, text: "Analytics & performance reporting", included: true },
        { icon: Heart, text: "Blood donation broadcast system", included: true },
        { icon: Users, text: "Volunteer matching engine", included: true },
        { icon: Crown, text: "Verified donor program management", included: true },
        { icon: AlertTriangle, text: "Multi-hospital coordination", included: true },
        { icon: Zap, text: "API access for integrations", included: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-emergency rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">RapidResponse</h1>
                <p className="text-sm text-muted-foreground">Emergency & Community Aid Platform</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="default" className="mb-4">
            Save Lives. Connect Communities.
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Choose Your Emergency 
            <span className="bg-gradient-emergency bg-clip-text text-transparent"> Protection Plan</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            From individual safety to hospital coordination—comprehensive emergency response 
            solutions that save lives and strengthen communities.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-success" />
              <span>24/7 Emergency Response</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-success" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-success" />
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative transition-all duration-300 hover:shadow-card animate-scale-in ${
                plan.name === 'Premium' ? 'ring-2 ring-primary/20 shadow-premium scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant={plan.badge.variant}>
                    {plan.badge.text}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center space-x-1 mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="mt-2 text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div 
                    key={featureIndex} 
                    className={`flex items-start space-x-3 ${
                      !feature.included ? 'opacity-50' : ''
                    }`}
                  >
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                      feature.included 
                        ? 'bg-success/10 text-success' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {feature.included ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <feature.icon className="w-3 h-3" />
                      )}
                    </div>
                    <span className="text-sm leading-relaxed text-foreground">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </CardContent>

              <CardFooter className="pt-6">
                <Button 
                  variant={plan.buttonVariant} 
                  size="lg" 
                  className="w-full"
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : `Start ${plan.name} Plan`}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-20 text-center">
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border shadow-card">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Trusted by Healthcare Professionals
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center opacity-60">
              <div className="flex items-center justify-center space-x-2">
                <Building2 className="w-6 h-6" />
                <span className="font-semibold">150+ Hospitals</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Truck className="w-6 h-6" />
                <span className="font-semibold">500+ Ambulances</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Users className="w-6 h-6" />
                <span className="font-semibold">50K+ Users</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Heart className="w-6 h-6" />
                <span className="font-semibold">10K+ Lives Saved</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Questions about our plans?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">
              View FAQ
            </Button>
            <Button variant="ghost">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;