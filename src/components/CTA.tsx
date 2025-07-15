import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, Shield, ArrowRight, CheckCircle } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M30 30c0 16.569-13.431 30-30 30S-30 46.569-30 30s13.431-30 30-30 30 13.431 30 30z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Header */}
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-4xl lg:text-6xl font-bold text-black leading-tight">
              Ready to Transform Emergency Healthcare?
            </h2>
            <p className="text-xl lg:text-2xl text-black/90 max-w-2xl mx-auto">
              Join thousands of families who trust our platform for emergency response and ongoing health management.
            </p>
          </div>

          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-6 animate-slide-up">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-black">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <h3 className="font-semibold">Always Protected</h3>
                <p className="text-black/80 text-sm">24/7 emergency monitoring and instant response</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-black">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <PhoneCall className="h-6 w-6 text-black" />
                </div>
                <h3 className="font-semibold">Smart Care</h3>
                <p className="text-black/80 text-sm">AI-powered health coaching and medication management</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-black">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6 text-black" />
                </div>
                <h3 className="font-semibold">Proven Results</h3>
                <p className="text-black/80 text-sm">98.5% success rate with 2.3min average response time</p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-emergency transition-all duration-300 group px-8 py-4 text-lg font-semibold"
              >
                <PhoneCall className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-black hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold"
              >
                Schedule Demo Call
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-black/80 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Free 30-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="pt-12 border-t border-white/20 animate-fade-in">
            <div className="bg-emergency/10 backdrop-blur-sm rounded-2xl p-6 border border-emergency/20">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emergency rounded-full flex items-center justify-center">
                  <PhoneCall className="h-6 w-6 text-black" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h3 className="font-semibold text-black mb-1">Emergency Situation?</h3>
                  <p className="text-black/80 text-sm">Call our emergency hotline for immediate assistance</p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-emergency text-emergency hover:bg-emergency hover:text-white transition-colors font-semibold"
                >
                  Call Emergency: 108
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
