import React, { useMemo, useCallback } from 'react';
import { format } from 'date-fns';
import { Sparkles, Bell, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { useStore, PulseType, CapacityState } from '@/lib/store';
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
  "My voice carries weight and wisdom.",
  "I honor the rhythm of my own energy.",
  "Clarity comes from quiet observation.",
  "I am not my output; I am my impact.",
  "Strategic pauses are strategic wins.",
  "I build for longevity, not just today."
];
export function HomePage() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const history = useStore(s => s.history);
  const setPulse = useStore(s => s.setPulse);
  const setCapacity = useStore(s => s.setCapacity);
  const updateStreak = useStore(s => s.updateStreak);
  const notificationTime = useStore(s => s.notificationTime);
  const setNotificationTime = useStore(s => s.setNotificationTime);
  const [emblaRef] = useEmblaCarousel({ loop: true });
  const currentDay = history[today];
  const pulse = currentDay?.pulse || null;
  const capacity = currentDay?.capacity || { physical: 'Neutral', emotional: 'Neutral', mental: 'Neutral', relational: 'Neutral' };
  const pillars = currentDay?.pillars || {};
  const energyCount = currentDay?.energyAudits?.length || 0;
  const completionCount = Object.values(pillars).filter(Boolean).length + 
    (currentDay?.ptCompleted ? 1 : 0) + 
    (energyCount > 0 ? 1 : 0) +
    (pulse ? 1 : 0);
  const progress = (completionCount / 9) * 100;
  const greeting = useMemo(() => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, []);
  const handlePulseSelect = (p: PulseType) => {
    setPulse(today, p);
    updateStreak(today);
  };
  const handleCapacityToggle = (key: keyof typeof capacity) => {
    const cycle: CapacityState[] = ['Neutral', 'Restored', 'Deficit'];
    const current = capacity[key];
    const next = cycle[(cycle.indexOf(current) + 1) % cycle.length];
    setCapacity(today, { [key]: next });
  };
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const initialAffirmation = AFFIRMATIONS[dayOfYear % 12];
  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <header className="space-y-1">
        <h1 className="text-[22px] font-medium text-foreground tracking-tight">Assata</h1>
        <p className="text-muted-foreground text-sm">
          {greeting}, {format(new Date(), 'EEEE, MMMM do')}
        </p>
      </header>
      <section className="bg-assata-purple-bg p-6 rounded-2xl border-[0.5px] border-primary/10 relative overflow-hidden">
        <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
          <div className="flex">
            {AFFIRMATIONS.map((text, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 pr-4">
                <p className="font-serif text-lg italic text-primary/80 leading-[1.7]">
                  "{text}"
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-1 mt-4">
          {AFFIRMATIONS.map((_, i) => (
            <div key={i} className={cn("w-1 h-1 rounded-full bg-primary/20", i === (dayOfYear % 12) && "bg-primary w-2")} />
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Morning Pulse</h2>
        <div className="flex gap-2">
          {(['Abundance', 'Neutral', 'Depleted'] as PulseType[]).map((p) => (
            <button
              key={p}
              onClick={() => handlePulseSelect(p)}
              className={cn(
                "flex-1 py-3 rounded-xl border-[0.5px] transition-all text-sm font-medium",
                pulse === p
                  ? p === 'Abundance' ? "bg-assata-teal text-white border-assata-teal" :
                    p === 'Neutral' ? "bg-amber-500 text-white border-amber-500" :
                    "bg-assata-coral text-white border-assata-coral"
                  : "bg-white text-muted-foreground border-border"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Capacity Snapshot</h2>
        <div className="grid grid-cols-2 gap-3">
          {(['physical', 'emotional', 'mental', 'relational'] as const).map((key) => (
            <button
              key={key}
              onClick={() => handleCapacityToggle(key)}
              className={cn(
                "p-4 rounded-xl border-[0.5px] flex flex-col items-center justify-center gap-2 transition-all active:scale-95",
                capacity[key] === 'Restored' ? "bg-assata-teal-bg border-assata-teal/30 text-assata-teal" :
                capacity[key] === 'Deficit' ? "bg-assata-coral-bg border-assata-coral/30 text-assata-coral" :
                "bg-gray-50 border-border text-muted-foreground"
              )}
            >
              <span className="text-[10px] uppercase font-bold tracking-wider">{key}</span>
              <span className="text-sm font-medium">{capacity[key]}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Strategic Progress</h2>
          <span className="text-[10px] font-bold text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-1.5" />
        <Button className="w-full bg-white text-foreground border-border hover:bg-gray-50 flex justify-between h-14 rounded-2xl px-5 border-[0.5px]" asChild variant="outline">
          <Link to="/check-in">
            <span className="font-medium">Begin check-in</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </Link>
        </Button>
      </section>
      <footer className="pt-4">
        <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between border-[0.5px] border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg border-[0.5px] border-border">
              <Bell className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs font-semibold">Morning Reminder</p>
              <p className="text-[10px] text-muted-foreground">Daily anchor notification</p>
            </div>
          </div>
          <input 
            type="time" 
            value={notificationTime} 
            onChange={(e) => setNotificationTime(e.target.value)}
            className="bg-transparent text-sm font-medium border-none focus:ring-0 p-0 w-16"
          />
        </div>
      </footer>
    </div>
  );
}