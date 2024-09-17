import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ApiStore = {
   refreshTime: number;
   setrefreshTime: (time: number) => void;
}

export const useApiStore = create<ApiStore>()(
   devtools((set) => ({
      refreshTime: 15000,
      setrefreshTime: (time: number) => set({refreshTime: time})
   }))
)