import { NavLink } from 'react-router-dom';
import { FaHouseChimney, FaUsers } from "react-icons/fa6";
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
                        <FaHouseChimney className="icon me-1"/>Home
                     </NavLink>
                  </li>
                  <li className="nav-item">
                     <NavLink className="nav-link" to="/peers">
                        <FaUsers className="icon me-1"/>Peers
                     </NavLink>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   );
}
