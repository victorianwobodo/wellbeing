import React from 'react';
import { format } from 'date-fns';
import { useStore, PillarId } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Check, ExternalLink } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
const PILLARS: { id: PillarId; label: string; color: string }[] = [
  { id: 'body', label: 'Body', color: 'bg-assata-teal-bg' },
  { id: 'mind', label: 'Mind', color: 'bg-assata-purple-bg' },
  { id: 'space', label: 'Space', color: 'bg-assata-amber-bg' },
  { id: 'connection', label: 'Connection', color: 'bg-assata-pink-bg' },
  { id: 'pace', label: 'Pace', color: 'bg-assata-blue-bg' },
  { id: 'voice', label: 'Voice', color: 'bg-assata-coral-bg' },
];
export function CheckInPage() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const history = useStore(s => s.history);
  const togglePillar = useStore(s => s.togglePillar);
  const setPT = useStore(s => s.setPT);
  const setAdvocacy = useStore(s => s.setAdvocacy);
  const currentDay = history[today];
  const pillars = currentDay?.pillars || { body: false, mind: false, space: false, connection: false, pace: false, voice: false };
  const ptCompleted = currentDay?.ptCompleted || false;
  const advocacyLog = currentDay?.advocacyLog || '';
  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <header>
        <h1 className="text-2xl font-semibold">Daily Check-in</h1>
        <p className="text-muted-foreground text-sm">Consistent small acts build great careers.</p>
      </header>
      <div className="grid grid-cols-2 gap-3">
        {PILLARS.map((p) => (
          <button
            key={p.id}
            onClick={() => togglePillar(today, p.id)}
            className={cn(
              "p-4 rounded-2xl flex flex-col justify-between items-start h-28 border-[0.5px] transition-all border-transparent",
              p.color,
              pillars[p.id] && "ring-2 ring-primary ring-offset-1 border-primary/20"
            )}
          >
            <span className="text-xs font-semibold uppercase tracking-wider opacity-60">{p.id}</span>
            <div className="w-full flex justify-between items-end">
              <span className="text-sm font-medium">{p.label}</span>
              {pillars[p.id] && <Check className="w-4 h-4 text-primary" />}
            </div>
          </button>
        ))}
      </div>
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Physical Therapy</h2>
        <div className="bg-white border-[0.5px] border-border p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              checked={ptCompleted} 
              onChange={() => setPT(today, !ptCompleted)}
              className="w-5 h-5 rounded-md border-border text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">Daily Routine</span>
          </div>
          <Button variant="ghost" size="sm" className="text-xs flex gap-1 items-center" asChild>
            <a href="https://limberhealth.com" target="_blank" rel="noopener noreferrer">
              Limber App <ExternalLink className="w-3 h-3" />
            </a>
          </Button>
        </div>
      </section>
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Self-Advocacy Journal</h2>
        <p className="text-xs text-muted-foreground italic">What did you stand for today?</p>
        <Textarea 
          placeholder="I noticed my boundary was..." 
          className="min-h-[120px] bg-gray-50 border-none rounded-2xl p-4 focus-visible:ring-primary"
          value={advocacyLog}
          onChange={(e) => setAdvocacy(today, e.target.value)}
        />
      </section>
    </div>
  );
}