import Card from "@/components/UI/Card";
import { usePeerStore } from "@/store/peerStore";
import { formatBytes, formatUnixToTimeAgo } from "@/utils/utils";
import { useEffect } from "react";

function Peers() {

   const peerStore = usePeerStore();

   useEffect(() => {
      peerStore.fetch();
   }, []);

   return (
      <div className="m-3 mt-7">
         <Card>
            <table className="border-collapse table-auto w-full">
               <thead className="bg-gray-200 rounded-2xl">
                  <tr>
                     <th className="py-2">Id</th>
                     <th>Address</th>
                     <th>Inbound</th>
                     <th>Services</th>
                     <th>Age</th>
                     <th>Client</th>
                     <th>Total Traffic</th>
                     <th>Ban</th>
                  </tr>
               </thead>
               <tbody>
                  {peerStore.peers.map((peer, index) => (
                     <tr key={index} className="border-b odd:bg-white even:bg-gray-100 hover:bg-gray-200 text-center">
                        <td className="py-1.5">{peer.id}</td>
                        <td>{peer.address}</td>
                        <td>{peer.inbound ? "Yes" : "No"}</td>
                        <td>{peer.services.join(", ")}</td>
                        <td>{formatUnixToTimeAgo(peer.conectionTime)}</td>
                        <td>{peer.subversion}</td>
                        <td>{formatBytes(peer.bytessent + peer.bytesrecv)}</td>
                        <td>
                           <button className="px-2 border border-gray-400 text-red-600 rounded-lg">X</button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </Card>
      </div>
   );
}

export default Peers;
