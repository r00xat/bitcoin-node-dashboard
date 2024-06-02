import { useEffect } from 'react';
import { formatLargeNumber, formatBytes, formatSeconds } from '@/utils/utils';
import {
   FaCircleNodes,
   FaCloudArrowDown,
   FaCloudArrowUp,
   FaDatabase,
   FaIdCard,
   FaArrowRightArrowLeft,
   FaNetworkWired,
   FaClock,
   FaBullhorn
} from 'react-icons/fa6';
import { useMainStore } from '@/store/mainStore';
import { useNodeStore } from '@/store/nodeStore';

import './Home.scss';

const Home = () => {
   const mainStore = useMainStore();
   const nodeStore = useNodeStore();

   useEffect(() => {
      mainStore.fetch();
      nodeStore.fetch();
   }, []);

   return (
      <>
         <div className="container-fluid">
            <div className="row">
               <div className="col-12 col-sm-6 col-xl-3 p-0 content-wrapper">
                  <div className="content main-stat">
                     <div className="icon-wrapper">
                        <FaCircleNodes size={70} color="#36a3f7" />
                     </div>
                     <div className="main-stat-description">
                        <div className="main-stat-title">Total Connections</div>
                        <div className="main-stat-value">
                           {formatLargeNumber(mainStore.totalConnections)}
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-12 col-sm-6 col-xl-3 p-0 content-wrapper">
                  <div className="content main-stat">
                     <div className="icon-wrapper">
                        <FaCloudArrowUp size={70} color="#f4516c" />
                     </div>
                     <div className="main-stat-description">
                        <div className="main-stat-title">Upload Traffic</div>
                        <div className="main-stat-value">
                           {formatBytes(mainStore.totalUploadTraffic)}
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-12 col-sm-6 col-xl-3 p-0 content-wrapper">
                  <div className="content main-stat">
                     <div className="icon-wrapper">
                        <FaCloudArrowDown size={70} color="#34bfa3" />
                     </div>
                     <div className="main-stat-description">
                        <div className="main-stat-title">Download Traffic</div>
                        <div className="main-stat-value">
                           {formatBytes(mainStore.totalDownloadTraffic)}
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-12 col-sm-6 col-xl-3 p-0 content-wrapper">
                  <div className="content main-stat">
                     <div className="icon-wrapper">
                        <FaDatabase size={70} color="#ffcb8c" />
                     </div>
                     <div className="main-stat-description">
                        <div className="main-stat-title">TX in Mempool</div>
                        <div className="main-stat-value">
                           {formatLargeNumber(mainStore.txInMeempool)}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="container-fluid">
            <div className="row">
               <div className="col-12 p-0 content-wrapper">
                  <div className="content custom-card">
                     <div className="custom-card-title">Node</div>
                     <hr className='m-2' />
                     <div className="custom-card-body">
                        <ul className="list-unstyled">
                           <li>
                              <div className="d-flex align-items-center justify-content-between">
                                 <div>
                                    <FaIdCard className="me-1" />
                                    <span className="fw-semibold">Client</span>
                                 </div>
                                 <span className="float-end">{nodeStore.client}</span>
                              </div>
                           </li>
                           <li>
                              <div className="d-flex align-items-center justify-content-between">
                                 <div>
                                    <FaArrowRightArrowLeft className="me-1" />
                                    <span className="fw-semibold">Protocol</span>
                                 </div>
                                 <span className="float-end">{nodeStore.protocolVersion}</span>
                              </div>
                           </li>
                           <li>
                              <div className="d-flex align-items-center justify-content-between">
                                 <div>
                                    <FaNetworkWired className="me-1" />
                                    <span className="fw-semibold">Port</span>
                                 </div>
                                 <span className="float-end">{nodeStore.port}</span>
                              </div>
                           </li>
                           <li>
                              <div className="d-flex align-items-center justify-content-between">
                                 <div>
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
                                 <span className="float-end d-flex flex-wrap justify-content-flex-end">
                                    <span className="badge bg-secondary ms-1 my-1">
                                       NETWORK
                                    </span>
                                    <span className="badge bg-secondary ms-1 my-1">
                                       BLOOM
                                    </span>
                                    <span className="badge bg-secondary ms-1 my-1">
                                       WITNESS
                                    </span>
                                    <span className="badge bg-secondary ms-1 my-1">
                                       NETWORK_LIMITED
                                    </span>
                                 </span>
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
