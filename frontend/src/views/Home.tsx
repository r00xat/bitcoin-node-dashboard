import { useEffect } from 'react';
import { formatSeconds } from "@/utils/utils";
import Card from '@/components/UI/Card';
import MainStats from '@/components/MainStats';
import { useMainStore } from '@/store/mainStore';
import { useNodeStore } from '@/store/nodeStore';
import { Tooltip } from 'bootstrap';
import clsx from 'clsx';

const Home = () => {

   const mainStore = useMainStore();
   const nodeStore = useNodeStore();

   const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
   const tooltipList = [...tooltipTriggerList].map(tooltip => new Tooltip(tooltip))

   useEffect(() => {
      mainStore.fetch();
      nodeStore.fetch();
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
               <Card title="Node">
                  <table>
                     <tbody>
                        <tr className='lh-lg'>
                           <td className='fw-bold'>Client</td>
                           <td className='float-end'>{nodeStore.client}</td>
                        </tr>
                        <tr className='lh-lg'>
                           <td className='fw-bold'>Protocol</td>
                           <td className='float-end'>{nodeStore.protocolVersion}</td>
                        </tr>
                        <tr className='lh-lg'>
                           <td className='fw-bold'>Port</td>
                           <td className='float-end'>{nodeStore.port}</td>
                        </tr>
                        <tr className='lh-lg'>
                           <td className='fw-bold'>Services</td>
                           <td className='float-end'>
                              {
                                 nodeStore.services.map((service, i) => {
                                    return <span className="float-end badge bg-secondary ms-1 mb-1" key={i}>{service}</span>
                                 })
                              }
                           </td>
                        </tr>
                        <tr className='lh-lg'>
                           <td className='fw-bold'>Uptime</td>
                           <td className='float-end'>{formatSeconds(nodeStore.uptime)}</td>
                        </tr>
                        <tr className='lh-lg'>
                           <td className='fw-bold'>IPv4</td>
                           <td className={clsx('float-end', nodeStore.networks.ipv4.address && 'text-decoration-underline')}
                              data-bs-toggle={nodeStore.networks.ipv4.address ? 'tooltip' : undefined}
                              data-bs-placement="top"
                              data-bs-title={nodeStore.networks.ipv4.address}
                              role={nodeStore.networks.ipv4.address ? 'button' : undefined}>
                              {nodeStore.networks.ipv4 ? 'Yes' : 'No'}
                           </td>
                        </tr>
                        <tr className='lh-lg'>
                           <td className='fw-bold'>IPv6</td>
                           <td className={clsx('float-end', nodeStore.networks.ipv6.address && 'text-decoration-underline')}
                              data-bs-toggle={nodeStore.networks.ipv6.address ? 'tooltip' : undefined}
                              data-bs-placement="top"
                              data-bs-title={nodeStore.networks.ipv6.address}
                              role={nodeStore.networks.ipv6.address ? 'button' : undefined}>
                              {nodeStore.networks.ipv6 ? 'Yes' : 'No'}
                           </td>
                        </tr>
                        <tr className='lh-lg'>
                           <td className='fw-bold'>Tor</td>
                           <td className={clsx('float-end', nodeStore.networks.tor.address && 'text-decoration-underline')}
                              data-bs-toggle={nodeStore.networks.tor.address ? 'tooltip' : undefined}
                              data-bs-placement="top"
                              data-bs-title={nodeStore.networks.tor.address}
                              role={nodeStore.networks.tor.address ? 'button' : undefined}>
                              {nodeStore.networks.tor ? 'Yes' : 'No'}
                           </td>
                        </tr>
                        <tr className='lh-lg'>
                           <td className='fw-bold'>I2P</td>
                           <td className={clsx('float-end', nodeStore.networks.i2p.address && 'text-decoration-underline')}
                              data-bs-toggle={nodeStore.networks.i2p.address ? 'tooltip' : undefined}
                              data-bs-placement="top"
                              data-bs-title={nodeStore.networks.i2p.address}
                              role={nodeStore.networks.i2p.address ? 'button' : undefined}>
                              {nodeStore.networks.i2p ? 'Yes' : 'No'}
                           </td>
                        </tr>
                        <tr className='lh-lg'>
                           <td className='fw-bold'>Cjdns</td>
                           <td className='float-end'>{nodeStore.networks.cjdns ? 'Yes' : 'No'}</td>
                        </tr>
                     </tbody>
                  </table>
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
