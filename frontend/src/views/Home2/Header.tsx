import { useMainStore } from "@/store/mainStore";
import { formatLargeNumber, formatBytes } from "@/utils/utils";
import { useEffect } from "react";
import { FaCircleNodes, FaCloudArrowUp, FaCloudArrowDown, FaDatabase } from "react-icons/fa6";

export default function Header() {

   const mainStore = useMainStore();

   useEffect(() => {
      mainStore.fetch();
   }, []);

   return (
      <header>
         <div className="container-fluid">
            <div className="row">
               <div className="col-12 col-sm-6 col-xl-3 p-0 content-wrapper">
                  <div className="content main-stat">
                     <div className="icon-wrapper">
                        <FaCircleNodes size={70} color="#36a3f7" />
                     </div>
                     <div className="main-stat-description">
                        <div className="main-stat-title">Total Connections</div>
                        <div className="main-stat-value">
                           {formatLargeNumber(mainStore.totalConnections)}
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-12 col-sm-6 col-xl-3 p-0 content-wrapper">
                  <div className="content main-stat">
                     <div className="icon-wrapper">
                        <FaCloudArrowUp size={70} color="#f4516c" />
                     </div>
                     <div className="main-stat-description">
                        <div className="main-stat-title">Upload Traffic</div>
                        <div className="main-stat-value">
                           {formatBytes(mainStore.totalUploadTraffic)}
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-12 col-sm-6 col-xl-3 p-0 content-wrapper">
                  <div className="content main-stat">
                     <div className="icon-wrapper">
                        <FaCloudArrowDown size={70} color="#34bfa3" />
                     </div>
                     <div className="main-stat-description">
                        <div className="main-stat-title">Download Traffic</div>
                        <div className="main-stat-value">
                           {formatBytes(mainStore.totalDownloadTraffic)}
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-12 col-sm-6 col-xl-3 p-0 content-wrapper">
                  <div className="content main-stat">
                     <div className="icon-wrapper">
                        <FaDatabase size={70} color="#ffcb8c" />
                     </div>
                     <div className="main-stat-description">
                        <div className="main-stat-title">TX in Mempool</div>
                        <div className="main-stat-value">
                           {formatLargeNumber(mainStore.txInMeempool)}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
}