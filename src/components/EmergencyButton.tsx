import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mic, MicOff, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmergencyButtonProps {
  onEmergencyTriggered: (data: { location: string; timestamp: Date; type: string }) => void;
}

export function EmergencyButton({ onEmergencyTriggered }: EmergencyButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  const simulateLocation = () => {
    const locations = [
      "123 Main St, Downtown",
      "456 Oak Ave, Central Park",
      "789 Pine Rd, Medical District",
      "321 Elm St, University Area"
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const triggerEmergency = (type: string) => {
    const location = simulateLocation();
    const timestamp = new Date();
    
    setIsEmergencyActive(true);
    onEmergencyTriggered({ location, timestamp, type });
    
    toast({
      title: "🚨 Emergency Alert Sent",
      description: `${type} alert dispatched. Help is on the way!`,
      variant: "destructive",
    });

    // Auto-deactivate after 30 seconds for demo
    setTimeout(() => setIsEmergencyActive(false), 30000);
  };

  const handleVoiceEmergency = () => {
    setIsListening(true);
    
    // Simulate voice recognition delay
    setTimeout(() => {
      setIsListening(false);
      triggerEmergency("Voice Activated Emergency");
    }, 2000);
  };

  const handleAccidentDetection = () => {
    setCountdown(10);
    
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          triggerEmergency("Accident Detection");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelCountdown = () => {
    setCountdown(0);
  };

  useEffect(() => {
    if (countdown > 0) {
      toast({
        title: "⚠️ Accident Detected",
        description: `Emergency alert in ${countdown} seconds. Tap to cancel.`,
      });
    }
  }, [countdown, toast]);

  return (
    <div className="space-y-4">
      {/* Main Emergency Button */}
      <div className="flex flex-col items-center space-y-4">
        <Button
          variant="emergency"
          size="lg"
          className="h-32 w-32 rounded-full text-xl font-bold shadow-2xl"
          onClick={() => triggerEmergency("Manual Emergency")}
          disabled={isEmergencyActive}
        >
          <Phone className="h-8 w-8" />
          {isEmergencyActive ? "ACTIVE" : "EMERGENCY"}
        </Button>
        
        {isEmergencyActive && (
          <div className="text-center">
            <div className="flex items-center space-x-2 text-emergency font-semibold">
              <Clock className="h-4 w-4" />
              <span>Emergency services notified</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground text-sm mt-1">
              <MapPin className="h-3 w-3" />
              <span>Location shared with responders</span>
            </div>
          </div>
        )}
      </div>

      {/* Voice Activation */}
      <div className="flex flex-col space-y-2">
        <Button
          variant={isListening ? "destructive" : "medical"}
          onClick={handleVoiceEmergency}
          disabled={isEmergencyActive || isListening}
          className="w-full"
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          {isListening ? "Listening... Say 'Help me'" : "Voice Emergency"}
        </Button>
      </div>

      {/* Accident Detection Simulation */}
      <div className="flex flex-col space-y-2">
        <Button
          variant="outline"
          onClick={handleAccidentDetection}
          disabled={isEmergencyActive || countdown > 0}
          className="w-full"
        >
          Simulate Accident Detection
        </Button>
        
        {countdown > 0 && (
          <div className="bg-emergency-muted p-4 rounded-lg text-center">
            <div className="text-emergency font-bold text-lg">
              Emergency Alert in {countdown}s
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={cancelCountdown}
              className="mt-2"
            >
              Cancel Alert
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}