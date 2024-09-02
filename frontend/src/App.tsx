import NavBar from '@/components/NavBar';
import { useNavigate , Outlet, createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import Login from '@/views/Login';
import { useUserStore } from "@/store/userStore";

const AuthLayout: React.FC = () => {

   const userStore = useUserStore();
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      if (!userStore.isLogged) {
         return navigate("/login");
      }
   }, [userStore.isLogged, location.pathname]);

   return (
      <React.Suspense fallback={null}>
         { userStore.isLogged && (
            <React.Fragment>
               <NavBar />
               <Outlet />
            </React.Fragment>
         )}
      </React.Suspense>
   );
}

const router = createBrowserRouter([
   {
      path: "/login",
      element: <Login />
   },
   {
      element: <AuthLayout />,
      children: [
         {
            path: "/",
            Component: React.lazy(() => import("@/views/Home/Home"))
         },
         {
            path: "/peers",
            Component: React.lazy(() => import("@/views/Peers"))
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
