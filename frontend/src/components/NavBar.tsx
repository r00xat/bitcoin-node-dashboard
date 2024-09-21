import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useUserStore } from "@/store/userStore";
import Logo from '@/icons/btc.svg';
import './NavBar.scss'
import RefreshTime from '@/components/RefreshTimer';

export default function NavBar() {
   const [isOpen, setIsOpen] = useState(false);

   const userStore = useUserStore();
   const navigate = useNavigate();

   const links = [
      {
         title: 'Home',
         path: '/'
      },
      {
         title: 'Peers',
         path: '/peers'
      }
   ];

   function handleLogout() {
      userStore.logout();
      navigate('/login');
   }

   function Links() {
      const location = useLocation();

      const activeClass = "bg-gray-900 text-white";
      const inactiveClass = "text-gray-300 hover:bg-gray-700 hover:text-white";

      return (
         <>
            {
               links.map((link, i) => {
                  return (
                     <NavLink
                        key={i}
                        to={link.path}
                        className={clsx(location.pathname === link.path ? activeClass : inactiveClass, isOpen && 'block', 'rounded-md px-3 py-2 font-medium text-base sm:text-sm')}
                     >
                        {link.title}
                     </NavLink>
                  );

               })
            }
         </>
      )
   }

   function MobileMenu() {
      if (isOpen) {
         return (
            <div className="sm:hidden" id="mobile-menu">
               <div className="space-y-1 px-2 pb-3 pt-2">
                  <Links />
               </div>
               <div className="space-y-1 px-2 pb-3 pt-2">
                  <RefreshTime />
               </div>
            </div>
         );
      }
   }

   return (
      <nav className="bg-gray-800">
         <div className="w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button
                     type="button"
                     onClick={() => setIsOpen(!isOpen)}
                     className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white z-50"
                  >
                     <span className="absolute -inset-0.5"></span>
                     <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                     </svg>
                     <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                     </svg>
                  </button>
               </div>
               <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                     <img className="h-8 w-auto me-1" src={Logo} style={{ transform: 'rotate(13.88deg)' }} />
                     <div className="text-white text-base font-bold">
                        Bitcoin Node Dasboard
                     </div>
                  </div>
                  <div className="hidden flex-row sm:ml-6 sm:flex w-full justify-between">
                     <div className="flex space-x-4">
                        <Links />
                     </div>
                     <div>
                        <RefreshTime />
                     </div>
                  </div>
               </div>
               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button 
                     type="button" 
                     onClick={() => handleLogout()} 
                     className="relative rounded-full bg-gray-800 p-3 text-gray-400 hover:text-white focus:outline-none hover:bg-gray-700">
                     <FaArrowRightFromBracket />
                  </button>
               </div>
            </div>
         </div>
         <MobileMenu />
      </nav>
   );
}
