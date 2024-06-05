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
         <div className="container-fluid">
            <div className="row">
               <div className="col-12 col-md-3 p-0 content-wrapper">
                  <div className="content custom-card">
                     <div className="custom-card-title">
                        Node
                     </div>
                     <hr className='m-2 mx-0'/>
                     <div className="custom-card-body">
                        <ul className="list-unstyled m-0">
                           <li>
                              <div className="d-flex align-items-center justify-content-between">
                                 <div className='d-flex align-items-center'>
                                    <FaIdCard className="me-1" />
                                    <span className="fw-semibold">Client</span>
                                 </div>
                                 <span className="float-end">{nodeStore.client}</span>
                              </div>
                           </li>
                           <li>
                              <div className="d-flex align-items-center justify-content-between">
                                 <div className='d-flex align-items-center'>
                                    <FaArrowRightArrowLeft className="me-1" />
                                    <span className="fw-semibold">Protocol</span>
                                 </div>
                                 <span className="float-end">{nodeStore.protocolVersion}</span>
                              </div>
                           </li>
                           <li>
                              <div className="d-flex align-items-center justify-content-between">
                                 <div className='d-flex align-items-center'>
                                    <FaNetworkWired className="me-1" />
                                    <span className="fw-semibold">Port</span>
                                 </div>
                                 <span className="float-end">{nodeStore.port}</span>
                              </div>
                           </li>
                           <li>
                              <div className="d-flex align-items-center justify-content-between">
                                 <div className='d-flex align-items-center'>
                                    <FaClock className="me-1" />
                                    <span className="fw-semibold">Uptime</span>
                                 </div>
                                 <span className="float-end">{formatSeconds(nodeStore.uptime)}</span>
                              </div>
                           </li>
                           <li>
                              <div className="d-flex align-items-center justify-content-between">
                                 <div className="d-flex align-items-center">
                                    <FaBullhorn className="me-1" />
                                    <span className="fw-semibold">Services</span>
                                 </div>
                                 <span className="float-end d-flex flex-wrap justify-content-flex-end flex-row-reverse">
                                    {
                                       nodeStore.services.map((service, i) => {
                                          return (
                                             <span  key={i} className="badge bg-secondary ms-1 my-1">
                                                {service}
                                             </span>
                                          )
                                       })
                                    }
                                 </span>
                              </div>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-3 p-0 content-wrapper">
                  <div className="content custom-card">
                     <div className="custom-card-title">
                        Blockchain
                     </div>
                     <hr className='m-2 mx-0'/>
                     <div className="custom-card-body">
                        <ul className="list-unstyled m-0">
                           <li>
                              <div className="d-flex align-items-center justify-content-between">
                                 <div className='d-flex align-items-center'>
                                    <FaLink className="me-1" />
                                    <span className="fw-semibold">Chain</span>
                                 </div>
                                 <span className="float-end">{capitalizeFirst(blockchainStore.chain)}</span>
                              </div>
                           </li>
                           <li>
                              <div className="d-flex align-items-center justify-content-between">
                                 <div className='d-flex align-items-center'>
                                    <FaHardDrive className="me-1" />
                                    <span className="fw-semibold">Size</span>
                                 </div>
                                 <span className="float-end">{formatBytes(blockchainStore.size)}</span>
                              </div>
                           </li>
                           <li>
                              <div className="d-flex align-items-center justify-content-between">
                                 <div className='d-flex align-items-center'>
                                    <FaMicrochip className="me-1" />
                                    <span className="fw-semibold">Difficulty</span>
                                 </div>
                                 <span className="float-end">{compactNumber(blockchainStore.difficulty)}</span>
                              </div>
                           </li>
                           <li>
                              <div className="d-flex align-items-center justify-content-between">
                                 <div className='d-flex align-items-center'>
                                    <FaGears className="me-1" />
                                    <span className="fw-semibold">Hashrate</span>
                                 </div>
                                 <span className="float-end">{formatHashPerSecond(blockchainStore.hashRate)}</span>
                              </div>
                           </li>
                           <li>
                              <div className="d-flex align-items-center justify-content-between">
                                 <div className='d-flex align-items-center'>
                                    <FaCube className="me-1" />
                                    <span className="fw-semibold">Last Block</span>
                                 </div>
                                 <span className="float-end">{formatLargeNumber(800000)}</span>
                              </div>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Home;
