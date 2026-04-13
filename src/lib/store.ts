import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export type PillarId = 'body' | 'mind' | 'space' | 'connection' | 'pace' | 'voice';
export type PulseType = 'Abundance' | 'Neutral' | 'Depleted';
export type CapacityState = 'Restored' | 'Neutral' | 'Deficit';
export interface CapacitySnapshot {
  physical: CapacityState;
  emotional: CapacityState;
  mental: CapacityState;
  relational: CapacityState;
}
export interface EnergyAudit {
  id: string;
  activity: string;
  type: 'Restored' | 'Depleted';
  action: 'Keep' | 'Modify' | 'Release';
  timestamp: number;
}
export interface DailyState {
  pulse: PulseType | null;
  capacity: CapacitySnapshot;
  pillars: Record<PillarId, boolean>;
  ptCompleted: boolean;
  advocacyLog: string;
  energyAudits: EnergyAudit[];
}
export interface JournalState {
  weekly: Record<string, string>;
  monthly: Record<string, string>;
  quarterly: Record<string, string>;
  patterns: string;
  circle: string;
  narrative: string;
}
export interface LedgerQuarterly {
  capacityEvidence: Record<string, string>;
  capacityStatus: Record<string, 'Yes' | 'No' | 'Uncertain'>;
  costs: Record<string, 'Sacrifice' | 'Worth' | 'Restoration'>;
  worthBeliefs: string[];
  worthOrigin: string;
}
interface AssataStore {
  history: Record<string, DailyState>;
  journals: JournalState;
  ledger: Record<string, LedgerQuarterly>;
  warningSigns: string[];
  notificationTime: string;
  streak: {
    lastOpen: string | null;
    currentStreak: number;
    longestStreak: number;
  };
  setPulse: (date: string, pulse: PulseType) => void;
  setCapacity: (date: string, capacity: Partial<CapacitySnapshot>) => void;
  togglePillar: (date: string, pillar: PillarId) => void;
  setPT: (date: string, completed: boolean) => void;
  setAdvocacy: (date: string, text: string) => void;
  addEnergyAudit: (date: string, audit: Omit<EnergyAudit, 'id' | 'timestamp'>) => void;
  updateJournal: (type: keyof JournalState, key: string, text: string) => void;
  updateNarrative: (text: string) => void;
  setNotificationTime: (time: string) => void;
  addWarningSign: (sign: string) => void;
  updateStreak: (date: string) => void;
  updateLedger: (quarter: string, data: Partial<LedgerQuarterly>) => void;
}
export const initialDaily = (): DailyState => ({
  pulse: null,
  capacity: { physical: 'Neutral', emotional: 'Neutral', mental: 'Neutral', relational: 'Neutral' },
  pillars: { body: false, mind: false, space: false, connection: false, pace: false, voice: false },
  ptCompleted: false,
  advocacyLog: '',
  energyAudits: []
});
export const useStore = create<AssataStore>()(
  persist(
    (set) => ({
      history: {},
      journals: {
        weekly: {},
        monthly: {},
        quarterly: {},
        patterns: '',
        circle: '',
        narrative: ''
      },
      ledger: {},
      warningSigns: [],
      notificationTime: '07:00',
      streak: { lastOpen: null, currentStreak: 0, longestStreak: 0 },
      setPulse: (date, pulse) => set((state) => ({
        history: { ...state.history, [date]: { ...(state.history[date] || initialDaily()), pulse } }
      })),
      setCapacity: (date, capacity) => set((state) => {
        const current = state.history[date] || initialDaily();
        return {
          history: {
            ...state.history,
            [date]: { ...current, capacity: { ...current.capacity, ...capacity } }
          }
        };
      }),
      togglePillar: (date, pillar) => set((state) => {
        const current = state.history[date] || initialDaily();
        return {
          history: {
            ...state.history,
            [date]: { ...current, pillars: { ...current.pillars, [pillar]: !current.pillars[pillar] } }
          }
        };
      }),
      setPT: (date, completed) => set((state) => ({
        history: { ...state.history, [date]: { ...(state.history[date] || initialDaily()), ptCompleted: completed } }
      })),
      setAdvocacy: (date, text) => set((state) => ({
        history: { ...state.history, [date]: { ...(state.history[date] || initialDaily()), advocacyLog: text } }
      })),
      addEnergyAudit: (date, audit) => set((state) => {
        const current = state.history[date] || initialDaily();
        const newAudit: EnergyAudit = { ...audit, id: crypto.randomUUID(), timestamp: Date.now() };
        return {
          history: {
            ...state.history,
            [date]: { ...current, energyAudits: [...current.energyAudits, newAudit] }
          }
        };
      }),
      updateJournal: (type, key, text) => set((state) => {
        if (type === 'patterns' || type === 'circle' || type === 'narrative') {
          return { journals: { ...state.journals, [type]: text } };
        }
        return {
          journals: {
            ...state.journals,
            [type]: { ...((state.journals[type] as any) || {}), [key]: text }
          }
        };
      }),
      updateNarrative: (text) => set((state) => ({
        journals: { ...state.journals, narrative: text }
      })),
      setNotificationTime: (time) => set({ notificationTime: time }),
      addWarningSign: (sign) => set((state) => ({ warningSigns: [...state.warningSigns, sign] })),
      updateStreak: (date) => set((state) => {
        const { lastOpen, currentStreak, longestStreak } = state.streak;
        if (lastOpen === date) return state;
        let newStreak = 1;
        if (lastOpen) {
          const lastDate = new Date(lastOpen);
          const currDate = new Date(date);
          const diffDays = Math.floor((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
          if (diffDays === 1) newStreak = currentStreak + 1;
        }
        return {
          streak: {
            lastOpen: date,
            currentStreak: newStreak,
            longestStreak: Math.max(longestStreak, newStreak)
          }
        };
      }),
      updateLedger: (quarter, data) => set((state) => ({
        ledger: { ...state.ledger, [quarter]: { ...(state.ledger[quarter] || { capacityEvidence: {}, capacityStatus: {}, costs: {}, worthBeliefs: [], worthOrigin: '' }), ...data } }
      })),
    }),
    { name: 'assata-storage-v2' }
  )
);