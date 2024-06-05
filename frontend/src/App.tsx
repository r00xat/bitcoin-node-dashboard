import NavBar from '@/components/UI/NavBar';
import AppRouter from '@/router/AppRouter';
import React from 'react';

const App: React.FC = () => {

   return (
      <div className="bg-gray-100">
         <NavBar/>
         <AppRouter />
      </div>
   );
};

export default App;