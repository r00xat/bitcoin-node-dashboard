import NavBar from '@/components/NavBar';
import AppRouter from '@/router/AppRouter';
import React from 'react';
import { useLocation } from 'react-router-dom'

const App: React.FC = () => {

   const location = useLocation();

   return (
      <div className="bg-gray-100 min-h-full pb-5">
         { location.pathname !== "/login" && <NavBar /> }
         <AppRouter />
      </div>
   );
};

export default App;