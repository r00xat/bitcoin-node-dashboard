import {
   formatLargeNumber,
   formatBytes,
   formatSeconds,
   formatUnixToTimeAgo,
   capitalizeFirst,
   formatHashPerSecond,
   compactNumber
} from '@/utils/utils';

import {
   FaIdCard,
   FaArrowRightArrowLeft,
   FaNetworkWired,
   FaClock,
   FaBullhorn,
   FaLink,
   FaHardDrive,
   FaMicrochip,
   FaGears,
   FaCube
} from 'react-icons/fa6';

import Header from './Header';
import StatsCard, { StatsList } from '@/components/StatsCard';
import TopClientsChart from './TopClientsChart';
import Card from '@/components/UI/Card';
import useRefreshData from '@/hooks/useRefreshData';
import { useHomeStore } from '@/store/homeStore';


const Home = () => {
   const homeStore = useHomeStore();      

   useRefreshData([homeStore]);

   const nodeStats: StatsList[] = [
      {
         icon: <FaIdCard />,
         name: 'Client',
         value: homeStore.node.client
      },
      {
         icon: <FaArrowRightArrowLeft />,
         name: 'Protocol',
         value: homeStore.node.protocolVersion
      },
      {
         icon: <FaNetworkWired />,
         name: 'Port',
         value: homeStore.node.port
      },
      {
         icon: <FaClock />,
         name: 'Uptime',
         value: formatSeconds(homeStore.node.uptime)
      },
      {
         icon: <FaBullhorn />,
         name: 'Services',
         value: homeStore.node.services
      }
   ];

   const blockchainStats: StatsList[] = [
      {
         icon: <FaLink />,
         name: 'Chain',
         value: capitalizeFirst(homeStore.blockchain.chain)
      },
      {
         icon: <FaHardDrive />,
         name: 'Size',
         value: formatBytes(homeStore.blockchain.size)
      },
      {
         icon: <FaMicrochip />,
         name: 'Difficulty',
         value: compactNumber(homeStore.blockchain.difficulty)
      },
      {
         icon: <FaGears />,
         name: 'Hashrate',
         value: formatHashPerSecond(homeStore.blockchain.hashRate)
      },
      {
         icon: <FaCube />,
         name: 'Last Block',
         value: formatLargeNumber(homeStore.blockchain.lastBlock)
      },
      {
         icon: <FaClock />,
         name: 'Last Block Time',
         value: formatUnixToTimeAgo(homeStore.blockchain.lastBlockTime)
      }
   ];

   const networkStats: StatsList[] = [
      {
         icon: null,
         name: 'IPv4',
         value: homeStore.networkInfo.networks.ipv4.available
      },
      {
         icon: null,
         name: 'IPv6',
         value: homeStore.networkInfo.networks.ipv6.available
      },
      {
         icon: null,
         name: 'Tor',
         value: homeStore.networkInfo.networks.tor.available
      },
      {
         icon: null,
         name: 'Traffic Limit Set',
         value: homeStore.networkInfo.uploadTarget.target > 0
      },
      {
         icon: null,
         name: 'Traffic Limited',
         value: homeStore.networkInfo.uploadTarget.targetReached
      }
   ];

   return (
      <>
         <Header 
            totalConnections={homeStore.main.totalConnections} 
            totalUploadTraffic={homeStore.main.totalUploadTraffic} 
            totalDownloadTraffic={homeStore.main.totalDownloadTraffic} 
            txInMeempool={homeStore.main.txInMeempool}
         />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-3 mt-7">
            <StatsCard title="Node" statsList={nodeStats} loading={homeStore.loading} />
            <StatsCard title="Blockchain" statsList={blockchainStats} loading={homeStore.loading} />
            <StatsCard title="Network" statsList={networkStats} loading={homeStore.loading} />
            <Card title="Top Peer Clients" className="col-span-1 md:col-span-2">
               <TopClientsChart peers={homeStore.peers}/>
            </Card>
         </div>
      </>
   );
};

export default Home;
