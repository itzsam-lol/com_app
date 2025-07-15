import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Ambulance, 
  MapPin, 
  Clock, 
  Phone, 
  Heart,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Users,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmergencyAlert {
  id: string;
  patientName: string;
  type: string;
  location: string;
  timestamp: Date;
  status: 'pending' | 'dispatched' | 'arrived' | 'completed';
  bloodGroup: string;
  allergies: string[];
  eta: number;
  assignedAmbulance?: string;
}

export function HospitalDashboard() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([
    {
      id: "EM001",
      patientName: "John Doe",
      type: "Manual Emergency",
      location: "123 Main St, Downtown",
      timestamp: new Date(Date.now() - 5 * 60000),
      status: "pending",
      bloodGroup: "O+",
      allergies: ["Penicillin"],
      eta: 12
    },
    {
      id: "EM002", 
      patientName: "Jane Smith",
      type: "Accident Detection",
      location: "456 Oak Ave, Central Park",
      timestamp: new Date(Date.now() - 15 * 60000),
      status: "dispatched",
      bloodGroup: "A-",
      allergies: ["Shellfish", "Latex"],
      eta: 8,
      assignedAmbulance: "AMB-205"
    }
  ]);

  const [ambulances] = useState([
    { id: "AMB-201", status: "available", location: "Station 1" },
    { id: "AMB-202", status: "available", location: "Station 2" },
    { id: "AMB-203", status: "en-route", location: "Downtown" },
    { id: "AMB-204", status: "available", location: "Station 3" },
    { id: "AMB-205", status: "dispatched", location: "Central Park" },
  ]);

  const { toast } = useToast();

  const handleAlertAction = (alertId: string, action: 'accept' | 'dispatch' | 'complete') => {
    setAlerts(prev => prev.map(alert => {
      if (alert.id === alertId) {
        let newStatus: EmergencyAlert['status'] = alert.status;
        let assignedAmbulance = alert.assignedAmbulance;
        
        switch (action) {
          case 'accept':
            newStatus = 'dispatched';
            assignedAmbulance = ambulances.find(amb => amb.status === 'available')?.id;
            break;
          case 'dispatch':
            newStatus = 'dispatched';
            break;
          case 'complete':
            newStatus = 'completed';
            break;
        }
        
        return { ...alert, status: newStatus, assignedAmbulance };
      }
      return alert;
    }));

    toast({
      title: `Alert ${action.charAt(0).toUpperCase() + action.slice(1)}ed`,
      description: `Emergency ${alertId} has been ${action}ed successfully.`,
    });
  };

  const getStatusColor = (status: EmergencyAlert['status']) => {
    switch (status) {
      case 'pending': return 'destructive';
      case 'dispatched': return 'default';
      case 'arrived': return 'secondary';
      case 'completed': return 'outline';
      default: return 'outline';
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / 60000);
    return `${minutes}m ago`;
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-emergency" />
              <div>
                <div className="text-2xl font-bold text-emergency">
                  {alerts.filter(a => a.status === 'pending').length}
                </div>
                <div className="text-sm text-muted-foreground">Pending Alerts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Ambulance className="h-5 w-5 text-medical" />
              <div>
                <div className="text-2xl font-bold text-medical">
                  {ambulances.filter(a => a.status === 'available').length}
                </div>
                <div className="text-sm text-muted-foreground">Available Units</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-community" />
              <div>
                <div className="text-2xl font-bold text-community">
                  {alerts.filter(a => a.status === 'dispatched').length}
                </div>
                <div className="text-sm text-muted-foreground">Active Responses</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {alerts.filter(a => a.status === 'completed').length}
                </div>
                <div className="text-sm text-muted-foreground">Completed Today</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-emergency" />
            <span>Emergency Alerts</span>
          </CardTitle>
          <CardDescription>
            Incoming emergency requests requiring immediate attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.filter(alert => alert.status !== 'completed').map((alert) => (
              <div key={alert.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(alert.status)}>
                        {alert.status.toUpperCase()}
                      </Badge>
                      <span className="font-semibold">{alert.id}</span>
                      <span className="text-muted-foreground">•</span>
                      <span>{alert.type}</span>
                    </div>
                    <div className="font-bold text-lg">{alert.patientName}</div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 inline mr-1" />
                    {getTimeAgo(alert.timestamp)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{alert.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-emergency" />
                      <span className="text-sm">Blood Group: <strong>{alert.bloodGroup}</strong></span>
                    </div>
                    {alert.allergies.length > 0 && (
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <div className="text-sm">
                          <span className="font-semibold">Allergies:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {alert.allergies.map((allergy, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {allergy}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    {alert.assignedAmbulance && (
                      <div className="flex items-center space-x-2">
                        <Ambulance className="h-4 w-4 text-medical" />
                        <span className="text-sm">Assigned: <strong>{alert.assignedAmbulance}</strong></span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Navigation className="h-4 w-4 text-community" />
                      <span className="text-sm">ETA: <strong>{alert.eta} minutes</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  {alert.status === 'pending' && (
                    <Button
                      variant="medical"
                      size="sm"
                      onClick={() => handleAlertAction(alert.id, 'accept')}
                    >
                      <Ambulance className="h-4 w-4 mr-1" />
                      Dispatch Ambulance
                    </Button>
                  )}
                  {alert.status === 'dispatched' && (
                    <Button
                      variant="community"
                      size="sm"
                      onClick={() => handleAlertAction(alert.id, 'complete')}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark Completed
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    Contact Patient
                  </Button>
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    View Map
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ambulance Fleet Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Ambulance className="h-5 w-5 text-medical" />
            <span>Ambulance Fleet</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ambulances.map((ambulance) => (
              <div key={ambulance.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{ambulance.id}</div>
                    <div className="text-sm text-muted-foreground">{ambulance.location}</div>
                  </div>
                  <Badge 
                    variant={ambulance.status === 'available' ? 'outline' : 
                            ambulance.status === 'dispatched' ? 'default' : 'secondary'}
                  >
                    {ambulance.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}