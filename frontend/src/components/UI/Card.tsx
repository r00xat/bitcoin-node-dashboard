import clsx from "clsx";

export type StatsCardProps = {
   title: string;
   className?: string;
   children: React.ReactNode;
};

export default function Card({ title, className, children }: StatsCardProps) {
   return (
      <div className={clsx(className, "bg-white rounded-md p-5")}>
      <h1 className="text-2xl font-semibold text-center mb-2">
         {title}
      </h1>
      <hr />
      {children}
   </div>
   )
}