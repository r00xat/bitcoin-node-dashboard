import { formatBytes, formatLargeNumber } from "@/utils/utils";

type MainStatsProps = {
   totalConnections: number;
   totalUploadTraffic: number;
   totalDownloadTraffic: number;
   bannedPeers: number;
   txInMeempool: number;
   latestBlock: number;
};

export default function MainStats(props: MainStatsProps) {
   return (
      <div className="container bg-white border rounded-2 mt-2 p-3">
         <div className="row">
            <div className="col-6 col-sm-4 col-xl-2">
               <div className="p-2 border rounded-2">
                  <p className="m-0">Total Connections</p>
                  <h2 className="m-0">{formatLargeNumber(props.totalConnections)}</h2>
                  <p className="m-0">+ 0 New Peers</p>
               </div>
            </div>
            <div className="col-6 col-sm-4 col-xl-2">
               <div className="p-2 border rounded-2">
                  <p className="m-0">Total Upload Traffic</p>
                  <h2 className="m-0">{formatBytes(props.totalUploadTraffic)}</h2>
                  <p className="m-0">0 GB Current peers</p>
               </div>
            </div>
            <div className="col-6 col-sm-4 col-xl-2">
               <div className="p-2 border rounded-2">
                  <p className="m-0">Total Download Traffic</p>
                  <h2 className="m-0">{formatBytes(props.totalDownloadTraffic)}</h2>
                  <p className="m-0">0 GB Current peers</p>
               </div>
            </div>
            <div className="col-6 col-sm-4 col-xl-2">
               <div className="p-2 border rounded-2">
                  <p className="m-0">Banned Peers</p>
                  <h2 className="m-0">{props.bannedPeers}</h2>
                  <p className="m-0">+ 0 Last 24h</p>
               </div>
            </div>
            <div className="col-6 col-sm-4 col-xl-2">
               <div className="p-2 border rounded-2">
                  <p className="m-0">TX in Mempool</p>
                  <h2 className="m-0">{formatLargeNumber(props.txInMeempool)}</h2>
                  <p className="m-0">45% Usage</p>
               </div>
            </div>
            <div className="col-6 col-sm-4 col-xl-2">
               <div className="p-2 border rounded-2">
                  <p className="m-0">Latest Block</p>
                  <h2 className="m-0">{formatLargeNumber(props.latestBlock)}</h2>
                  <p className="m-0">10 mins ago</p>
               </div>
            </div>
         </div>
      </div>
   );
}
