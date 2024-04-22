import { NavLink } from 'react-router-dom';
import { IconHome, IconUsersGroup } from '@tabler/icons-react';
import './NavBar.scss'

export default function NavBar() {
   return (
      <nav id="navbar" className="navbar navbar-expand-sm bg-dark" data-bs-theme="dark">
         <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
               Node Dashboard
            </NavLink>
            <button
               className="navbar-toggler"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target="#navbarNav"
               aria-controls="navbarNav"
               aria-expanded="false"
               aria-label="Toggle navigation"
            >
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
               <ul className="navbar-nav">
                  <li className="nav-item">
                     <NavLink className="nav-link" to="/">
                        <IconHome className="icon me-2"/>Home
                     </NavLink>
                  </li>
                  <li className="nav-item">
                     <NavLink className="nav-link" to="/peers">
                        <IconUsersGroup className="icon me-2"/>Peers
                     </NavLink>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   );
}
