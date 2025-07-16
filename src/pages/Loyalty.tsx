import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Gift, Star, Zap, Plus, Loader2, Trophy, CheckCircle, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface LoyaltyEvent {
  id: string;
  eventType: string;
  points: number;
  description?: string;
  createdAt: string;
}

export default function Loyalty() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [points, setPoints] = useState(0);
  const [events, setEvents] = useState<LoyaltyEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [addPoints, setAddPoints] = useState(10);
  const [addDesc, setAddDesc] = useState("");

  useEffect(() => {
    const fetchLoyalty = async () => {
      if (!user) return;
      setLoading(true);
      const idToken = await user.getIdToken();
      // Get points
      const pointsRes = await fetch("http://localhost:4000/loyalty/me/points", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (pointsRes.ok) {
        const data = await pointsRes.json();
        setPoints(data.points || 0);
      }
      // Get events
      const eventsRes = await fetch("http://localhost:4000/loyalty/me", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (eventsRes.ok) {
        const data = await eventsRes.json();
        setEvents(data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
      setLoading(false);
    };
    fetchLoyalty();
    // eslint-disable-next-line
  }, [user, adding]);

  const handleAddPoints = async () => {
    if (!user) return;
    setAdding(true);
    const idToken = await user.getIdToken();
    const res = await fetch("http://localhost:4000/loyalty/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ eventType: "Demo", points: addPoints, description: addDesc }),
    });
    if (res.ok) {
      toast({ title: `🎉 Added ${addPoints} points!`, description: addDesc || undefined });
      setAddPoints(10);
      setAddDesc("");
    } else {
      toast({ title: "Error", description: "Failed to add points.", variant: "destructive" });
    }
    setAdding(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Star className="h-6 w-6 text-yellow-500" />
              Loyalty Points
            </CardTitle>
            <CardDescription>Earn points for using emergency services, referrals, and more!</CardDescription>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2 flex items-center gap-1">
            <Trophy className="h-5 w-5 text-yellow-500 mr-1" />
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : points}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-end">
            <Input
              type="number"
              min={1}
              value={addPoints}
              onChange={e => setAddPoints(Number(e.target.value))}
              className="max-w-[120px]"
              disabled={adding}
              placeholder="Points"
            />
            <Input
              value={addDesc}
              onChange={e => setAddDesc(e.target.value)}
              className="flex-1"
              disabled={adding}
              placeholder="Description (optional)"
            />
            <Button onClick={handleAddPoints} disabled={adding || addPoints < 1} className="flex gap-1">
              <Plus className="h-4 w-4" /> Add Points
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Gift className="h-5 w-5 text-pink-500" />
            Loyalty Event History
          </CardTitle>
          <CardDescription>See how you earned your points</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="p-8 text-center"><Loader2 className="animate-spin h-8 w-8 mx-auto text-medical" /></div>
          ) : events.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No loyalty events yet.</div>
          ) : (
            <div className="space-y-4">
              {events.map(event => (
                <Card key={event.id} className="border flex flex-col md:flex-row items-center md:items-start gap-4 p-4">
                  <Badge variant="outline" className="flex items-center gap-1 text-base px-3 py-1">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    {event.points > 0 ? `+${event.points}` : event.points}
                  </Badge>
                  <div className="flex-1">
                    <div className="font-semibold">{event.eventType}</div>
                    <div className="text-sm text-muted-foreground">{event.description || "No description"}</div>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(event.createdAt).toLocaleString()}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 