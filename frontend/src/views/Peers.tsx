import Card from "@/components/UI/Card";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { usePeerStore } from "@/store/peerStore";
import { formatBytes, formatUnixTime } from "@/utils/utils";
import { useEffect, useState } from "react";
import clsx from "clsx";
import React from "react";

function Peers() {
   const [sortField, setSortField] = useState("Services");
   const [order, setOrder] = useState("asc");
   
   const peerStore = usePeerStore();

   const tableFields = [{
      name: 'Id',
      key: 'id'
   }, {
      name: 'Address',
      key: 'address'
   }, {
      name: 'Inbound',
      key: 'inbound'
   }, {
      name: 'Services',
      key: 'services'
   }, {
      name: 'Age',
      key: 'conectionTime'
   }, {
      name: 'Client',
      key: 'subversion'
   }, {
      name: 'Total Traffic',
      key: 'totalbytes'
   }];

   useEffect(() => {
      peerStore.fetch();
   }, []);

   useEffect(() => {
      peerStore.sortPeers(sortField, order);
   }, [sortField, order]);


   function formatServices(services: string[]): React.ReactNode {
      if (services.length === 0) {
         services = ['None'];
      }
      return services.map((service, index) => {
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
            <React.Fragment key={index}>
               <span
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
            </React.Fragment>
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
                                 {tableFields.map((field) => (
                                    <th
                                       key={field.key}
                                       className="py-2.5 cursor-pointer"
                                       onClick={() => {
                                          if (sortField === field.key) {
                                             setOrder(order === 'asc' ? 'desc' : 'asc');
                                          } else {
                                             setSortField(field.key);
                                             setOrder('asc');
                                          }
                                       }}
                                    >
                                       <div className="flex justify-center items-center">
                                          {field.name}
                                          <span className="ml-1 flex flex-col text-gray-400">
                                             <TiArrowSortedUp className={clsx({ "text-black": (sortField === field.key && order != 'asc') })}/>
                                             <TiArrowSortedDown className={clsx({ "text-black": (sortField === field.key && order == 'asc') })}/>
                                          </span>
                                       </div>
                                    </th>
                                 ))}
                              </tr>
                           </thead>
                           <tbody>
                              {peerStore.peers.map((peer) => (
                                 <tr key={peer.id} className="border-b last:border-0 hover:bg-gray-100 text-center odd:bg-gray-50">
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
