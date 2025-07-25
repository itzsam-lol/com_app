import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Download,
  Eye,
  Calendar
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface EmergencyRecord {
  id: string;
  type: string;
  timestamp: Date;
  location: string;
  status: 'completed' | 'cancelled' | 'false-alarm';
  responseTime: number; // in minutes
  hospitalName: string;
  ambulanceId?: string;
  notes: string;
  followUpRequired: boolean;
}

export function EmergencyHistory() {
  const { user } = useAuth();
  const [emergencyHistory, setEmergencyHistory] = useState<EmergencyRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      setLoading(true);
      const idToken = await user.getIdToken();
      const res = await fetch("http://localhost:4000/sos/me", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setEmergencyHistory(
          data.map((e: any) => ({
            id: e.id,
            type: e.type,
            timestamp: new Date(e.timestamp),
            location: e.location,
            status: e.status || 'completed',
            responseTime: e.responseTime || 0,
            hospitalName: e.hospitalName || '',
            ambulanceId: e.ambulanceId || '',
            notes: e.notes || '',
            followUpRequired: false,
          }))
        );
      }
      setLoading(false);
    };
    fetchHistory();
    // eslint-disable-next-line
  }, [user]);

  const getStatusColor = (status: EmergencyRecord['status']) => {
    switch (status) {
      case 'completed': return 'outline';
      case 'cancelled': return 'secondary';
      case 'false-alarm': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: EmergencyRecord['status']) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'cancelled': return AlertTriangle;
      case 'false-alarm': return AlertTriangle;
      default: return Clock;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generateReport = (record: EmergencyRecord) => {
    // Simulate report generation
    alert(`Generating detailed report for emergency ${record.id}...`);
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {emergencyHistory.filter(e => e.status === 'completed').length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-medical" />
              <div>
                <div className="text-2xl font-bold text-medical">
                  {Math.round(
                    emergencyHistory
                      .filter(e => e.status === 'completed')
                      .reduce((sum, e) => sum + e.responseTime, 0) / 
                    emergencyHistory.filter(e => e.status === 'completed').length
                  )}m
                </div>
                <div className="text-sm text-muted-foreground">Avg Response</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-emergency" />
              <div>
                <div className="text-2xl font-bold text-emergency">
                  {emergencyHistory.filter(e => e.followUpRequired).length}
                </div>
                <div className="text-sm text-muted-foreground">Follow-ups Needed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-medical" />
            <span>Emergency History</span>
          </CardTitle>
          <CardDescription>
            Complete record of your emergency alerts and responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : (
            <div className="space-y-4">
              {emergencyHistory.map((record) => {
                const StatusIcon = getStatusIcon(record.status);
                
                return (
                  <div key={record.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Badge variant={getStatusColor(record.status)} className="flex items-center space-x-1">
                            <StatusIcon className="h-3 w-3" />
                            <span>{record.status.replace('-', ' ').toUpperCase()}</span>
                          </Badge>
                          <span className="font-semibold">{record.id}</span>
                          <span className="text-muted-foreground">•</span>
                          <span>{record.type}</span>
                          {record.followUpRequired && (
                            <Badge variant="outline" className="text-community">
                              Follow-up Required
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(record.timestamp)}</span>
                        </div>
                      </div>
                      {record.status === 'completed' && (
                        <Badge variant="outline" className="text-medical">
                          {record.responseTime}m response
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{record.location}</span>
                        </div>
                        {record.hospitalName && (
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{record.hospitalName}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        {record.ambulanceId && (
                          <div className="text-sm">
                            <strong>Ambulance:</strong> {record.ambulanceId}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-muted p-3 rounded-lg">
                      <div className="text-sm font-semibold mb-1">Notes:</div>
                      <div className="text-sm text-muted-foreground">{record.notes}</div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" onClick={() => generateReport(record)}>
                        <Download className="h-4 w-4 mr-1" />
                        Download Report
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      {record.followUpRequired && (
                        <Button variant="medical" size="sm">
                          <Phone className="h-4 w-4 mr-1" />
                          Schedule Follow-up
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export History</CardTitle>
          <CardDescription>
            Download your emergency history for insurance or medical records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export as PDF
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export as CSV
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Medical Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}