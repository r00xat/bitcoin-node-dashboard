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

const Home = () => {
   const nodeStore = useNodeStore();
   const blockchainStore = useBlockchainStore();

   useEffect(() => {
      nodeStore.fetch();
      blockchainStore.fetch();   
   }, []);

   return (
      <>
         <Header/>
         <br/>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-3">
            <div className="bg-white rounded-md p-5">
               <h1 className="text-2xl font-semibold text-center mb-2">
                  Node
               </h1>
               <hr />
               <ul className="mt-2">
                  <li>
                     <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                           <FaIdCard className="me-1" />
                           <span>
                              Client
                           </span>
                        </div>
                        <span>
                           { nodeStore.client }
                        </span>
                     </div>
                  </li>
                  <li>
                     <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                           <FaArrowRightArrowLeft className="me-1" />
                           <span>
                              Protocol
                           </span>
                        </div>
                        <span>
                           { nodeStore.protocolVersion }
                        </span>
                     </div>
                  </li>
                  <li>
                     <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                           <FaNetworkWired className="me-1" />
                           <span>
                              Port
                           </span>
                        </div>
                        <span>
                           { nodeStore.port }
                        </span>
                     </div>
                  </li>
                  <li>
                     <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                           <FaClock className="me-1" />
                           <span>
                              Uptime
                           </span>
                        </div>
                        <span>
                           { formatSeconds(nodeStore.uptime) }
                        </span>
                     </div>
                  </li>
                  <li>
                     <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                           <FaBullhorn className="me-1" />
                           <span>
                              Services
                           </span>
                        </div>
                        <span className="max-w-80 flex flex-wrap justify-content-flex-end flex-row-reverse">
                           {
                              nodeStore.services.map((service, i) => {
                                 return (
                                    <span 
                                       key={i} 
                                       className="m-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                                    >
                                       { service }
                                    </span>
                                 );
                              })
                           }
                        </span>
                     </div>
                  </li>
               </ul>
            </div>
            <div className=" bg-white rounded-md p-5">
               <h1 className="text-2xl font-semibold text-center mb-2">
                  Blockchain
               </h1>
               <hr/>
               <ul className="mt-2">
                  <li>
                     <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                           <FaLink className="me-1" />
                           <span>
                              Chain
                           </span>
                        </div>
                        <span>
                           { capitalizeFirst(blockchainStore.chain) }
                        </span>
                     </div>
                  </li>
                  <li>
                     <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                           <FaHardDrive className="me-1" />
                           <span>
                              Size
                           </span>
                        </div>
                        <span>
                           { formatBytes(blockchainStore.size) }
                        </span>
                     </div>
                  </li>
                  <li>
                     <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                           <FaMicrochip className="me-1" />
                           <span>
                              Difficulty
                           </span>
                        </div>
                        <span>
                           { compactNumber(blockchainStore.difficulty) }
                        </span>
                     </div>
                  </li>
                  <li>
                     <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                           <FaGears className="me-1" />
                           <span>
                              Hashrate
                           </span>
                        </div>
                        <span>
                           { formatHashPerSecond(blockchainStore.hashRate) }
                        </span>
                     </div>
                  </li>
                  <li>
                     <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                           <FaCube className="me-1" />
                           <span>
                              Last Block
                           </span>
                        </div>
                        <span>
                           { formatLargeNumber(800000) }
                        </span>
                     </div>
                  </li>
                  <li>
                     <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                           <FaClock className="me-1" />
                           <span>
                              Last Block Time
                           </span>
                        </div>
                        <span>
                           { formatSeconds(nodeStore.uptime) + ' ago'}
                        </span>
                     </div>
                  </li>
               </ul>              
            </div>
            <div className=" bg-white rounded-md p-5">
               <h1 className="text-2xl font-semibold text-center mb-2">
                  Network
               </h1>
               <hr/>
               <ul className="mt-2">
                  <li>
                     <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                           <span>
                              IPv4
                           </span>
                        </div>
                        <span 
                           className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                        >
                           enabled
                        </span>
                     </div>
                  </li>
                  <li>
                     <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                           <span>
                              IPv6
                           </span>
                        </div>
                        <span 
                           className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                        >
                           enabled
                        </span>
                     </div>
                  </li>
                  <li>
                     <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                           <span>
                              Tor
                           </span>
                        </div>
                        <span 
                           className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                        >
                           disabled
                        </span>
                     </div>
                  </li>
                  <li>
                     <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                           <span>
                              Traffic Limit Set
                           </span>
                        </div>
                        <span 
                           className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                        >
                           disabled
                        </span>
                     </div>
                  </li>
                  <li>
                     <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                           <span>
                              Traffic Limited
                           </span>
                        </div>
                        <span 
                           className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                        >
                           disabled
                        </span>
                     </div>
                  </li>
               </ul>
            </div>
         </div>
         d
      </>
   );
};

export default Home;
