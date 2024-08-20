import React, { useState } from 'react';
import Logo from '@/icons/btc.svg';

export default function Login() {
   const [rememberMe, setRememberMe] = useState(true);

   const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
   };

   return (
      <div className="flex flex-row min-h-screen justify-center items-center">
         <div className="flex justify-between flex-col bg-white h-60 p-6 rounded-lg">
            <div className="flex flex-shrink-0 items-center">
               <img className="h-10 w-auto me-1" src={Logo} style={{ transform: 'rotate(13.88deg)'}} />
               <div className="text-2xl font-bold">
                  Bitcoin Node Dasboard
               </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center">
               <input
                  type="password"
                  placeholder="Password"
                  className="border border-gray-400 rounded p-2 ps-3"
               />
               <div className="mt-2">
                  <input
                     type="checkbox"
                     id="rememberMe"
                     checked={rememberMe}
                     onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="rememberMe" className="ps-1">
                     Remember me
                  </label>
               </div>
               <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded mt-2"
               >
                  Login
               </button>
            </form>
         </div>
      </div>
   );
}