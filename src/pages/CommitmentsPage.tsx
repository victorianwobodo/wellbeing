import React, { useState, useMemo } from 'react';
import { getISOWeek } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useStore } from '@/lib/store';
import { Target, Zap, Circle, AlertCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function CommitmentsPage() {
  const [activeTab, setActiveTab] = useState('weekly');
  const [newSign, setNewSign] = useState('');
  const today = useMemo(() => new Date(), []);
  const weekKey = useMemo(() => `${today.getFullYear()}-W${getISOWeek(today)}`, [today]);
  const monthKey = useMemo(() => `${today.getFullYear()}-${today.getMonth() + 1}`, [today]);
  const quarterKey = useMemo(() => `${today.getFullYear()}-Q${Math.floor(today.getMonth() / 3) + 1}`, [today]);
  const weeklyJournal = useStore(s => s.journals.weekly[weekKey] ?? '');
  const monthlyJournal = useStore(s => s.journals.monthly[monthKey] ?? '');
  const quarterlyJournal = useStore(s => s.journals.quarterly[quarterKey] ?? '');
  const patternsJournal = useStore(s => s.journals.patterns);
  const circleJournal = useStore(s => s.journals.circle);
  const narrative = useStore(s => s.journals.narrative);
  const warningSigns = useStore(s => s.warningSigns);
  const addWarningSign = useStore(s => s.addWarningSign);
  const updateJournal = useStore(s => s.updateJournal);
  return (
    <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
      <div className="animate-fade-in flex flex-col min-h-full">
        <header className="p-6 pb-4">
          <h1 className="text-2xl font-semibold">Commitments</h1>
        </header>
        <div className="px-6 pb-6">
          <div className="bg-assata-purple p-6 rounded-[32px] text-white space-y-4 relative overflow-hidden">
            <Zap className="absolute -right-6 -top-6 w-32 h-32 opacity-10 rotate-12" />
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-assata-coral" />
              <span className="text-xs font-semibold uppercase tracking-widest opacity-80">Strategic Directive</span>
            </div>
            <p className="text-lg font-serif leading-tight">
              {narrative || 'I lead by prioritizing clarity over speed. My health is the infrastructure of my impact.'}
            </p>
          </div>
        </div>
        <Tabs defaultValue="weekly" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
          <div className="px-6 overflow-x-auto no-scrollbar">
            <TabsList className="w-max h-12 bg-gray-100 rounded-2xl p-1 gap-1">
              <TabsTrigger value="weekly" className="rounded-xl text-[10px] font-bold uppercase tracking-wider h-10 px-4 data-[state=active]:bg-white">Weekly</TabsTrigger>
              <TabsTrigger value="monthly" className="rounded-xl text-[10px] font-bold uppercase tracking-wider h-10 px-4 data-[state=active]:bg-white">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly" className="rounded-xl text-[10px] font-bold uppercase tracking-wider h-10 px-4 data-[state=active]:bg-white">Quarterly</TabsTrigger>
              <TabsTrigger value="patterns" className="rounded-xl text-[10px] font-bold uppercase tracking-wider h-10 px-4 data-[state=active]:bg-white">Patterns</TabsTrigger>
              <TabsTrigger value="circle" className="rounded-xl text-[10px] font-bold uppercase tracking-wider h-10 px-4 data-[state=active]:bg-white">Circle</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex-1 bg-white mt-6 rounded-t-[40px] border-t-[0.5px] border-border p-6 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.05)] pb-12">
            <TabsContent value="weekly" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-amber-50 p-5 rounded-2xl border-[0.5px] border-amber-100 flex gap-4">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <span className="font-bold">Focus Check:</span> Sunday prep is for vision; Wednesday prep is for adjustment.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-serif italic text-lg text-primary/80">My unsustainable 'Yes' this week:</h3>
                <Textarea
                  placeholder="Where did you over-commit?"
                  className="bg-gray-50 border-none rounded-2xl p-6 min-h-[150px] focus-visible:ring-0 text-base"
                  value={weeklyJournal}
                  onChange={(e) => updateJournal('weekly', weekKey, e.target.value)}
                />
              </div>
            </TabsContent>
            <TabsContent value="monthly" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="space-y-4">
                <h3 className="font-serif italic text-lg text-primary/80">Monthly Release:</h3>
                <p className="text-xs text-muted-foreground">What must you stop doing to remain healthy?</p>
                <Textarea
                  placeholder="I am letting go of..."
                  className="bg-gray-50 border-none rounded-2xl p-6 min-h-[150px] focus-visible:ring-0 text-base"
                  value={monthlyJournal}
                  onChange={(e) => updateJournal('monthly', monthKey, e.target.value)}
                />
              </div>
            </TabsContent>
            <TabsContent value="quarterly" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="space-y-4">
                <h3 className="font-serif italic text-lg text-primary/80">Strategic Reflection:</h3>
                <Textarea
                  placeholder="This quarter was defined by..."
                  className="bg-gray-50 border-none rounded-2xl p-6 min-h-[150px] focus-visible:ring-0 text-base"
                  value={quarterlyJournal}
                  onChange={(e) => updateJournal('quarterly', quarterKey, e.target.value)}
                />
              </div>
            </TabsContent>
            <TabsContent value="patterns" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Warning Signs</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a new sign..."
                    className="bg-gray-50 border-none rounded-xl"
                    value={newSign}
                    onChange={(e) => setNewSign(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newSign.trim()) {
                        addWarningSign(newSign.trim());
                        setNewSign('');
                      }
                    }}
                  />
                  <Button size="icon" className="rounded-xl" onClick={() => {
                    if (newSign.trim()) {
                      addWarningSign(newSign.trim());
                      setNewSign('');
                    }
                  }}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {warningSigns.map((sign, i) => (
                    <div key={i} className="bg-gray-100 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-muted-foreground border-[0.5px] border-border">
                      {sign}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Operating Beliefs</h3>
                <Textarea
                  placeholder="What beliefs govern your work?"
                  className="bg-gray-50 border-none rounded-2xl p-6 min-h-[150px] focus-visible:ring-0 text-base"
                  value={patternsJournal}
                  onChange={(e) => updateJournal('patterns', '', e.target.value)}
                />
              </div>
            </TabsContent>
            <TabsContent value="circle" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Inner Circle</h3>
                <div className="flex flex-wrap gap-3">
                  {["Mentor A", "Peer B", "Confidant C", "Family D"].map(name => (
                    <button
                      key={name}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border-[0.5px] border-border bg-white text-sm font-medium hover:border-assata-teal/30 transition-all"
                    >
                      <Circle className="w-3 h-3 text-muted-foreground" />
                      {name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-serif italic text-lg text-primary/80">Circle Notes:</h3>
                <Textarea
                  placeholder="Who has held space for you lately?"
                  className="bg-gray-50 border-none rounded-2xl p-6 min-h-[150px] focus-visible:ring-0 text-base"
                  value={circleJournal}
                  onChange={(e) => updateJournal('circle', '', e.target.value)}
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}