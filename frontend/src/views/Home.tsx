import MainStats from '@/components/MainStats';
import Card from '@/components/UI/Card';
import { useMainStore } from '@/store/mainStore';
import { useEffect } from 'react';

const Home = () => {

   const mainStore = useMainStore();

   useEffect(() => {
      mainStore.fetch();
   }, []);

   return (
      <div className="container">
         <MainStats
            totalConnections={mainStore.totalConnections}
            totalUploadTraffic={mainStore.totalUploadTraffic}
            totalDownloadTraffic={mainStore.totalDownloadTraffic}
            bannedPeers={mainStore.bannedPeers}
            txInMeempool={mainStore.txInMeempool}
            latestBlock={mainStore.latestBlock}
         />
         <div className="container mt-2">
            <div className="row gap-3">
               <Card title="Title">
                  <p>Card 1</p>
               </Card>
               <Card>
                  <p>Card 2</p>
               </Card>
               <Card>
                  <p>Card 3</p>
               </Card>
            </div>
         </div>
      </div>
   );
};

export default Home;
