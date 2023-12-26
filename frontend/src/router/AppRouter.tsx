import { Routes, Route } from 'react-router-dom';
import { About, Blocks, Home, Mempool, Peers, Wallet } from '@/views';
import { RoutesEnum } from '@/router/Routes';

const AppRouter = () => {
   return (
      <Routes>
         <Route path={RoutesEnum.HOME} element={<Home />} />
         <Route path={RoutesEnum.PEERS} element={<Peers />} />
         <Route path={RoutesEnum.BLOCKS} element={<Blocks />} />
         <Route path={RoutesEnum.MEMPOOL} element={<Mempool />} />
         <Route path={RoutesEnum.WALLET} element={<Wallet />} />
         <Route path={RoutesEnum.ABOUT} element={<About />} />
      </Routes>
   );
};

export default AppRouter;
