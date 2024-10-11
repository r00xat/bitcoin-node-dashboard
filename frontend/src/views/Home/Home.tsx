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
   FaCube,
   FaCircleNodes,
   FaCloudArrowDown,
   FaCloudArrowUp,
   FaDatabase
} from 'react-icons/fa6';

import StatsCard from '@/components/StatsCard';
import TopClientsChart from './TopClientsChart';
import Card from '@/components/UI/Card';
import useRefreshData from '@/hooks/useRefreshData';
import { useHomeStore } from '@/store/homeStore';
import Header from '@/components/Header';


const Home = () => {
   const homeStore = useHomeStore();

   useRefreshData([homeStore]);

   return (
      <>
         <Header
            loading={homeStore.loading}
            data={[
               {
                  icon: <FaCircleNodes size={70} color="#36a3f7" />,
                  title: "Total Connections",
                  value: formatLargeNumber(homeStore.main.totalConnections)
               },
               {
                  icon: <FaCloudArrowUp size={70} color="#f4516c" />,
                  title: "Upload Traffic",
                  value: formatBytes(homeStore.main.totalUploadTraffic)
               },
               {
                  icon: <FaCloudArrowDown size={70} color="#34bfa3" />,
                  title: "Download Traffic",
                  value: formatBytes(homeStore.main.totalDownloadTraffic)
               },
               {
                  icon: <FaDatabase size={70} color="#ffcb8c" />,
                  title: "TX in Mempool",
                  value: formatLargeNumber(homeStore.main.txInMeempool)
               }
            ]}
         />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-3 mt-7">
            <StatsCard
               title="Node"
               loading={homeStore.loading}
               statsList={[
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
               ]}
            />
            <StatsCard
               title="Blockchain"
               loading={homeStore.loading}
               statsList={[
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
               ]}
            />
            <StatsCard
               title="Network"
               loading={homeStore.loading}
               statsList={[
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
               ]}
            />
            <Card title="Top Peer Clients" className="col-span-1 md:col-span-2">
               <TopClientsChart peers={homeStore.peers} />
            </Card>
         </div>
      </>
   );
};

export default Home;
