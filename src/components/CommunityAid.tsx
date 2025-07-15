import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart, 
  MapPin, 
  Clock, 
  User, 
  Phone,
  Plus,
  CheckCircle,
  Navigation,
  Droplets,
  Users,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BloodRequest {
  id: string;
  hospitalName: string;
  bloodGroup: string;
  unitsNeeded: number;
  urgency: 'critical' | 'urgent' | 'routine';
  location: string;
  contactPhone: string;
  description: string;
  timestamp: Date;
  volunteers: number;
}

interface Volunteer {
  id: string;
  name: string;
  bloodGroup: string;
  phone: string;
  location: string;
  lastDonation: Date;
  verifiedDonor: boolean;
}

export function CommunityAid() {
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([
    {
      id: "BR001",
      hospitalName: "City General Hospital",
      bloodGroup: "O-",
      unitsNeeded: 3,
      urgency: "critical",
      location: "Downtown Medical District",
      contactPhone: "+1-555-0789",
      description: "Emergency surgery patient needs immediate O- blood transfusion",
      timestamp: new Date(Date.now() - 10 * 60000),
      volunteers: 5
    },
    {
      id: "BR002",
      hospitalName: "Memorial Healthcare",
      bloodGroup: "A+",
      unitsNeeded: 2,
      urgency: "urgent",
      location: "Central Hospital District",
      contactPhone: "+1-555-0456",
      description: "Accident victim requires A+ blood for stabilization",
      timestamp: new Date(Date.now() - 25 * 60000),
      volunteers: 8
    }
  ]);

  const [newRequest, setNewRequest] = useState({
    hospitalName: "",
    bloodGroup: "O+",
    unitsNeeded: 1,
    urgency: "urgent" as const,
    location: "",
    contactPhone: "",
    description: ""
  });

  const [userProfile] = useState<Volunteer>({
    id: "V001",
    name: "Alex Johnson",
    bloodGroup: "O+",
    phone: "+1-555-0123",
    location: "Downtown Area",
    lastDonation: new Date(Date.now() - 90 * 24 * 60 * 60000), // 90 days ago
    verifiedDonor: true
  });

  const [showCreateRequest, setShowCreateRequest] = useState(false);
  const { toast } = useToast();

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = ["critical", "urgent", "routine"] as const;

  const handleVolunteer = (requestId: string) => {
    setBloodRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, volunteers: req.volunteers + 1 }
        : req
    ));

    toast({
      title: "🩸 Volunteer Response Sent",
      description: "Hospital has been notified of your availability. They will contact you shortly.",
      variant: "default",
    });
  };

  const handleCreateRequest = () => {
    const request: BloodRequest = {
      id: `BR${String(bloodRequests.length + 1).padStart(3, '0')}`,
      ...newRequest,
      timestamp: new Date(),
      volunteers: 0
    };

    setBloodRequests(prev => [request, ...prev]);
    setShowCreateRequest(false);
    setNewRequest({
      hospitalName: "",
      bloodGroup: "O+",
      unitsNeeded: 1,
      urgency: "urgent",
      location: "",
      contactPhone: "",
      description: ""
    });

    toast({
      title: "📢 Blood Request Created",
      description: "Request broadcast to nearby volunteers with matching blood group.",
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'destructive';
      case 'urgent': return 'default';
      case 'routine': return 'secondary';
      default: return 'outline';
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const canDonate = () => {
    const daysSinceLastDonation = Math.floor((Date.now() - userProfile.lastDonation.getTime()) / (24 * 60 * 60 * 1000));
    return daysSinceLastDonation >= 56; // 8 weeks minimum between donations
  };

  return (
    <div className="space-y-6">
      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-5 w-5 text-emergency" />
              <div>
                <div className="text-2xl font-bold text-emergency">
                  {bloodRequests.filter(r => r.urgency === 'critical').length}
                </div>
                <div className="text-sm text-muted-foreground">Critical Requests</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-community" />
              <div>
                <div className="text-2xl font-bold text-community">
                  {bloodRequests.reduce((sum, req) => sum + req.volunteers, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Active Volunteers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-medical" />
              <div>
                <div className="text-2xl font-bold text-medical">
                  {userProfile.verifiedDonor ? "Verified" : "Pending"}
                </div>
                <div className="text-sm text-muted-foreground">Donor Status</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Profile Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-medical" />
            <span>Your Donor Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-lg font-bold">
                  {userProfile.bloodGroup}
                </Badge>
                {userProfile.verifiedDonor && (
                  <Badge variant="outline" className="text-community">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 inline mr-1" />
                {userProfile.location}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm">
                <strong>Last Donation:</strong> {userProfile.lastDonation.toLocaleDateString()}
              </div>
              <div className="text-sm">
                <strong>Can Donate:</strong> 
                <span className={canDonate() ? "text-community ml-1" : "text-muted-foreground ml-1"}>
                  {canDonate() ? "Yes" : `Wait ${56 - Math.floor((Date.now() - userProfile.lastDonation.getTime()) / (24 * 60 * 60 * 1000))} days`}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Request Button */}
      <div className="flex justify-end">
        <Button
          variant="community"
          onClick={() => setShowCreateRequest(true)}
          className="mb-4"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Blood Request
        </Button>
      </div>

      {/* Create Request Form */}
      {showCreateRequest && (
        <Card>
          <CardHeader>
            <CardTitle>Create Blood Donation Request</CardTitle>
            <CardDescription>
              Broadcast an urgent blood donation request to nearby volunteers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hospital">Hospital Name</Label>
                <Input
                  id="hospital"
                  value={newRequest.hospitalName}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, hospitalName: e.target.value }))}
                  placeholder="City General Hospital"
                />
              </div>
              <div>
                <Label htmlFor="phone">Contact Phone</Label>
                <Input
                  id="phone"
                  value={newRequest.contactPhone}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, contactPhone: e.target.value }))}
                  placeholder="+1-555-0123"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <select
                  id="bloodGroup"
                  value={newRequest.bloodGroup}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, bloodGroup: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="units">Units Needed</Label>
                <Input
                  id="units"
                  type="number"
                  min="1"
                  max="10"
                  value={newRequest.unitsNeeded}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, unitsNeeded: parseInt(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="urgency">Urgency Level</Label>
                <select
                  id="urgency"
                  value={newRequest.urgency}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, urgency: e.target.value as any }))}
                  className="w-full p-2 border rounded-md"
                >
                  {urgencyLevels.map(level => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="location">Hospital Location</Label>
              <Input
                id="location"
                value={newRequest.location}
                onChange={(e) => setNewRequest(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Downtown Medical District"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newRequest.description}
                onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the medical emergency requiring blood donation"
                rows={3}
              />
            </div>

            <div className="flex space-x-2">
              <Button variant="community" onClick={handleCreateRequest}>
                Create Request
              </Button>
              <Button variant="outline" onClick={() => setShowCreateRequest(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Blood Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Droplets className="h-5 w-5 text-emergency" />
            <span>Blood Donation Requests</span>
          </CardTitle>
          <CardDescription>
            Urgent blood donation needs from nearby hospitals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bloodRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant={getUrgencyColor(request.urgency)}>
                        {request.urgency.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-lg font-bold text-emergency">
                        {request.bloodGroup}
                      </Badge>
                      <span className="font-semibold">{request.unitsNeeded} units needed</span>
                    </div>
                    <div className="font-bold text-lg">{request.hospitalName}</div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 inline mr-1" />
                    {getTimeAgo(request.timestamp)}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  {request.description}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{request.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{request.contactPhone}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-community" />
                      <span className="text-sm">{request.volunteers} volunteers responded</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="community"
                    size="sm"
                    onClick={() => handleVolunteer(request.id)}
                    disabled={!canDonate() || userProfile.bloodGroup !== request.bloodGroup}
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    {userProfile.bloodGroup === request.bloodGroup ? "Volunteer to Donate" : "Blood Group Mismatch"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Navigation className="h-4 w-4 mr-1" />
                    Get Directions
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    Contact Hospital
                  </Button>
                </div>

                {!canDonate() && userProfile.bloodGroup === request.bloodGroup && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-sm">
                    <AlertCircle className="h-4 w-4 inline mr-1 text-yellow-600" />
                    <span className="text-yellow-800">
                      You need to wait longer between donations. Next eligible donation: {new Date(userProfile.lastDonation.getTime() + 56 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}