import Card from "@/components/UI/Card";
import { usePeerStore } from "@/store/peerStore";
import { formatBytes, formatUnixTime } from "@/utils/utils";
import { useEffect } from "react";

function Peers() {

   const peerStore = usePeerStore();

   useEffect(() => {
      peerStore.fetch();
   }, []);


   function formatServices(services: string[]): React.ReactNode {
      if (services.length === 0) {
         services = ['None'];
      }
      return services.map((service) => {
         let tooltip = '';
         if (service === 'NETWORK') {
            service = 'N';
            tooltip = 'Network';
         } else if (service === 'BLOOM') {
            service = 'B';
            tooltip = 'Bloom';
         } else if (service === 'WITNESS') {
            service = 'W';
            tooltip = 'Witness';
         } else if (service === 'COMPACT_FILTERS') {
            service = 'CF';
            tooltip = 'Compact Filters';
         } else if (service === 'NETWORK_LIMITED') {
            service = 'NL';
            tooltip = 'Network Limited';
         } else if (service.match(/^UNKNOWN/)) {
            tooltip = service;
            service = 'U';
         }

         return (
            <>
               <span
                  key={service}
                  className="group relative m-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 cursor-pointer"
               >
                  {service}
                  {
                     tooltip && (<span
                        className="pointer-events-none absolute -top-10 -left-2/4 w-max opacity-0 transition-opacity group-hover:opacity-100 rounded-md p-2 bg-gray-900 text-white"
                     >
                        {tooltip}
                     </span>)
                  }
               </span>
            </>
         );
      });
   }

   return (
      <div className="m-3 mt-7">
         <Card>
            <div className="flex flex-col">
               <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                     <div className="border rounded-lg overflow-hidden">
                        <table className="rounded-sm border-collapse table-auto w-full ">
                           <thead className="bg-gray-200 rounded-2xl border-b">
                              <tr>
                                 <th className="py-2">Id</th>
                                 <th>Address</th>
                                 <th>Inbound</th>
                                 <th>Services</th>
                                 <th>Age</th>
                                 <th>Client</th>
                                 <th>Total Traffic</th>
                              </tr>
                           </thead>
                           <tbody>
                              {peerStore.peers.map((peer, index) => (
                                 <tr key={index} className="border-b last:border-0 hover:bg-gray-100 text-center odd:bg-gray-50">
                                    <td className="py-2.5">
                                       {peer.id}
                                    </td>
                                    <td>
                                       {peer.address.split(':')[0]}
                                    </td>
                                    <td>
                                       {peer.inbound ? "Yes" : "No"}
                                    </td>
                                    <td className="flex flex-wrap justify-center items-center py-2.5">
                                       {formatServices(peer.services)}
                                    </td>
                                    <td>
                                       {formatUnixTime(peer.conectionTime)}
                                    </td>
                                    <td>
                                       {peer.subversion}</td>
                                    <td>
                                       {formatBytes(peer.bytessent + peer.bytesrecv)}
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </Card>
      </div>
   );
}

export default Peers;
