import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  AlertTriangle, 
  Pill, 
  User, 
  Phone, 
  Edit, 
  Save,
  Plus,
  X 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface MedicalData {
  bloodGroup: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  emergencyContacts: { name: string; phone: string; relation: string }[];
  notes: string;
}

export function MedicalProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newAllergy, setNewAllergy] = useState("");
  const [newMedication, setNewMedication] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  const [medicalData, setMedicalData] = useState<MedicalData>({
    bloodGroup: "O+",
    allergies: [],
    medications: [],
    conditions: [],
    emergencyContacts: [],
    notes: ""
  });

  useEffect(() => {
    const fetchMedical = async () => {
      if (!user) return;
      setLoading(true);
      const idToken = await user.getIdToken();
      const res = await fetch("http://localhost:4000/medical/me", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMedicalData({
          bloodGroup: data.bloodGroup || "O+",
          allergies: data.allergies || [],
          medications: data.medications || [],
          conditions: data.conditions || [],
          emergencyContacts: data.emergencyContacts || [],
          notes: data.history || ""
        });
      }
      setLoading(false);
    };
    fetchMedical();
    // eslint-disable-next-line
  }, [user]);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    const idToken = await user.getIdToken();
    await fetch("http://localhost:4000/medical/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        bloodGroup: medicalData.bloodGroup,
        allergies: medicalData.allergies,
        medications: medicalData.medications,
        conditions: medicalData.conditions,
        emergencyContacts: medicalData.emergencyContacts,
        history: medicalData.notes,
      }),
    });
    setIsEditing(false);
    setLoading(false);
    toast({
      title: "✅ Profile Updated",
      description: "Medical profile saved successfully.",
    });
  };

  const addItem = (type: 'allergies' | 'medications' | 'conditions', value: string) => {
    if (!value.trim()) return;
    
    setMedicalData(prev => ({
      ...prev,
      [type]: [...prev[type], value.trim()]
    }));
    
    if (type === 'allergies') setNewAllergy("");
    if (type === 'medications') setNewMedication("");
    if (type === 'conditions') setNewCondition("");
  };

  const removeItem = (type: 'allergies' | 'medications' | 'conditions', index: number) => {
    setMedicalData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-medical" />
              <span>Medical Profile</span>
            </CardTitle>
            <CardDescription>
              Critical information for emergency responders
            </CardDescription>
          </div>
          <Button
            variant={isEditing ? "medical" : "outline"}
            size="sm"
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            {isEditing ? "Save" : "Edit"}
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : (
            <>
              {/* Blood Group */}
              <div>
                <Label className="text-base font-semibold">Blood Group</Label>
                {isEditing ? (
                  <select
                    value={medicalData.bloodGroup}
                    onChange={(e) => setMedicalData(prev => ({ ...prev, bloodGroup: e.target.value }))}
                    className="w-full mt-1 p-2 border rounded-md"
                  >
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                ) : (
                  <div className="mt-1">
                    <Badge variant="outline" className="text-lg font-bold text-emergency">
                      {medicalData.bloodGroup}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Allergies */}
              <div>
                <Label className="text-base font-semibold flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-emergency" />
                  <span>Allergies</span>
                </Label>
                <div className="mt-2 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {medicalData.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive" className="flex items-center space-x-1">
                        <span>{allergy}</span>
                        {isEditing && (
                          <button onClick={() => removeItem('allergies', index)}>
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add new allergy"
                        value={newAllergy}
                        onChange={(e) => setNewAllergy(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addItem('allergies', newAllergy)}
                      />
                      <Button size="sm" onClick={() => addItem('allergies', newAllergy)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Current Medications */}
              <div>
                <Label className="text-base font-semibold flex items-center space-x-2">
                  <Pill className="h-4 w-4 text-medical" />
                  <span>Current Medications</span>
                </Label>
                <div className="mt-2 space-y-2">
                  <div className="space-y-1">
                    {medicalData.medications.map((medication, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-medical-muted rounded">
                        <span>{medication}</span>
                        {isEditing && (
                          <button onClick={() => removeItem('medications', index)}>
                            <X className="h-4 w-4 text-gray-500" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add medication"
                        value={newMedication}
                        onChange={(e) => setNewMedication(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addItem('medications', newMedication)}
                      />
                      <Button size="sm" onClick={() => addItem('medications', newMedication)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Emergency Contacts */}
              <div>
                <Label className="text-base font-semibold flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-community" />
                  <span>Emergency Contacts</span>
                </Label>
                <div className="mt-2 space-y-2">
                  {medicalData.emergencyContacts.map((contact, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{contact.name}</div>
                          <div className="text-sm text-muted-foreground">{contact.relation}</div>
                          <div className="text-sm font-mono">{contact.phone}</div>
                        </div>
                        <Badge variant="outline">{contact.relation}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medical Notes */}
              <div>
                <Label className="text-base font-semibold">Medical Notes</Label>
                {isEditing ? (
                  <Textarea
                    value={medicalData.notes}
                    onChange={(e) => setMedicalData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional medical information for emergency responders"
                    className="mt-2"
                    rows={3}
                  />
                ) : (
                  <div className="mt-2 p-3 bg-muted rounded-lg">
                    {medicalData.notes || "No additional notes"}
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}