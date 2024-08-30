import NavBar from '@/components/NavBar';
import { useNavigate , Outlet, createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import {  } from 'react-router-dom'
import { Home, Peers, Login } from '@/views';
import { useUserStore } from "@/store/userStore";

const Layout: React.FC = () => {

   const userStore = useUserStore();
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      if (!userStore.isLogged) {
         return navigate("/login");
      }
   }, [userStore.isLogged, location.pathname]);

   return (
      <React.Fragment>
         <NavBar />
         <Outlet />
      </React.Fragment>
   );
}

const router = createBrowserRouter([
   {
      path: "/login",
      element: <Login />
   },
   {
      element: <Layout />,
      children: [
         {
            path: "/",
            element: <Home />
         },
         {
            path: "/peers",
            element: <Peers />
         }
      ]
   }
]);

const App: React.FC = () => {
   return (
      <div className="bg-gray-100 min-h-full pb-5">
         <RouterProvider router={router} />
      </div>
   );
};

export default App;
