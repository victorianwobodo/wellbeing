import React, { useMemo } from 'react';
import { format, subDays } from 'date-fns';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Flame, Activity, ScrollText, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
export function InsightsPage() {
  const currentStreak = useStore(s => s.streak.currentStreak);
  const history = useStore(s => s.history);
  const weeklyJournals = useStore(s => s.journals.weekly);
  const monthlyJournals = useStore(s => s.journals.monthly);
  const quarterlyJournals = useStore(s => s.journals.quarterly);
  const patternsJournal = useStore(s => s.journals.patterns);
  const circleJournal = useStore(s => s.journals.circle);
  const narrativeJournal = useStore(s => s.journals.narrative);
  const last7Days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = subDays(new Date(), 6 - i);
      const key = format(d, 'yyyy-MM-dd');
      const dayData = history[key];
      let pulseValue = 0;
      if (dayData?.pulse === 'Abundance') pulseValue = 3;
      else if (dayData?.pulse === 'Neutral') pulseValue = 2;
      else if (dayData?.pulse === 'Depleted') pulseValue = 1;
      return {
        date: key,
        display: format(d, 'EEE'),
        pulse: dayData?.pulse || null,
        value: pulseValue
      };
    });
  }, [history]);
  const journalCount = useMemo(() => {
    let count = 0;
    if ((patternsJournal?.length || 0) > 5) count++;
    if ((circleJournal?.length || 0) > 5) count++;
    if ((narrativeJournal?.length || 0) > 5) count++;
    count += Object.values(weeklyJournals || {}).filter(v => (v?.length || 0) > 5).length;
    count += Object.values(monthlyJournals || {}).filter(v => (v?.length || 0) > 5).length;
    count += Object.values(quarterlyJournals || {}).filter(v => (v?.length || 0) > 5).length;
    return count;
  }, [weeklyJournals, monthlyJournals, quarterlyJournals, patternsJournal, circleJournal, narrativeJournal]);
  const pillarTotal = useMemo(() => {
    return Object.values(history || {}).reduce((acc, curr) => {
      return acc + Object.values(curr.pillars || {}).filter(Boolean).length;
    }, 0);
  }, [history]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in">
        <header>
          <h1 className="text-2xl font-semibold">Insights</h1>
          <p className="text-muted-foreground text-sm">Visualizing your progress over time.</p>
        </header>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border-[0.5px] border-border p-5 rounded-3xl space-y-2">
            <Flame className="w-5 h-5 text-assata-coral" />
            <div>
              <p className="text-3xl font-bold">{currentStreak}</p>
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
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={last7Days}>
                <defs>
                  <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#534AB7" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#534AB7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="display"
                  axisLine={false}
                  tickLine={false}
                  tick={{fontSize: 10, fill: '#888'}}
                />
                <YAxis hide domain={[0, 4]} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#534AB7"
                  fillOpacity={1}
                  fill="url(#colorPulse)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-around text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            {last7Days.map(d => (
              <div key={d.date} className="flex flex-col items-center gap-1">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  d.pulse === 'Abundance' ? 'bg-assata-teal' :
                  d.pulse === 'Neutral' ? 'bg-amber-500' :
                  d.pulse === 'Depleted' ? 'bg-assata-coral' : 'bg-gray-100'
                )} />
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
            <p className="text-xs text-blue-700/70 font-medium">Strategic commitments logged.</p>
          </div>
        </section>
        <footer className="pt-4 pb-8 text-center">
          <p className="font-serif italic text-muted-foreground text-sm max-w-xs mx-auto">
            "The secret of change is to focus all of your energy, not on fighting the old, but on building the new."
          </p>
        </footer>
      </div>
    </div>
  );
}