import { useEffect } from 'react';
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
import { useNodeStore } from '@/store/nodeStore';
import { useBlockchainStore } from '@/store/blockchainStore';
import { useNetworkStore } from '@/store/networkStore';

import Header from './Header';
import StatsCard, { StatsList } from '@/components/StatsCard';
import TopClientsChart from './TopClientsChart';

const Home = () => {
   const nodeStore = useNodeStore();
   const blockchainStore = useBlockchainStore();
   const networkStore = useNetworkStore();

   useEffect(() => {
      nodeStore.fetch();
      blockchainStore.fetch();
      networkStore.fetch();
   }, []);

   const nodeStats: StatsList[] = [
      {
         icon: <FaIdCard />,
         name: 'Client',
         value: nodeStore.client
      },
      {
         icon: <FaArrowRightArrowLeft />,
         name: 'Protocol',
         value: nodeStore.protocolVersion
      },
      {
         icon: <FaNetworkWired />,
         name: 'Port',
         value: nodeStore.port
      },
      {
         icon: <FaClock />,
         name: 'Uptime',
         value: formatSeconds(nodeStore.uptime)
      },
      {
         icon: <FaBullhorn />,
         name: 'Services',
         value: nodeStore.services
      }
   ];

   const blockchainStats: StatsList[] = [
      {
         icon: <FaLink />,
         name: 'Chain',
         value: capitalizeFirst(blockchainStore.chain)
      },
      {
         icon: <FaHardDrive />,
         name: 'Size',
         value: formatBytes(blockchainStore.size)
      },
      {
         icon: <FaMicrochip />,
         name: 'Difficulty',
         value: compactNumber(blockchainStore.difficulty)
      },
      {
         icon: <FaGears />,
         name: 'Hashrate',
         value: formatHashPerSecond(blockchainStore.hashRate)
      },
      {
         icon: <FaCube />,
         name: 'Last Block',
         value: formatLargeNumber(blockchainStore.lastBlock)
      },
      {
         icon: <FaClock />,
         name: 'Last Block Time',
         value: formatUnixToTimeAgo(blockchainStore.lastBlockTime)
      }
   ];

   const networkStats: StatsList[] = [
      {
         icon: null,
         name: 'IPv4',
         value: networkStore.networks.ipv4.available
      },
      {
         icon: null,
         name: 'IPv6',
         value: networkStore.networks.ipv6.available
      },
      {
         icon: null,
         name: 'Tor',
         value: networkStore.networks.tor.available
      },
      {
         icon: null,
         name: 'Traffic Limit Set',
         value: networkStore.uploadTarget.target > 0
      },
      {
         icon: null,
         name: 'Traffic Limited',
         value: networkStore.uploadTarget.targetReached
      }
   ];

   return (
      <>
         <Header />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-3 mt-7">
            <StatsCard title="Node" statsList={nodeStats} loading={nodeStore.loading} />
            <StatsCard title="Blockchain" statsList={blockchainStats} loading={blockchainStore.loading} />
            <StatsCard title="Network" statsList={networkStats} loading={networkStore.loading} />
            <div className="col-span-1 md:col-span-2 bg-white rounded-md p-5">
               <TopClientsChart />
            </div>
         </div>
      </>
   );
};

export default Home;
