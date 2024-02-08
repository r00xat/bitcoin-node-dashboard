import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Peer, usePeerStore } from '@/store/peerStore';

const TopPeerClients = () => {

   const peerStore = usePeerStore();

   const [mostCommonClients, setMostCommonClients] = useState<Map<string, number>>(new Map());

   useEffect(() => {
      peerStore.fetch();      
   }, []); 

   useEffect(() => {
      setMostCommonClients(getMostCommonClient(peerStore.peers));
   }, [peerStore.peers])

   const doughnutData = {
      labels: Array.from(mostCommonClients.keys()),
      datasets: [
         {
            data: Array.from(mostCommonClients.values()),
            borderWidth: 1,
         },
      ]
   }

   const doughnutOptions = {
      plugins: {
         legend: {
           display: false
         },
         colors: {
            enabled: true
         }
      }
   }

   if (peerStore.peers.length === 0) {
      return <div>Loading...</div>
   }

   return (
      <div>
         <Doughnut data={doughnutData} options={doughnutOptions} />
         <TopPeerClientsChartLegend peers={mostCommonClients}/>
      </div>
   )
}

const TopPeerClientsChartLegend = (props: {peers: Map<string, number>}) => {
   return (
      <ul className="list-unstyled lh-lg">
         {
            Array.from(props.peers).map(([client, count]) => {
               return (
                  <li key={client} className="border-bottom">
                     <span className="fw-semibold">{client}</span>
                     <span className="float-end">{count}</span>
                  </li>
               )
            })
         }
      </ul>
   )
}

const getMostCommonClient = (peers: Peer[]) => {

   const clients: Map<string, number> = new Map();

   peers.forEach(peer => {
      if (peer.subversion) {
         clients.set(peer.subversion, (clients.get(peer.subversion) || 0) + 1);
      }
   });

   const sortedClients = Array.from(clients.entries()).sort((a, b) => b[1] - a[1]);
   const mostCommonClients = new Map(sortedClients.slice(0, 9));
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const other = sortedClients.slice(9).reduce((acc, [client, count]) => acc + count, 0);
   mostCommonClients.set('Other', other);
   return mostCommonClients;
}

export default TopPeerClients;