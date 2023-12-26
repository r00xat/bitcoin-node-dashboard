import Stat, { StatType } from './Stat';

export default function MainStats({ stats }: { stats: StatType[] }) {
   return (
      <div className="container bg-white border rounded-2 mt-2 p-3">
         <div className="row">
            {stats.map((stat, index) => (
               <Stat key={index} {...stat} />
            ))}
         </div>
      </div>
   );
}
