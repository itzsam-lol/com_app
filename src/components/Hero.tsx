import { Button } from "@/components/ui/button";
import { PhoneCall, Play } from "lucide-react";
import heroImage from "@/assets/hero-ambulance.png";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.05'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zm-20 16c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-black/90 text-sm border border-white/20">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></div>
                Emergency Response Active
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-black leading-tight">
                <span className="block">Voice-Triggered</span>
                <span className="block bg-gradient-to-r from-black to-black/80 bg-clip-text text-transparent">
                  Emergency Care
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-black/90 leading-relaxed max-w-2xl">
                Shout "Ambulance needed!" and get instant emergency response. 
                Complete healthcare platform with smart dispatch, medication reminders, and AI-powered care assistance.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="flex flex-wrap gap-6 text-black/90">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="font-medium">{"<"}3 sec response time</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="font-medium">24/7 voice monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="font-medium">Smart medication reminders</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-soft transition-smooth group px-8 py-4 text-lg font-semibold"
                onClick={() => navigate("/index")}
              >
                <PhoneCall className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Try Emergency Demo
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-black hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch How It Works
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-white/20">
              <p className="text-black/70 text-sm mb-4">Trusted by healthcare providers:</p>
              <div className="flex items-center gap-8 opacity-60">
                <div className="text-black font-semibold">108 EMS</div>
                <div className="text-black font-semibold">HealthTech India</div>
                <div className="text-black font-semibold">MedAssist</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:order-last animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-healthcare">
              <img 
                src={heroImage} 
                alt="Emergency response dashboard showing ambulance dispatch" 
                className="w-full h-auto object-cover"
              />
              {/* Overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-soft border border-gray-100 animate-fade-in delay-300">
              <div className="text-2xl font-bold text-primary">98.5%</div>
              <div className="text-sm text-muted-foreground">Response Success Rate</div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-soft border border-gray-100 animate-fade-in delay-500">
              <div className="text-2xl font-bold text-emergency">2.3 min</div>
              <div className="text-sm text-muted-foreground">Avg. Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
