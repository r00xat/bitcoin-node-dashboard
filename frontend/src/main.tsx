import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { BrowserRouter } from 'react-router-dom';
import { Chart as ChartJS, Colors, ArcElement, Tooltip, Legend } from "chart.js";

import '@/main.scss';

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </React.StrictMode>
);
