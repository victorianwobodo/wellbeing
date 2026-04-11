import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export type PillarId = 'body' | 'mind' | 'space' | 'connection' | 'pace' | 'voice';
export type PulseType = 'Abundance' | 'Neutral' | 'Depleted';
export interface DailyState {
  pulse: PulseType | null;
  pillars: Record<PillarId, boolean>;
  ptCompleted: boolean;
  advocacyLog: string;
}
export interface JournalState {
  weekly: string;
  monthly: string;
  quarterly: string;
  patterns: string;
  circle: string;
}
interface AssataStore {
  history: Record<string, DailyState>; // Key: YYYY-MM-DD
  journals: JournalState;
  streak: number;
  lastCheckIn: string | null;
  setPulse: (date: string, pulse: PulseType) => void;
  togglePillar: (date: string, pillar: PillarId) => void;
  setPT: (date: string, completed: boolean) => void;
  setAdvocacy: (date: string, text: string) => void;
  updateJournal: (key: keyof JournalState, text: string) => void;
  updateStreak: (date: string) => void;
}
export const useStore = create<AssataStore>()(
  persist(
    (set) => ({
      history: {},
      journals: {
        weekly: '',
        monthly: '',
        quarterly: '',
        patterns: '',
        circle: '',
      },
      streak: 0,
      lastCheckIn: null,
      setPulse: (date, pulse) => set((state) => {
        const current = state.history[date] || { pulse: null, pillars: { body: false, mind: false, space: false, connection: false, pace: false, voice: false }, ptCompleted: false, advocacyLog: '' };
        return { history: { ...state.history, [date]: { ...current, pulse } } };
      }),
      togglePillar: (date, pillar) => set((state) => {
        const current = state.history[date] || { pulse: null, pillars: { body: false, mind: false, space: false, connection: false, pace: false, voice: false }, ptCompleted: false, advocacyLog: '' };
        return {
          history: {
            ...state.history,
            [date]: { ...current, pillars: { ...current.pillars, [pillar]: !current.pillars[pillar] } }
          }
        };
      }),
      setPT: (date, completed) => set((state) => {
        const current = state.history[date] || { pulse: null, pillars: { body: false, mind: false, space: false, connection: false, pace: false, voice: false }, ptCompleted: false, advocacyLog: '' };
        return { history: { ...state.history, [date]: { ...current, ptCompleted: completed } } };
      }),
      setAdvocacy: (date, text) => set((state) => {
        const current = state.history[date] || { pulse: null, pillars: { body: false, mind: false, space: false, connection: false, pace: false, voice: false }, ptCompleted: false, advocacyLog: '' };
        return { history: { ...state.history, [date]: { ...current, advocacyLog: text } } };
      }),
      updateJournal: (key, text) => set((state) => ({
        journals: { ...state.journals, [key]: text }
      })),
      updateStreak: (date) => set((state) => {
        if (state.lastCheckIn === date) return state;
        const last = state.lastCheckIn ? new Date(state.lastCheckIn) : null;
        const current = new Date(date);
        const diff = last ? (current.getTime() - last.getTime()) / (1000 * 3600 * 24) : 0;
        const newStreak = diff === 1 ? state.streak + 1 : 1;
        return { streak: newStreak, lastCheckIn: date };
      }),
    }),
    { name: 'assata-storage' }
  )
);