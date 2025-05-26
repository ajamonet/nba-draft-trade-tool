import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TradeState = {
  teamA: string;
  teamB: string;
  picksA: string[];
  picksB: string[];
  setTeamA: (team: string) => void;
  setTeamB: (team: string) => void;
  togglePickA: (pick: string) => void;
  togglePickB: (pick: string) => void;
};

export const useTradeStore = create<TradeState>()(
  persist(
    (set) => ({
      teamA: 'Los Angeles Lakers',
      teamB: 'Boston Celtics',
      picksA: [],
      picksB: [],
      setTeamA: (team) => set({ teamA: team }),
      setTeamB: (team) => set({ teamB: team }),
      togglePickA: (pick) =>
        set((state) => ({
          picksA: state.picksA.includes(pick)
            ? state.picksA.filter((p) => p !== pick)
            : [...state.picksA, pick],
        })),
      togglePickB: (pick) =>
        set((state) => ({
          picksB: state.picksB.includes(pick)
            ? state.picksB.filter((p) => p !== pick)
            : [...state.picksB, pick],
        })),
    }),
    {
      name: 'nba-trade-tool', 
    }
  )
);
