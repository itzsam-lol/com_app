import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthCard from '../components/auth/AuthCard';

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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Subscribe() {
  const query = useQuery();
  const initialPlan = query.get('plan') || 'starter';
  const [selected, setSelected] = useState(initialPlan);
  const [step, setStep] = useState(0); // 0: select, 1: sign in, 2: payment, 3: confirmation
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [months, setMonths] = useState(1);
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch current user plan if logged in
    const fetchPlan = async () => {
      if (!user) return;
      const idToken = await user.getIdToken();
      const planRes = await fetch('http://localhost:4000/payment/me/plan', {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (planRes.ok) {
        const planData = await planRes.json();
        setUserPlan(planData.plan);
        // If already premium/enterprise, redirect
        if (['PREMIUM', 'ENTERPRISE'].includes(planData.plan)) {
          alert(`You already have an active ${planData.plan.charAt(0) + planData.plan.slice(1).toLowerCase()} plan.`);
          navigate('/index');
        }
      }
    };
    fetchPlan();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (user && step === 1) setStep(2);
  }, [user, step]);

  // Stripe integration
  const handleStripePayment = async () => {
    setLoading(true);
    const idToken = await user.getIdToken();
    const res = await fetch('http://localhost:4000/payment/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        plan: selected,
        months,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Failed to start payment. Please try again.');
    }
  };

  // Fetch payment history after success
  useEffect(() => {
    const fetchHistory = async () => {
      if (!user || !paymentSuccess) return;
      const idToken = await user.getIdToken();
      const res = await fetch('http://localhost:4000/payment/me/history', {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (res.ok) {
        setPaymentHistory(await res.json());
      }
    };
    fetchHistory();
    // eslint-disable-next-line
  }, [user, paymentSuccess]);

  // Handle Stripe success/cancel
  useEffect(() => {
    if (window.location.search.includes('success=1')) {
      setMessage('Payment successful! Your subscription is now active.');
      setPaymentSuccess(true);
      setStep(3);
    } else if (window.location.search.includes('canceled=1')) {
      setMessage('Payment canceled. You have not been charged.');
    }
  }, []);

  const handleStarter = async () => {
    setLoading(true);
    const idToken = await user.getIdToken();
    const planRes = await fetch('http://localhost:4000/user/me/plan', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ plan: 'STARTER' }),
    });
    if (!planRes.ok) {
      const err = await planRes.json();
      alert(err.error || 'Failed to activate plan.');
      setLoading(false);
      return;
    }
    await fetch('http://localhost:4000/payment/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        plan: 'STARTER',
        amount: 0,
        currency: 'INR',
        periodStart: new Date().toISOString(),
        periodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'success',
      }),
    });
    setLoading(false);
    setPaymentSuccess(true);
    setStep(3);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h1>
        {message && (
          <div className="mb-4 text-center text-green-600 font-semibold">{message}</div>
        )}
        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
              <Card key={plan.id} className={`shadow-lg ${selected === plan.id ? 'ring-2 ring-primary' : ''}`}>
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
                  <Button className="w-full" variant={selected === plan.id ? 'default' : 'outline'} onClick={() => setSelected(plan.id)} disabled={userPlan && userPlan !== 'STARTER' && plan.id === 'starter'}>
                    {selected === plan.id ? 'Selected' : userPlan && userPlan !== 'STARTER' && plan.id === 'starter' ? 'Not Available' : 'Choose'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {step === 0 && (
          <Button className="w-full mt-4" onClick={() => setStep(1)}>
            Continue to Sign In
          </Button>
        )}
        {step === 1 && !user && (
          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-md">
              <AuthCard />
            </div>
          </div>
        )}
        {step === 2 && user && (
          <div className="mt-8 flex flex-col items-center">
            <Card className="w-full max-w-lg shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Confirm Your Subscription</CardTitle>
                <CardDescription>Review your plan and select duration before payment.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Plan:</span>
                    <span className="capitalize">{selected}</span>
                  </div>
                  {selected !== 'starter' && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Months:</span>
                      <select value={months} onChange={e => setMonths(Number(e.target.value))} className="border rounded px-2 py-1">
                        {[...Array(12)].map((_, i) => (
                          <option key={i+1} value={i+1}>{i+1}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total Amount:</span>
                    <span className="text-lg font-bold">{selected === 'starter' ? 'Free' : `₹${299 * months}`}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            {selected === 'starter' ? (
              <Button className="w-full max-w-xs" onClick={handleStarter} disabled={loading || (userPlan && userPlan !== 'STARTER')}>
                {loading ? 'Activating...' : 'Activate Starter Plan'}
              </Button>
            ) : (
              <Button className="w-full max-w-xs" onClick={handleStripePayment} disabled={loading}>
                {loading ? 'Processing...' : 'Pay & Activate'}
              </Button>
            )}
          </div>
        )}
        {step === 3 && paymentSuccess && (
          <div className="mt-8 flex flex-col items-center gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-success">Subscription Activated!</h2>
              <p className="mb-4 text-lg">Thank you for subscribing to the {selected.charAt(0).toUpperCase() + selected.slice(1)} plan.</p>
              <Button className="w-full max-w-xs" onClick={() => navigate('/index')}>
                Go to Dashboard
              </Button>
            </div>
            <Card className="w-full max-w-lg shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Payment History</CardTitle>
                <CardDescription>Your recent subscription payments</CardDescription>
              </CardHeader>
              <CardContent>
                {paymentHistory.length === 0 ? (
                  <div className="text-muted-foreground text-center py-4">No payments found.</div>
                ) : (
                  <div className="space-y-2">
                    {paymentHistory.map((p, i) => (
                      <div key={p.id || i} className="flex items-center justify-between border-b py-2">
                        <div>
                          <div className="font-medium capitalize">{p.plan.toLowerCase()}</div>
                          <div className="text-xs text-muted-foreground">{new Date(p.createdAt).toLocaleString()}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{p.amount === 0 ? 'Free' : `₹${p.amount}`}</div>
                          <div className="text-xs text-muted-foreground">{p.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
} 