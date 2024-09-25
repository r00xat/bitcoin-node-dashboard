import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type RefreshStore = {
   refreshTime: number;
   setrefreshTime: (time: number) => void;
}

export const useRefreshStore = create<RefreshStore>()(
   devtools((set) => ({
      refreshTime: 15000,
      setrefreshTime: (time: number) => set({refreshTime: time})
   }))
)