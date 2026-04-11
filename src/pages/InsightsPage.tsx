import React from 'react';
import { format, subDays } from 'date-fns';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Flame, Activity, ScrollText, Calendar } from 'lucide-react';
export function InsightsPage() {
  const history = useStore(s => s.history);
  const streak = useStore(s => s.streak);
  const journals = useStore(s => s.journals);
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = subDays(new Date(), i);
    const key = format(d, 'yyyy-MM-dd');
    return {
      date: key,
      label: format(d, 'EE').charAt(0),
      data: history[key] || null
    };
  }).reverse();
  const journalCount = Object.values(journals).filter(v => v.length > 5).length;
  const pillarTotal = Object.values(history).reduce((acc, curr) => {
    return acc + Object.values(curr.pillars).filter(Boolean).length;
  }, 0);
  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <header>
        <h1 className="text-2xl font-semibold">Insights</h1>
        <p className="text-muted-foreground text-sm">Visualizing your progress over time.</p>
      </header>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border-[0.5px] border-border p-5 rounded-3xl space-y-2">
          <Flame className="w-5 h-5 text-assata-coral" />
          <div>
            <p className="text-3xl font-bold">{streak}</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Day Streak</p>
          </div>
        </div>
        <div className="bg-white border-[0.5px] border-border p-5 rounded-3xl space-y-2">
          <Activity className="w-5 h-5 text-assata-teal" />
          <div>
            <p className="text-3xl font-bold">{pillarTotal}</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Pillars Met</p>
          </div>
        </div>
      </div>
      <section className="bg-white border-[0.5px] border-border p-6 rounded-3xl space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Pulse History</h3>
          <Calendar className="w-4 h-4 text-muted-foreground opacity-30" />
        </div>
        <div className="flex justify-between items-end h-12 px-2">
          {last7Days.map((day) => (
            <div key={day.date} className="flex flex-col items-center gap-2">
              <div className={cn(
                "w-3 h-3 rounded-full",
                day.data?.pulse === 'Abundance' ? "bg-assata-teal" :
                day.data?.pulse === 'Neutral' ? "bg-primary/40" :
                day.data?.pulse === 'Depleted' ? "bg-assata-coral" :
                "bg-gray-100"
              )} />
              <span className="text-[10px] font-bold text-muted-foreground">{day.label}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <ScrollText className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Reflections</h3>
        </div>
        <div className="bg-assata-blue-bg/50 p-6 rounded-3xl border-[0.5px] border-blue-100">
          <p className="text-2xl font-bold text-blue-900">{journalCount}</p>
          <p className="text-xs text-blue-700/70 font-medium">Strategic commitments drafted this month.</p>
        </div>
      </section>
      <footer className="pt-4 text-center">
        <p className="font-serif italic text-muted-foreground text-sm">
          "The secret of change is to focus all of your energy, not on fighting the old, but on building the new."
        </p>
      </footer>
    </div>
  );
}