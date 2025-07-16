import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Free',
    features: [
      'Basic SOS',
      'Basic Profile',
      'Limited History',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹299/mo',
    features: [
      'All Starter features',
      'Full Medical Profile',
      'AI Assistance',
      'Advanced SOS',
      'Loyalty Program',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Contact Us',
    features: [
      'Hospital Dashboard',
      'Manage Patients',
      'Analytics',
      'All Premium features',
    ],
  },
];

export default function SubscriptionPlans() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
      {plans.map((plan) => (
        <Card key={plan.id} className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl">{plan.name}</CardTitle>
            <div className="text-center text-3xl font-bold my-2">{plan.price}</div>
          </CardHeader>
          <CardContent>
            <ul className="mb-6 space-y-2 text-center">
              {plan.features.map((f, i) => (
                <li key={i} className="text-muted-foreground">{f}</li>
              ))}
            </ul>
            <Button className="w-full" onClick={() => navigate(`/subscribe?plan=${plan.id}`)}>
              {plan.id === 'starter' ? 'Get Started' : plan.id === 'premium' ? 'Upgrade to Premium' : 'Contact Sales'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 