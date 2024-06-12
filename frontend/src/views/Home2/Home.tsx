import { useEffect } from 'react';
import { formatLargeNumber, formatBytes, formatSeconds, capitalizeFirst, formatHashPerSecond, compactNumber } from '@/utils/utils';
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

import './Home.scss';
import Header from './Header';
import StatsCard, { StatsList } from '@/components/UI/StatsCard';

const Home = () => {
   const nodeStore = useNodeStore();
   const blockchainStore = useBlockchainStore();

   useEffect(() => {
      nodeStore.fetch();
      blockchainStore.fetch();
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
         value: formatLargeNumber(800000)
      },
      {
         icon: <FaClock />,
         name: 'Last Block Time',
         value: formatSeconds(nodeStore.uptime) + ' ago'
      }
   ];

   const networkStats: StatsList[] = [
      {
         icon: null,
         name: 'IPv4',
         value: true
      },
      {
         icon: null,
         name: 'IPv6',
         value: true
      },
      {
         icon: null,
         name: 'Tor',
         value: false
      },
      {
         icon: null,
         name: 'Traffic Limit Set',
         value: false
      },
      {
         icon: null,
         name: 'Traffic Limited',
         value: false
      }
   ];

   return (
      <>
         <Header />
         <br />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-3">
            <StatsCard title="Node" statsList={nodeStats}/>
            <StatsCard title="Blockchain" statsList={blockchainStats} />
            <StatsCard title="Network" statsList={networkStats} />
         </div>
         d
      </>
   );
};

export default Home;
