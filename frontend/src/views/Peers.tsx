import Card from "@/components/UI/Card";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { usePeerStore } from "@/store/peerStore";
import { formatBytes, formatUnixTime } from "@/utils/utils";
import { useEffect, useState } from "react";
import clsx from "clsx";
import React from "react";
import useRefreshStores from "@/hooks/useRefreshStores";

type TableField = {
   name: string;
   key: string;
   show: 'always' | 'md' | 'lg' | 'xl' | '2xl';
};

function Peers() {
   const [sortField, setSortField] = useState("");
   const [order, setOrder] = useState("");

   const peerStore = usePeerStore();

   useRefreshStores([peerStore]);

   const tableFields: TableField[] = [{
      name: 'Id',
      key: 'id',
      show: 'always'
   }, {
      name: 'Address',
      key: 'address',
      show: 'md'
   }, {
      name: 'Inbound',
      key: 'inbound',
      show: 'always'
   }, {
      name: 'Services',
      key: 'services',
      show: 'md'
   }, {
      name: 'Age',
      key: 'conectionTime',
      show: 'always'
   }, {
      name: 'Client',
      key: 'subversion',
      show: 'md'
   }, {
      name: 'Total Traffic',
      key: 'totalbytes',
      show: 'always'
   }];

   //To get the show property on showOrHideValue function
   const tableFieldsHashMap = new Map(tableFields.map((field) => [field.key, field]));

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
                  className="group relative m-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 cursor-pointer whitespace-nowrap"
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

   function showOrHideValue(fieldName: TableField['key']) {
      const showProperty = tableFieldsHashMap.get(fieldName)?.show;
      return clsx({
        'hidden': showProperty === 'md',
        'md:table-cell': showProperty === 'md',
        'lg:table-cell': showProperty === 'lg',
        'xl:table-cell': showProperty === 'xl',
        '2xl:table-cell': showProperty === '2xl',
      });
    }

   return (
      <Card className="m-3 mt-7" title="Connected Peers">
         <div className="border rounded-lg overflow-hidden text-sm md:text-base">
            <table className="table-auto w-full">
               <thead className="bg-gray-200 rounded-2xl border-b">
                  <tr>
                     {tableFields.map((field) => (
                        <th
                           key={field.key}
                           className={clsx('py-2.5 cursor-pointer', {
                              'hidden': field.show === 'md',
                              'md:table-cell': field.show === 'md',
                              'lg:table-cell': field.show === 'lg',
                              'xl:table-cell': field.show === 'xl',
                              '2xl:table-cell': field.show === '2xl',
                           })}
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
                                 <TiArrowSortedUp className={clsx({ "text-black": (sortField === field.key && order != 'asc') })} />
                                 <TiArrowSortedDown className={clsx({ "text-black": (sortField === field.key && order == 'asc') })} />
                              </span>
                           </div>
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {peerStore.peers.map((peer) => (
                     <tr key={peer.id} className="border-b last:border-0 hover:bg-gray-100 text-center odd:bg-gray-50">
                        <td className={clsx('py-2.5', showOrHideValue('id'))}>
                           {peer.id}
                        </td>
                        <td className={showOrHideValue('address')}>
                           {peer.address.split(':')[0]}
                        </td>
                        <td className={showOrHideValue('inbound')}>
                           {peer.inbound ? "Yes" : "No"}
                        </td>
                        <td className={clsx(showOrHideValue('services'))}>
                           <div className="flex flex-wrap justify-center items-center py-2.5">
                              {formatServices(peer.services)}
                           </div>
                        </td>
                        <td className={showOrHideValue('conectionTime')}>
                           {formatUnixTime(peer.conectionTime)}
                        </td>
                        <td className={showOrHideValue('subversion')}>
                           {peer.subversion}</td>
                        <td className={showOrHideValue('totalbytes')}>
                           {formatBytes(peer.bytessent + peer.bytesrecv)}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>
   );
}

export default Peers;
