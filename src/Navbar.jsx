import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

function Navbar() {
   return (
      <nav className="navbar navbar-expand-lg bg-light">
         <div className="container-fluid">
            <a class="navbar-brand" href="/">QnA</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
               <ul className="navbar-nav">
                  <li className="nav-item">
                     <Link className="nav-link" to="/Answers">Answers</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/Ask">Ask</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/Admin">Admin Stuff :)</Link>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   );
}

export default Navbar;