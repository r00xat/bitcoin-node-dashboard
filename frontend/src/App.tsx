import NavBar from '@/components/NavBar';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom'; // Changed to remove Weblogin
import React from 'react'; // Changed to remove Weblogin
import { Bounce, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
   {
      element: (
        <React.Fragment>
          <NavBar /> {}
          <Outlet /> {}
          <ToastContainer 
            position="bottom-right"
            autoClose={5000}
            limit={2}
            hideProgressBar={true}
            newestOnTop
            closeOnClick
            rtl={false}
            draggable={false}
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </React.Fragment>
      ),
      children: [
         {
            path: "/",
            async lazy() {
               const Home = await import("@/views/Home/Home");
               return { Component: Home.default };
            }
         },
         {
            path: "/peers",
            async lazy() {
               const Peers = await import("@/views/Peers/Peers");
               return { Component: Peers.default };
            }
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
