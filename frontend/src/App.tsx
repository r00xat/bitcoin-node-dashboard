import NavBar from '@/components/UI/NavBar';
import AppRouter from '@/router/AppRouter';
import React from 'react';

const App: React.FC = () => {

   return (
      <>
         <NavBar/>
         <AppRouter />
      </>
   );
};

export default App;