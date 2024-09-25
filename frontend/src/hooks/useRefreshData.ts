import { useRefreshStore } from "@/store/refreshStore";
import { IBaseApiStore } from "@/store/types";
import { useEffect } from "react";

export default function useRefreshData<T extends IBaseApiStore>(stores: T[]) {

   const refreshStore = useRefreshStore();

   const refreshStores = () => {
      stores.forEach((store) => {
         if (!store.fetch) return;
         store.fetch();
      });
   };

   useEffect(() => {
      refreshStores();
   } , [refreshStore.refresh]);

   useEffect(() => {
      if (refreshStore.refreshTime <= 0) return;

      refreshStores();

      const interval = setInterval(() => {
         refreshStores();
      }, refreshStore.refreshTime);

      return () => {
         clearInterval(interval);
      }
   }, [refreshStore.refreshTime]);

   return refreshStores;
}