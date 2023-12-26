export default function Card({
   title,
   children,
}: {
   title?: string;
   children: React.ReactNode;
}) {
   return (
      <div className="col card">
         <div className="card-body">
            <h5 className="card-title">{title || 'Title'}</h5>
            <hr />
            <div className="card-text">{children}</div>
         </div>
      </div>
   );
}
