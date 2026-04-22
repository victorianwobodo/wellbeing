import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { useStore, PillarId } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Check, ExternalLink, Zap, Plus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
const PILLARS: { id: PillarId; label: string; color: string; sub: string }[] = [
  { id: 'body', label: 'Body', color: 'bg-assata-teal-bg', sub: 'Movement & Rest' },
  { id: 'mind', label: 'Mind', color: 'bg-assata-purple-bg', sub: 'Curiosity & Play' },
  { id: 'space', label: 'Space', color: 'bg-assata-amber-bg', sub: 'Order & Beauty' },
  { id: 'connection', label: 'Connection', color: 'bg-assata-pink-bg', sub: 'Seen & Heard' },
  { id: 'pace', label: 'Pace', color: 'bg-assata-blue-bg', sub: 'Depth & Ease' },
  { id: 'voice', label: 'Voice', color: 'bg-assata-coral-bg', sub: 'Boundaries & Truth' },
];
export function CheckInPage() {
  const today = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);
  const pillarBody = useStore(s => s.history[today]?.pillars?.body ?? false);
  const pillarMind = useStore(s => s.history[today]?.pillars?.mind ?? false);
  const pillarSpace = useStore(s => s.history[today]?.pillars?.space ?? false);
  const pillarConnection = useStore(s => s.history[today]?.pillars?.connection ?? false);
  const pillarPace = useStore(s => s.history[today]?.pillars?.pace ?? false);
  const pillarVoice = useStore(s => s.history[today]?.pillars?.voice ?? false);
  const ptCompleted = useStore(s => s.history[today]?.ptCompleted ?? false);
  const advocacyLog = useStore(s => s.history[today]?.advocacyLog ?? '');
  // selector returning a primitive (the actual reference from state, not a fallback literal)
  const energyAuditsRaw = useStore(s => s.history[today]?.energyAudits);
  const energyAudits = energyAuditsRaw ?? [];
  const togglePillar = useStore(s => s.togglePillar);
  const setPT = useStore(s => s.setPT);
  const setAdvocacy = useStore(s => s.setAdvocacy);
  const addEnergyAudit = useStore(s => s.addEnergyAudit);
  const [newAudit, setNewAudit] = useState<{
    activity: string;
    type: 'Restored' | 'Depleted';
    action: 'Keep' | 'Modify' | 'Release';
  }>({ activity: '', type: 'Restored', action: 'Keep' });
  const pillarStates: Record<PillarId, boolean> = {
    body: pillarBody,
    mind: pillarMind,
    space: pillarSpace,
    connection: pillarConnection,
    pace: pillarPace,
    voice: pillarVoice,
  };
  const handleSaveAudit = () => {
    if (!newAudit.activity.trim()) return;
    addEnergyAudit(today, newAudit);
    setNewAudit({ activity: '', type: 'Restored', action: 'Keep' });
    toast.success('Energy audit added');
  };
  const handleOpenLimber = () => {
    toast('Opening Limber...');
    window.location.href = 'limber://checkin';
    setTimeout(() => window.open('https://limberjack.com', '_blank'), 2000);
  };
  const handleSaveAll = () => {
    toast.success('Daily check-in saved ✓');
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-10 animate-fade-in">
        <header>
          <h1 className="text-2xl font-semibold">Check-in</h1>
          <p className="text-muted-foreground text-sm">Honoring your capacity, daily.</p>
        </header>
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">The 6 Pillars</h2>
          <div className="grid grid-cols-2 gap-3">
            {PILLARS.map((p) => (
              <button
                key={p.id}
                onClick={() => togglePillar(today, p.id)}
                className={cn(
                  "p-4 rounded-2xl flex flex-col justify-between items-start h-32 border-[0.5px] transition-all border-transparent text-left",
                  p.color,
                  pillarStates[p.id] && "ring-2 ring-primary ring-offset-2 border-primary/20"
                )}
              >
                <div>
                  <p className="text-sm font-semibold">{p.label}</p>
                  <p className="text-[10px] opacity-60 font-medium">{p.sub}</p>
                </div>
                <div className="w-full flex justify-end">
                  {pillarStates[p.id] && (
                    <div className="bg-primary rounded-full p-1">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Energy Audit</h2>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 space-y-4 border-[0.5px] border-border">
            <Input
              placeholder="What activity did you do?"
              className="bg-white border-none h-11 rounded-xl px-4 text-sm"
              value={newAudit.activity}
              onChange={(e) => setNewAudit({ ...newAudit, activity: e.target.value })}
            />
            <div className="flex gap-2">
              {(['Restored', 'Depleted'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setNewAudit({ ...newAudit, type: t })}
                  className={cn(
                    "flex-1 py-2 text-xs font-medium rounded-lg border-[0.5px] transition-all",
                    newAudit.type === t ? "bg-primary text-white border-primary" : "bg-white border-border text-muted-foreground"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {(['Keep', 'Modify', 'Release'] as const).map(a => (
                <button
                  key={a}
                  onClick={() => setNewAudit({ ...newAudit, action: a })}
                  className={cn(
                    "flex-1 py-2 text-xs font-medium rounded-lg border-[0.5px] transition-all",
                    newAudit.action === a ? "bg-primary/10 text-primary border-primary/20" : "bg-white border-border text-muted-foreground"
                  )}
                >
                  {a}
                </button>
              ))}
            </div>
            <Button onClick={handleSaveAudit} className="w-full bg-primary hover:bg-primary/90 h-11 rounded-xl text-sm font-medium">
              <Plus className="w-4 h-4 mr-2" /> Log Energy
            </Button>
          </div>
          {energyAudits.length > 0 && (
            <div className="space-y-2">
              {energyAudits.map((a) => (
                <div key={a.id} className="bg-white border-[0.5px] border-border p-3 rounded-xl flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{a.activity}</span>
                    <div className="flex gap-2 mt-1">
                      <span className={cn("text-[9px] font-bold uppercase tracking-wider", a.type === 'Restored' ? 'text-assata-teal' : 'text-assata-coral')}>{a.type}</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">•</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-primary">{a.action}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Physical Therapy</h2>
          <div className="bg-white border-[0.5px] border-border p-5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={ptCompleted}
                onChange={() => setPT(today, !ptCompleted)}
                className="w-6 h-6 rounded-lg border-border text-primary focus:ring-primary focus:ring-offset-0"
              />
              <span className="text-sm font-medium">Daily Routine</span>
            </div>
            <Button onClick={handleOpenLimber} variant="ghost" size="sm" className="text-xs font-semibold text-primary/70 h-8 px-3 flex items-center gap-1">Open Limber <ExternalLink className="w-3 h-3 ml-1" /></Button>
          </div>
        </section>
        <section className="space-y-4 pb-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Self-Advocacy Journal</h2>
          <div className="bg-gray-50 rounded-2xl p-6 border-[0.5px] border-border">
            <p className="font-serif italic text-primary/70 text-lg mb-4">What did you stand for today?</p>
            <Textarea
              placeholder="I noticed my boundary was..."
              className="min-h-[140px] bg-transparent border-none p-0 focus-visible:ring-0 text-base leading-relaxed"
              value={advocacyLog}
              onChange={(e) => setAdvocacy(today, e.target.value)}
            />
          </div>
        </section>
        <Button onClick={handleSaveAll} className="w-full bg-primary h-14 rounded-2xl text-base font-semibold shadow-lg shadow-primary/10">
          Save Daily Check-in
        </Button>
      </div>
    </div>
  );
}