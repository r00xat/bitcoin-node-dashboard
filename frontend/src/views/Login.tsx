import React, { useState } from 'react';

export default function Login() {
   const [rememberMe, setRememberMe] = useState(true);

   const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
   };

   return (
      <div className="bg-gray-800 min-h-screen flex justify-center">
         <form onSubmit={handleSubmit} className="flex flex-col justify-center">
            <input
               type="password"
               placeholder="Password"
               className="border border-gray-400 rounded p-2 ps-3"
            />
            <div className="mt-1">
               <input
                  type="checkbox"
                  id="remembeMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
               />
               <label htmlFor="rememberMe" className="text-white ps-1">
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
   );
}