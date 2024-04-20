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
                  <p className="m-0">
                     <i className="me-1 bi bi-person-fill"></i>
                     Total Connections
                  </p>
                  <h2 className="m-0">{formatLargeNumber(props.totalConnections)}</h2>
                  <p className="m-0">
                     <i className="me-1 bi bi-plus"></i>
                     0 New Peers
                  </p>
               </div>
            </div>
            <div className="col-6 col-sm-4 col-xl-2">
               <div className="p-2 border rounded-2">
                  <p className="m-0">
                     <i className="me-1 bi bi-cloud-arrow-up-fill"></i>
                     Upload Traffic
                  </p>
                  <h2 className="m-0">{formatBytes(props.totalUploadTraffic)}</h2>
                  <p className="m-0">
                     <i className="me-1 bi bi-chevron-compact-right"></i>
                     0 GB Current peers
                  </p>
               </div>
            </div>
            <div className="col-6 col-sm-4 col-xl-2">
               <div className="p-2 border rounded-2">
                  <p className="m-0">
                     <i className="me-1 bi bi-cloud-arrow-down-fill"></i>
                     Download Traffic
                  </p>
                  <h2 className="m-0">{formatBytes(props.totalDownloadTraffic)}</h2>
                  <p className="m-0">
                     <i className="me-1 bi bi-chevron-compact-right"></i>
                     0 GB Current peers
                  </p>
               </div>
            </div>
            <div className="col-6 col-sm-4 col-xl-2">
               <div className="p-2 border rounded-2">
                  <p className="m-0">
                     <i className="me-1 bi bi-ban"></i>
                     Banned Peers
                  </p>
                  <h2 className="m-0">{props.bannedPeers}</h2>
                  <p className="m-0">
                     <i className="me-1 bi bi-plus"></i>
                     0 Last 24h
                  </p>
               </div>
            </div>
            <div className="col-6 col-sm-4 col-xl-2">
               <div className="p-2 border rounded-2">
                  <p className="m-0">
                     <i className="me-1 bi bi-database-fill"></i>
                     TX in Mempool
                  </p>
                  <h2 className="m-0">{formatLargeNumber(props.txInMeempool)}</h2>
                  <p className="m-0">
                     <i className="me-1 bi bi-battery-half"></i>
                     45% Usage
                  </p>
               </div>
            </div>
            <div className="col-6 col-sm-4 col-xl-2">
               <div className="p-2 border rounded-2">
                  <p className="m-0">
                     <i className="me-1 bi bi-box-fill"></i>
                     Latest Block
                  </p>
                  <h2 className="m-0">{formatLargeNumber(props.latestBlock)}</h2>
                  <p className="m-0">
                     <i className="me-1 bi bi-clock-history"></i>
                     10 (fake) mins ago
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
