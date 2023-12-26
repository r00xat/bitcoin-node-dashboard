export type InfoType = {
   icon: string;
   name: string;
   value: string;
};

export default function InfoList({ infoList }: { infoList: InfoType[] }) {
   return (
      <ul className="list-unstyled">
         {infoList.map((info, index) => (
            <li key={index} className="mb-2">
               <i className={`me-2 ${info.icon}`}></i>
               <span className="fw-semibold">{info.name}</span>
               <span className="float-end">{info.value}</span>
            </li>
         ))}
      </ul>
   );
}
