import { Routes, Route } from 'react-router-dom';
import { Home, Peers } from '@/views';
import { RoutesEnum } from '@/router/Routes';

const AppRouter = () => {
   return (
      <Routes>
         <Route path={RoutesEnum.HOME} element={<Home />} />
         <Route path={RoutesEnum.PEERS} element={<Peers />} />
      </Routes>
   );
};

export default AppRouter;
