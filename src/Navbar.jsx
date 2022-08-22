import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

function Navbar() {
   return (
      <nav>
         <ul>
            <li>
               <Link to="/Answers">Answers</Link>
            </li>
            <li>
               <Link to="/Ask">Ask</Link>
            </li>
         </ul>
      </nav>
   );
}

export default Navbar;