import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type RefreshStore = {
   refreshTime: number;
   setRefreshTime: (time: number) => void;
   refresh: boolean;
   triggerRefresh: () => void;
}

export const useRefreshStore = create<RefreshStore>()(
   devtools(
      persist(
         (set) => ({
            refreshTime: 15000,
            setRefreshTime: (time: number) => set({ refreshTime: time }),
            refresh: false,
            triggerRefresh: () => set((state) => ({ refresh: !state.refresh }))
         }),
         {
            name: 'refreshTime',
            partialize: (state) => ({ refreshTime: state.refreshTime }),
         }
      )
   )
);