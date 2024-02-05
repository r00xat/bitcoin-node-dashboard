import clsx from "clsx";
import React from "react";

export default function Card({
   title,
   children,
   className,
}: {
   title?: string;
   children: React.ReactNode;
   className?: string;
}) {
   return (
      <div className={clsx(className)}>
         <div className="card">
            <div className="card-body">
               <h5 className="card-title">{title || 'Title'}</h5>
               <hr />
               <div className="card-text">{children}</div>
            </div>
         </div>
      </div>
   );
}
