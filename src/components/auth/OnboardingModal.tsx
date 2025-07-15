import React, { useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
// If you have a radio group UI, import it here, else use buttons

const steps = [
  'Welcome',
  'Personal Info',
  'Medical Info',
  'Emergency Contact',
  'Plan Selection',
  'Confirmation',
];

export default function OnboardingModal({ open, onComplete }: { open: boolean; onComplete: (data: any) => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    address: '',
    phone: '',
    allergies: '',
    conditions: '',
    medications: '',
    history: '',
    emergencyContact: '',
    plan: 'starter',
  });

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handlePlanChange = (val: string) => setForm({ ...form, plan: val });
  const handleFinish = () => onComplete(form);

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-lg w-full">
        <Card>
          <CardHeader>
            <CardTitle>{steps[step]}</CardTitle>
          </CardHeader>
          <CardContent>
            {step === 0 && (
              <div className="space-y-4 text-center">
                <h2 className="text-2xl font-bold">Welcome to EmergencyAid!</h2>
                <p className="text-muted-foreground">Let's set up your profile for the best experience.</p>
                <Button className="mt-4 w-full" onClick={next}>Get Started</Button>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-4">
                <Input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="w-full" />
                <Input name="age" value={form.age} onChange={handleChange} placeholder="Age" className="w-full" />
                <Input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" className="w-full" />
                <Input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="w-full" />
                <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="w-full" />
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <Input name="allergies" value={form.allergies} onChange={handleChange} placeholder="Allergies (comma separated)" className="w-full" />
                <Input name="conditions" value={form.conditions} onChange={handleChange} placeholder="Medical Conditions" className="w-full" />
                <Input name="medications" value={form.medications} onChange={handleChange} placeholder="Current Medications" className="w-full" />
                <textarea name="history" value={form.history} onChange={handleChange} placeholder="Medical History" className="w-full border rounded p-2" />
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <Input name="emergencyContact" value={form.emergencyContact} onChange={handleChange} placeholder="Emergency Contact Number" className="w-full" />
              </div>
            )}
            {step === 4 && (
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Button variant={form.plan === 'starter' ? 'default' : 'outline'} onClick={() => handlePlanChange('starter')}>Starter (Free, limited features)</Button>
                  <Button variant={form.plan === 'premium' ? 'default' : 'outline'} onClick={() => handlePlanChange('premium')}>Premium (All features, paid)</Button>
                  <Button variant={form.plan === 'enterprise' ? 'default' : 'outline'} onClick={() => handlePlanChange('enterprise')}>Enterprise (Hospital dashboard)</Button>
                </div>
              </div>
            )}
            {step === 5 && (
              <div className="space-y-4 text-center">
                <h3 className="text-lg font-semibold">Review & Confirm</h3>
                <pre className="bg-gray-50 rounded p-2 text-left text-xs overflow-x-auto max-h-40">{JSON.stringify(form, null, 2)}</pre>
                <Button className="w-full" onClick={handleFinish}>Finish</Button>
              </div>
            )}
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={back} disabled={step === 0}>Back</Button>
              {step > 0 && step < steps.length - 1 && (
                <Button onClick={next}>Next</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
} 