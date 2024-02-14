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

   const colors = [
      "#9e0142",
      "#d53e4f",
      "#f46d43",
      "#fdae61",
      "#fee08b",
      "#e6f598",
      "#abdda4",
      "#66c2a5",
      "#3288bd",
      "#5e4fa2"
   ];

   const doughnutData = {
      labels: Array.from(mostCommonClients.keys()),
      datasets: [
         {
            label: 'Peers',
            data: Array.from(mostCommonClients.values()),
            borderWidth: 1,
            backgroundColor: colors
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

   const TopPeerClientsChartLegend = (props: { peers: Map<string, number> }) => {
      return (
         <div>
            <button className="btn btn-outline-primary w-100 mt-2" data-bs-toggle="collapse" data-bs-target="#topPeerClientsLegend">
               Peer details
            </button>
               <ul className="list-unstyled lh-md collapse" id="topPeerClientsLegend">
                  {
                     Array.from(props.peers).map(([client, count], index) => {
                        const total = peerStore.peers.length;
                        const percentage = ((count / total) * 100).toFixed(0);
                        return (
                           <li key={client} className="border-bottom m-1">
                              <span className="fw-semibold d-inline-block text-truncate">
                                 <i className="bi bi-square-fill" style={{ color: colors[index] }}></i>
                                 {` ${index + 1}. ${client}`}
                              </span>
                              <span className="float-end">{percentage}%</span>
                           </li>
                        )
                     })
                  }
               </ul>
         </div>
      )
   }

   return (
      <div>
         <Doughnut data={doughnutData} options={doughnutOptions} />
         <TopPeerClientsChartLegend peers={mostCommonClients} />
      </div>
   )
}

const getMostCommonClient = (peers: Peer[]) => {

   const clients: Map<string, number> = new Map();

   peers.forEach(peer => {
      if (peer.subversion) {
         peer.subversion = peer.subversion.replaceAll(':', ' ').replaceAll('/', ' / ')
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