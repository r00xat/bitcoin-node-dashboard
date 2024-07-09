import clsx from "clsx";

export type StatsCardProps = {
   title: string;
   statsList: Array<StatsList>;
   loading?: boolean;
   className?: string;
};

export type StatsList = {
   icon: JSX.Element | null;
   name: string;
   value: string | number | Array<string> | boolean;
}

export default function StatsCard({ title, statsList, loading, className }: StatsCardProps) {

   const renderValue = (value: string | number | Array<string> | boolean) => {
      if (loading) {
         return (
            <div className="animate-pulse flex">
               <div className="flex-1">
                  <div className="h-5 w-20 bg-gray-200 rounded" />
               </div>
            </div>
         );
      } else if (typeof value === 'string' || typeof value === 'number') {
         return value;
      } else if (Array.isArray(value)) {
         return renderArray(value);
      } else if (typeof value === 'boolean') {
         return renderBoolean(value);
      }
   }

   const renderArray = (array: Array<string>) => {
      return (
         <span className="max-w-80 flex flex-wrap justify-content-flex-end flex-row-reverse">
            {
               array.map((el, i) => {
                  return (
                     <span
                        key={i}
                        className="m-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                     >
                        {el}
                     </span>
                  );
               })
            }
         </span>
      );
   }

   const renderBoolean = (value: boolean) => {
      let className: string;

      if (value)
         className = "bg-green-100 text-green-700 ring-green-700/20"
      else
         className = " bg-red-100  text-red-700 ring-red-700/20"

      return (
         <span
            className={className + " rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"}
         >
            {value ? 'enabled' : 'disabled'}
         </span>
      );
   }

   return (
      <div className={clsx(className, "bg-white rounded-md p-5")}>
         <h1 className="text-2xl font-semibold text-center mb-2">
            {title}
         </h1>
         <hr />
         <ul className="mt-2">
            {
               statsList.map((stat, i) => {
                  return (
                     <li key={i} className="flex justify-between mb-1">
                        <div className="flex items-center">
                           <div className="me-1">
                              {stat.icon}
                           </div>
                           <span>
                              {stat.name}
                           </span>
                        </div>
                        <span>
                           {renderValue(stat.value)}
                        </span>
                     </li>
                  );
               })
            }
         </ul>
      </div>
   );


}