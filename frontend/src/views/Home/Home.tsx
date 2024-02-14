import { useEffect } from 'react';
import { formatSeconds, formatBytes, capitalizeFirst, compactNumber, formatHashPerSecond } from "@/utils/utils";
import Card from '@/components/UI/Card';
import MainStats from '@/components/MainStats';
import { useMainStore } from '@/store/mainStore';
import { useNodeStore } from '@/store/nodeStore';
import { useBlockchainStore } from '@/store/blockchainStore';
import { Tooltip } from 'bootstrap';
import clsx from 'clsx';
import TopPeerClients from './TopPeerClients';

const Home = () => {

   const mainStore = useMainStore();
   const nodeStore = useNodeStore();
   const blockchainStore = useBlockchainStore();

   const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
   [...tooltipTriggerList].map(tooltip => new Tooltip(tooltip));

   useEffect(() => {
      mainStore.fetch();
      nodeStore.fetch();
      blockchainStore.fetch();   
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
         <div className="container-fluid mt-2 p-0">
            <div className="row">
               <Card title="Node" className="col-12 col-lg-4 h-100 mb-3">
                  <ul className="list-unstyled lh-lg">
                     <li>
                        <span className='fw-bold'>Client</span>
                        <span className='float-end'>{nodeStore.client}</span>
                     </li>
                     <li>
                        <span className='fw-bold'>Protocol</span>
                        <span className='float-end'>{nodeStore.protocolVersion}</span>
                     </li>
                     <li>
                        <span className='fw-bold'>Port</span>
                        <span className='float-end'>{nodeStore.port}</span>
                     </li>
                     <li>
                        <span className='fw-bold'>Services</span>
                        <ul className="list-unstyled list-inline lh-base ms-4">
                           {
                              nodeStore.services.map((service, i) => {
                                 return (
                                    <li key={i} className="list-inline-item">
                                       <span className='badge bg-secondary'>{service}</span>
                                    </li>
                                 )
                              })
                           }
                        </ul>
                     </li>
                     <li>
                        <span className='fw-bold'>Uptime</span>
                        <span className='float-end'>{formatSeconds(nodeStore.uptime)}</span>
                     </li>
                     <li>
                        <span className='fw-bold'>IPv4</span>
                        <span className={clsx('float-end', nodeStore.networks.ipv4.address && 'text-decoration-underline')}
                           data-bs-toggle={nodeStore.networks.ipv4.address ? 'tooltip' : undefined}
                           data-bs-placement="top"
                           data-bs-title={nodeStore.networks.ipv4.address}
                           role={nodeStore.networks.ipv4.address ? 'button' : undefined}>
                           {nodeStore.networks.ipv4 ? 'Yes' : 'No'}
                        </span>
                     </li>
                     <li>
                        <span className='fw-bold'>IPv6</span>
                        <span className={clsx('float-end', nodeStore.networks.ipv6.address && 'text-decoration-underline')}
                           data-bs-toggle={nodeStore.networks.ipv6.address ? 'tooltip' : undefined}
                           data-bs-placement="top"
                           data-bs-title={nodeStore.networks.ipv6.address}
                           role={nodeStore.networks.ipv6.address ? 'button' : undefined}>
                           {nodeStore.networks.ipv6 ? 'Yes' : 'No'}
                        </span>
                     </li>
                     <li>
                        <span className='fw-bold'>Tor</span>
                        <span className={clsx('float-end', nodeStore.networks.tor.address && 'text-decoration-underline')}
                           data-bs-toggle={nodeStore.networks.tor.address ? 'tooltip' : undefined}
                           data-bs-placement="top"
                           data-bs-title={nodeStore.networks.tor.address}
                           role={nodeStore.networks.tor.address ? 'button' : undefined}>
                           {nodeStore.networks.tor ? 'Yes' : 'No'}
                        </span>
                     </li>
                     <li>
                        <span className='fw-bold'>I2P</span>
                        <span className={clsx('float-end', nodeStore.networks.i2p.address && 'text-decoration-underline')}
                           data-bs-toggle={nodeStore.networks.i2p.address ? 'tooltip' : undefined}
                           data-bs-placement="top"
                           data-bs-title={nodeStore.networks.i2p.address}
                           role={nodeStore.networks.i2p.address ? 'button' : undefined}>
                           {nodeStore.networks.i2p ? 'Yes' : 'No'}
                        </span>
                     </li>
                     <li>
                        <span className='fw-bold'>Cjdns</span>
                        <span className='float-end'>{nodeStore.networks.cjdns ? 'Yes' : 'No'}</span>
                     </li>
                  </ul>
               </Card>
               <Card title="Blockchain" className="col-12 col-lg-4 h-100 mb-3">
                  <ul className="list-unstyled lh-lg">
                     <li>
                        <span className="fw-bold">Chain</span>
                        <span className="float-end">{capitalizeFirst(blockchainStore.chain)}</span>
                     </li>
                     <li>
                        <span className="fw-bold">Size</span>
                        <span className="float-end">{formatBytes(blockchainStore.size)}</span>
                     </li>
                     <li>
                        <span className="fw-bold">Difficulty</span>
                        <span className="float-end">{compactNumber(blockchainStore.difficulty)}</span>
                     </li>
                     <li>
                        <span className="fw-bold">Hashrate</span>
                        <span className="float-end">{formatHashPerSecond(blockchainStore.hashRate)}</span>
                     </li>
                  </ul>
               </Card>
               <Card title="Top Peer Clients" className="col-12 col-lg-4 h-100 mb-3">
                  <TopPeerClients/>
               </Card>
            </div>
         </div>
      </div>
   );
};

export default Home;
