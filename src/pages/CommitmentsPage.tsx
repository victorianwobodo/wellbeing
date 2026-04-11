import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';
import { useStore, JournalState } from '@/lib/store';
import { Target, Zap } from 'lucide-react';
export function CommitmentsPage() {
  const journals = useStore(s => s.journals);
  const updateJournal = useStore(s => s.updateJournal);
  const [activeTab, setActiveTab] = useState<keyof JournalState>('weekly');
  return (
    <div className="p-0 animate-fade-in flex flex-col min-h-full">
      <header className="p-6 pb-4">
        <h1 className="text-2xl font-semibold">Commitments</h1>
      </header>
      <div className="px-6 pb-6">
        <div className="bg-assata-purple p-5 rounded-2xl text-white space-y-3 relative overflow-hidden">
          <Zap className="absolute -right-4 -top-4 w-24 h-24 opacity-10 rotate-12" />
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-assata-coral" />
            <span className="text-xs font-semibold uppercase tracking-wider">Strategic Focus</span>
          </div>
          <p className="text-lg font-medium leading-tight">Define the delta between where you are and where you want to be.</p>
        </div>
      </div>
      <Tabs defaultValue="weekly" className="flex-1 flex flex-col" onValueChange={(v) => setActiveTab(v as keyof JournalState)}>
        <div className="px-6">
          <TabsList className="w-full h-12 bg-gray-100 rounded-xl p-1 gap-1">
            <TabsTrigger value="weekly" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-none">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-none">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-none">Qrtly</TabsTrigger>
            <TabsTrigger value="patterns" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-none">Patterns</TabsTrigger>
          </TabsList>
        </div>
        <div className="p-6 flex-1 bg-white mt-4 rounded-t-[32px] border-t-[0.5px] border-border">
          <TabsContent value={activeTab} className="mt-0 h-full">
            <div className="space-y-4 h-full flex flex-col">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground capitalize">{activeTab} Reflection</h3>
                <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-bold">Auto-saving</span>
              </div>
              <Textarea 
                placeholder={`Start writing your ${activeTab} commitment...`}
                className="flex-1 min-h-[300px] border-none bg-gray-50/50 rounded-2xl p-6 focus-visible:ring-0 text-base leading-relaxed"
                value={journals[activeTab]}
                onChange={(e) => updateJournal(activeTab, e.target.value)}
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}