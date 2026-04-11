import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { ShieldCheck, ReceiptText, HeartHandshake, History, HelpCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
const COST_AREAS = [
  "Relationship Depth", "Creative Output", "Structural Clarity",
  "Physical Wellbeing", "Relational Boundaries", "Rest Cycles",
  "Voice / Advocacy", "Spiritual Connection", "Focus / Presence", "Long-term Longevity"
];
export function LedgerPage() {
  const today = useMemo(() => new Date(), []);
  const quarter = useMemo(() => `${today.getFullYear()}-Q${Math.floor(today.getMonth() / 3) + 1}`, [today]);
  // Selector returns primitive/reference from store
  const rawLedger = useStore(s => s.ledger[quarter]);
  // Handle fallbacks locally during render to keep selectors stable
  const capacityEvidence = rawLedger?.capacityEvidence ?? {};
  const capacityStatus = rawLedger?.capacityStatus ?? {};
  const costs = rawLedger?.costs ?? {};
  const worthBeliefs = rawLedger?.worthBeliefs ?? [];
  const worthOrigin = rawLedger?.worthOrigin ?? '';
  const history = useStore(s => s.history);
  const updateLedger = useStore(s => s.updateLedger);
  const handleStatusToggle = (key: string) => {
    const cycle = ['Uncertain', 'Yes', 'No'] as const;
    const current = capacityStatus[key] || 'Uncertain';
    const next = cycle[(cycle.indexOf(current) + 1) % cycle.length];
    updateLedger(quarter, { capacityStatus: { ...capacityStatus, [key]: next } });
  };
  const handleCostToggle = (area: string) => {
    const cycle = ['Restoration', 'Sacrifice', 'Worth'] as const;
    const current = costs[area] || 'Restoration';
    const next = cycle[(cycle.indexOf(current) + 1) % cycle.length];
    updateLedger(quarter, { costs: { ...costs, [area]: next } });
  };
  const recentHistory = useMemo(() => {
    return Object.entries(history)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .slice(0, 15);
  }, [history]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-12 animate-fade-in">
        <header>
          <h1 className="text-2xl font-semibold">Strategic Ledger</h1>
          <p className="text-muted-foreground text-sm">Quarterly accountability and audit.</p>
        </header>
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-assata-teal" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Capacity Evidence</h2>
          </div>
          <div className="space-y-4">
            {(['Physical', 'Emotional', 'Mental', 'Relational'] as const).map(type => (
              <div key={type} className="bg-white border-[0.5px] border-border rounded-2xl overflow-hidden">
                <div className="p-4 flex items-center justify-between bg-gray-50/50">
                  <span className="text-sm font-semibold">{type} Capacity Met?</span>
                  <button
                    onClick={() => handleStatusToggle(type)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border-[0.5px] transition-all",
                      capacityStatus[type] === 'Yes' ? "bg-assata-teal text-white border-assata-teal" :
                      capacityStatus[type] === 'No' ? "bg-assata-coral text-white border-assata-coral" :
                      "bg-white text-muted-foreground border-border"
                    )}
                  >
                    {capacityStatus[type] || 'Uncertain'}
                  </button>
                </div>
                <div className="p-4 pt-2">
                  <Textarea
                    placeholder="What is the evidence for this status?"
                    className="bg-transparent border-none resize-none p-0 min-h-[60px] text-sm focus-visible:ring-0"
                    value={capacityEvidence[type] || ''}
                    onChange={(e) => updateLedger(quarter, { capacityEvidence: { ...capacityEvidence, [type]: e.target.value } })}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <ReceiptText className="w-4 h-4 text-primary" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Costs Tracker</h2>
          </div>
          <div className="bg-white border-[0.5px] border-border rounded-2xl overflow-hidden divide-y-[0.5px] divide-border">
            {COST_AREAS.map(area => (
              <div key={area} className="p-4 flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-foreground">{area}</span>
                <button
                  onClick={() => handleCostToggle(area)}
                  className={cn(
                    "flex-shrink-0 min-w-[80px] px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-center border-[0.5px]",
                    costs[area] === 'Sacrifice' ? "bg-assata-coral/10 text-assata-coral border-assata-coral/20" :
                    costs[area] === 'Worth' ? "bg-assata-teal/10 text-assata-teal border-assata-teal/20" :
                    "bg-gray-100 text-muted-foreground border-border"
                  )}
                >
                  {costs[area] || 'TBD'}
                </button>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-assata-coral" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Worth Beliefs</h2>
          </div>
          <div className="bg-assata-coral-bg/30 border-[0.5px] border-assata-coral/10 rounded-2xl p-6 space-y-6">
            <div className="space-y-4">
              {["My worth is static, not performance-based.", "Exhaustion is not a status symbol.", "I am allowed to inhabit space.", "Silence is a productive state."].map(belief => (
                <label key={belief} className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-assata-coral/30 text-assata-coral focus:ring-assata-coral mt-0.5"
                    checked={worthBeliefs.includes(belief)}
                    onChange={(e) => {
                      const next = e.target.checked
                        ? [...worthBeliefs, belief]
                        : worthBeliefs.filter(b => b !== belief);
                      updateLedger(quarter, { worthBeliefs: next });
                    }}
                  />
                  <span className="text-sm font-medium text-assata-coral/80 leading-relaxed">{belief}</span>
                </label>
              ))}
            </div>
            <div className="space-y-3">
              <p className="font-serif italic text-assata-coral/70">What is the origin of your primary worth-narrative?</p>
              <Textarea
                className="bg-white/50 border-none rounded-xl p-4 text-sm min-h-[120px] focus-visible:ring-assata-coral/20"
                value={worthOrigin}
                onChange={(e) => updateLedger(quarter, { worthOrigin: e.target.value })}
              />
            </div>
          </div>
        </section>
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Recent Energy Log</h2>
          </div>
          <div className="space-y-3">
            {recentHistory.map(([date, data]) => (
              <div key={date} className="bg-white border-[0.5px] border-border p-4 rounded-xl flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground">{format(new Date(date), 'MMM d')}</span>
                <div className="flex gap-1">
                  {(data as any).energyAudits?.map((audit: any) => (
                    <div key={audit.id} className={cn("w-2 h-2 rounded-full", audit.type === 'Restored' ? 'bg-assata-teal' : 'bg-assata-coral')} />
                  ))}
                  {((data as any).energyAudits?.length ?? 0) === 0 && <div className="w-2 h-2 rounded-full bg-gray-100" />}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}