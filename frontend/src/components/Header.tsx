
interface IHeaderPorps {
   loading: boolean;
   data: {
      icon: JSX.Element;
      title: string;
      value: string;
   }[];
}

export default function Header(props: IHeaderPorps) {

   function valueOrLoading(value: string) {
      if (props.loading) {
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
               props.data.map((stat, i) => {
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