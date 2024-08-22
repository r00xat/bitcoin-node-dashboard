import NavBar from '@/components/NavBar';
import { Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import React from 'react';
import {  } from 'react-router-dom'
import { Home, Peers, Login } from '@/views';
import { useUserStore } from "@/store/userStore";

const App: React.FC = () => {

   const location = useLocation();

   return (
      <div className="bg-gray-100 min-h-full pb-5">
         { location.pathname !== "/login" && <NavBar /> }
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
               <Route path="/" element={<Home />} />
               <Route path="/peers" element={<Peers />} />
            </Route>
         </Routes>
      </div>
   );
};

const ProtectedRoute: React.FC = () => {
   const userStore = useUserStore();

   return userStore.jwt ? <Outlet /> : <Navigate to="/login" />;
}

export default App;