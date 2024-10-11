import { useHomeStore } from "@/store/homeStore";
import { formatLargeNumber, formatBytes } from "@/utils/utils";
import { FaCircleNodes, FaCloudArrowUp, FaCloudArrowDown, FaBan } from "react-icons/fa6";

type HeaderProps = {
   totalConnections: number;
   allTimeUploadTraffic: number;
   allTimeDownloadTraffic: number;
   bannedPeers: number;
}

export default function Header(props: HeaderProps) {

   const homeStore = useHomeStore();     

   const data = [
      {
         icon: <FaCircleNodes size={70} color="#36a3f7" />,
         title: "Total Connections",
         value: formatLargeNumber(props.totalConnections)
      },
      {
         icon: <FaCloudArrowUp size={70} color="#f4516c" />,
         title: "All Time Upload Traffic",
         value: formatBytes(props.allTimeUploadTraffic)
      },
      {
         icon: <FaCloudArrowDown size={70} color="#34bfa3" />,
         title: "All Time Download Traffic",
         value: formatBytes(props.allTimeDownloadTraffic)
      },
      {
         icon: <FaBan size={70} color="#ffcb8c" />,
         title: "Banned Peers",
         value: formatLargeNumber(props.bannedPeers)
      }
   ];

   function valueOrLoading(value: string) {
      if (homeStore.loading) {
         return (
            <div className="animate-pulse flex">
               <div className="flex-1">
                  <div className="h-5 bg-slate-200 rounded" />
               </div>
            </div>
         );
      } else {
         return value;
      }
   }

   return (
      <header>
         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 m-3">
            {
               data.map((stat, i) => {
                  return (
                     <div key={i} className="flex items-center justify-between bg-white rounded-md p-5">
                        <div>
                           {stat.icon}
                        </div>
                        <div className="flex flex-col justify-between h-full text-right">
                           <div className="font-bold text-lg text-gray-400">
                              {stat.title}
                           </div>
                           <div className="font-bold text-2xl text-gray-600">
                              {valueOrLoading(stat.value)}
                           </div>
                        </div>
                     </div>
                  );
               })
            }
         </div>
      </header>
   );
}