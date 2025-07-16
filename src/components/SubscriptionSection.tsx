import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export default function SubscriptionSection() {
  const navigate = useNavigate();
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-4">Flexible Plans for Everyone</h2>
      <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
        Choose the plan that fits your needs. Upgrade anytime for more features, or get started for free. Hospitals can access our enterprise dashboard for advanced management.
      </p>
      <Button size="lg" className="px-8 py-4 text-lg font-semibold" onClick={() => navigate('/subscribe')}>
        View Plans
      </Button>
    </section>
  );
} 