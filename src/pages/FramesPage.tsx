import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { BookOpen, Users, Flag, Heart } from 'lucide-react';
const FRAMES = [
  {
    id: 'architect',
    title: 'The Architect',
    role: 'Structural Frame',
    icon: <Flag className="w-4 h-4" />,
    color: 'bg-blue-50 border-blue-100',
    content: 'Focus on goals, roles, and technology. Design systems that support clarity and efficiency.'
  },
  {
    id: 'nurturer',
    title: 'The Nurturer',
    role: 'Human Resource Frame',
    icon: <Heart className="w-4 h-4" />,
    color: 'bg-pink-50 border-pink-100',
    content: 'Focus on needs, skills, and relationships. Align the organization with people’s talents.'
  },
  {
    id: 'negotiator',
    title: 'The Negotiator',
    role: 'Political Frame',
    icon: <Users className="w-4 h-4" />,
    color: 'bg-amber-50 border-amber-100',
    content: 'Focus on power, conflict, and coalition building. Navigate varied interests with grace.'
  },
  {
    id: 'creator',
    title: 'The Creator',
    role: 'Symbolic Frame',
    icon: <BookOpen className="w-4 h-4" />,
    color: 'bg-purple-50 border-purple-100',
    content: 'Focus on culture, meaning, and ritual. Shape the story and purpose of the work.'
  }
];
export function FramesPage() {
  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <header>
        <h1 className="text-2xl font-semibold">Leadership Compass</h1>
        <p className="text-muted-foreground text-sm">Bolman & Deal’s Reframing Leadership.</p>
      </header>
      <Accordion type="single" collapsible className="space-y-4">
        {FRAMES.map((frame) => (
          <AccordionItem key={frame.id} value={frame.id} className={`${frame.color} border-[0.5px] rounded-2xl px-4 overflow-hidden`}>
            <AccordionTrigger className="hover:no-underline py-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/50">{frame.icon}</div>
                <div className="text-left">
                  <p className="text-sm font-semibold">{frame.title}</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{frame.role}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-5 pt-0 text-sm leading-relaxed text-muted-foreground">
              {frame.content}
              <div className="mt-4 flex gap-2">
                <div className="bg-white/50 rounded-full px-3 py-1 text-[10px] font-medium border-[0.5px] border-black/5">Practice</div>
                <div className="bg-white/50 rounded-full px-3 py-1 text-[10px] font-medium border-[0.5px] border-black/5">Ritual</div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <section className="pt-4 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Quick Resources</h2>
        <div className="grid grid-cols-1 gap-3">
          {['Strategic Narrative', 'Conflict Mapping', 'Cultural Anchors'].map((item) => (
            <div key={item} className="p-4 bg-white border-[0.5px] border-border rounded-xl flex justify-between items-center">
              <span className="text-sm font-medium">{item}</span>
              <div className="w-6 h-6 rounded-full bg-gray-50 border-[0.5px] border-border" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}