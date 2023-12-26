import InfoList from '@/components/InfoList';
import MainStats from '@/components/MainStats';
import Card from '@/components/UI/Card';
import { useEffect, useState } from 'react';

const Home = () => {
   const [nodeInfo, setNodeInfo] = useState([]);
   const [mainInfo, setMainInfo] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         await fetch('http://localhost:3003/bitcoin/node')
            .then((res) => res.json())
            .then((data) => setNodeInfo(data))
            .catch();

         await fetch('http://localhost:3003/bitcoin/main')
            .then((res) => res.json())
            .then((data) => setMainInfo(data))
            .catch();
      };
      fetchData();
   }, []);

   return (
      <div className="container">
         <MainStats stats={mainInfo} />
         <div className="container mt-2">
            <div className="row gap-3">
               <Card title="Title">
                  <InfoList infoList={nodeInfo} />
               </Card>
               <Card>
                  <p>Card 2</p>
               </Card>
               <Card>
                  <p>Card 3</p>
               </Card>
            </div>
         </div>
      </div>
   );
};

export default Home;
