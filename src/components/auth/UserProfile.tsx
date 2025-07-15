import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { ArrowLeft, UploadCloud, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [medicalFile, setMedicalFile] = useState<File | null>(null);
  const [aiExtracted, setAiExtracted] = useState<any>(null); // Placeholder for extracted data
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) return <div className="p-8 text-center">No user signed in.</div>;

  const handleEdit = () => setEditMode(true);
  const handleSave = () => {
    // TODO: Save all details to Firebase
    setEditMode(false);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedicalFile(e.target.files[0]);
      // TODO: Send file to AI backend and setAiExtracted with result
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold ml-2">Profile</h2>
      </div>
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-center">
          {user.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full mb-2 object-cover" />
          ) : (
            <UserCircle2 className="w-24 h-24 text-muted-foreground mb-2" />
          )}
          <CardTitle>{displayName || "No Name"}</CardTitle>
          <CardDescription>{email}</CardDescription>
        </CardHeader>
        <CardContent>
          {editMode ? (
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <Input value={displayName} onChange={e => setDisplayName(e.target.value)} />
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone Number</label>
                <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. +91-9876543210" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Age</label>
                <Input value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 28" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Gender</label>
                <Input value={gender} onChange={e => setGender(e.target.value)} placeholder="e.g. Male/Female/Other" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Address</label>
                <Input value={address} onChange={e => setAddress(e.target.value)} placeholder="e.g. 123 Main St, Mumbai" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Emergency Contact</label>
                <Input value={emergencyContact} onChange={e => setEmergencyContact(e.target.value)} placeholder="e.g. +91-9876543211" />
              </div>
              <Button onClick={handleSave} className="w-full mt-2">Save</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Name:</span>
                <span>{displayName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Phone:</span>
                <span>{phone || <span className="text-muted-foreground">Not set</span>}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Age:</span>
                <span>{age || <span className="text-muted-foreground">Not set</span>}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Gender:</span>
                <span>{gender || <span className="text-muted-foreground">Not set</span>}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Address:</span>
                <span>{address || <span className="text-muted-foreground">Not set</span>}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Emergency Contact:</span>
                <span>{emergencyContact || <span className="text-muted-foreground">Not set</span>}</span>
              </div>
              <Button variant="outline" onClick={handleEdit} className="w-full mt-2">Edit Details</Button>
            </div>
          )}
          <div className="mt-6">
            <label className="block mb-2 font-medium">Upload Medical History</label>
            <div className="flex items-center gap-2">
              <Input type="file" accept=".pdf,.txt,.doc,.docx" ref={fileInputRef} onChange={handleFileChange} className="w-full" />
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}><UploadCloud className="h-5 w-5" /></Button>
            </div>
            {medicalFile && <div className="mt-2 text-sm text-muted-foreground">Selected: {medicalFile.name}</div>}
          </div>
          {aiExtracted && (
            <div className="mt-6">
              <h4 className="font-semibold mb-2">AI Extracted Medical Data</h4>
              <div className="bg-gray-50 rounded p-3 text-sm">
                {/* Render extracted info here */}
                <pre>{JSON.stringify(aiExtracted, null, 2)}</pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;