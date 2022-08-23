import React, {useState} from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
// import  'dotenv/config';

function Admin() {
   let [pass, setPass] = useState("");

   async function login(e) {
      e.preventDefault();

      if (pass === 'ladiesman217') {
         // Route to Respond page
         window.location.href = "/Respond";
      }      
   }

  return (
    <div className="container">
      <h1>Admin</h1>
      <form onSubmit={login}>
         <div className="mb-3">
            <label className="form-label" htmlFor="pass">Passcode</label>
            <input type="text" className="form-control" id="pass" name="pass" value={pass} onChange={(e) => setPass(e.target.value)} />
         </div>
         <button className="btn btn-primary mb-2" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Admin;