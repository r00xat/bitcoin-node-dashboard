export type StatType = {
   name: string;
   value: number;
   footer: string;
};

export default function Stat(stat: StatType) {
   return (
      <div className="col-6 col-sm-4 col-xl-2">
         <div className="p-2 border rounded-2">
            <p className="m-0">{stat.name}</p>
            <h2 className="m-0">{stat.value}</h2>
            <p className="m-0">{stat.footer}</p>
         </div>
      </div>
   );
}
