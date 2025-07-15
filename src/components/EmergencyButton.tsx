import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mic, MicOff, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmergencyButtonProps {
  onEmergencyTriggered: (data: { location: string; timestamp: Date; type: string }) => void;
}

export function EmergencyButton({ onEmergencyTriggered }: EmergencyButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [accidentCountdown, setAccidentCountdown] = useState(0);
  const { toast } = useToast();
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const accidentRef = useRef<NodeJS.Timeout | null>(null);

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
    setTimeout(() => setIsEmergencyActive(false), 30000);
  };

  // Manual Emergency with 10s cancel
  const handleEmergencyClick = () => {
    setIsCountdownActive(true);
    setCountdown(10);
    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current!);
          setIsCountdownActive(false);
          triggerEmergency("Manual Emergency");
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCancel = () => {
    setIsCountdownActive(false);
    setCountdown(10);
    if (countdownRef.current) clearInterval(countdownRef.current);
    toast({
      title: "Emergency Cancelled",
      description: "No alert was sent.",
      variant: "default",
    });
  };

  // Voice Emergency
  const handleVoiceEmergency = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      triggerEmergency("Voice Activated Emergency");
    }, 2000);
  };

  // Accident Detection
  const handleAccidentDetection = () => {
    setAccidentCountdown(10);
    if (accidentRef.current) clearInterval(accidentRef.current);
    accidentRef.current = setInterval(() => {
      setAccidentCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(accidentRef.current!);
          triggerEmergency("Accident Detection");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelAccident = () => {
    setAccidentCountdown(0);
    if (accidentRef.current) clearInterval(accidentRef.current);
    toast({
      title: "Accident Alert Cancelled",
      description: "No alert was sent.",
      variant: "default",
    });
  };

  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
      if (accidentRef.current) clearInterval(accidentRef.current);
    };
  }, []);

  return (
    <div className="space-y-6 w-full max-w-md mx-auto">
      {/* Main Emergency Button */}
      <div className="flex flex-col items-center space-y-2">
        <Button
          variant="emergency"
          size="lg"
          className="h-32 w-32 rounded-full text-2xl font-bold shadow-2xl flex flex-col items-center justify-center"
          onClick={handleEmergencyClick}
          disabled={isEmergencyActive || isCountdownActive}
        >
          <Phone className="h-8 w-8 mb-1" />
          {isEmergencyActive ? "ACTIVE" : isCountdownActive ? `${countdown}` : "EMERGENCY"}
        </Button>
        {isCountdownActive && (
          <div className="mt-2 flex flex-col items-center">
            <span className="text-base font-semibold text-yellow-700">Sending alert in {countdown}s</span>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={handleCancel}
            >
              Cancel Request
            </Button>
          </div>
        )}
        {isEmergencyActive && (
          <div className="mt-2 text-center">
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
          disabled={isEmergencyActive || accidentCountdown > 0}
          className="w-full"
        >
          Simulate Accident Detection
        </Button>
        {accidentCountdown > 0 && (
          <div className="bg-emergency-muted p-4 rounded-lg text-center">
            <div className="text-emergency font-bold text-lg">
              Emergency Alert in {accidentCountdown}s
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={cancelAccident}
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