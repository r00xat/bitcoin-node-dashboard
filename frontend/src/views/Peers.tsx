import Card from "@/components/UI/Card";

function Peers() {

   const peerExample = {
      id: 1,
      address: "192.168.1.1",
      services: ["NODE_NETWORK", "NODE_BLOOM", "NODE_WITNESS"],
      age: "2d",
      client: "electrs 0.10.2",
      traffic: "1.2 GB",
      inbound: true
   }

   return (
      <div className="m-3 mt-7">
         <Card title="Connected Peers">
            <table className="border-collapse">
               <thead>
                  <tr>
                     <th>Address</th>
                     <th>Services</th>
                     <th>Age</th>
                     <th>Client</th>
                     <th>Traffic</th>
                     <th>Inbound</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>{peerExample.address}</td>
                     <td>{peerExample.services.join(", ")}</td>
                     <td>{peerExample.age}</td>
                     <td>{peerExample.client}</td>
                     <td>{peerExample.traffic}</td>
                     <td>{peerExample.inbound ? "Yes" : "No"}</td>
                  </tr>
               </tbody>
            </table>
         </Card>
      </div>
   );
}

export default Peers;
