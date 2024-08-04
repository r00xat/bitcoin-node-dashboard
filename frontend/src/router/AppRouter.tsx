import { Routes, Route } from 'react-router-dom';
import { Home, Peers, Login } from '@/views';

const AppRouter = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/peers" element={<Peers />} />
      </Routes>
   );
};

export default AppRouter;
