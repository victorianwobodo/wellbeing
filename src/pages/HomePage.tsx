import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore, PulseType } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
const AFFIRMATIONS = [
  "My growth is non-linear but constant.",
  "I lead with empathy and structural clarity.",
  "Boundaries are my foundation for wellbeing.",
  "I am the architect of my own career path.",
  "Reflection is a strategic leadership tool.",
  "I deserve the space I inhabit.",
  "My voice carries weight and wisdom."
];
export function HomePage() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const history = useStore(s => s.history);
  const setPulse = useStore(s => s.setPulse);
  const updateStreak = useStore(s => s.updateStreak);
  const currentDay = history[today];
  const pulse = currentDay?.pulse || null;
  const pillars = currentDay?.pillars || {};
  const completionCount = Object.values(pillars).filter(Boolean).length + (currentDay?.ptCompleted ? 1 : 0);
  const progress = (completionCount / 7) * 100;
  const affirmation = useMemo(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return AFFIRMATIONS[dayOfYear % AFFIRMATIONS.length];
  }, []);
  const handlePulseSelect = (p: PulseType) => {
    setPulse(today, p);
    updateStreak(today);
  };
  return (
    <div className="p-6 space-y-10 animate-fade-in">
      <header className="space-y-1">
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">{format(new Date(), 'EEEE, MMMM do')}</p>
        <h1 className="text-2xl font-semibold">Morning, Assata</h1>
      </header>
      <section className="bg-assata-purple-bg p-6 rounded-2xl border-[0.5px] border-primary/10">
        <Sparkles className="w-5 h-5 text-primary mb-3" />
        <p className="font-serif text-lg italic text-primary/80 leading-relaxed">
          "{affirmation}"
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Morning Pulse</h2>
        <div className="flex gap-3">
          {(['Abundance', 'Neutral', 'Depleted'] as PulseType[]).map((p) => (
            <button
              key={p}
              onClick={() => handlePulseSelect(p)}
              className={cn(
                "flex-1 py-3 rounded-xl border-[0.5px] transition-all text-sm font-medium",
                pulse === p 
                  ? "bg-primary text-white border-primary" 
                  : "bg-white text-muted-foreground border-border active:scale-95"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Daily Progress</h2>
          <span className="text-xs font-medium text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="bg-white p-5 rounded-2xl border-[0.5px] border-border flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Daily Pillars</p>
            <p className="text-xs text-muted-foreground">{completionCount} of 7 tasks complete</p>
          </div>
          <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0" asChild>
            <Link to="/check-in"><ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}