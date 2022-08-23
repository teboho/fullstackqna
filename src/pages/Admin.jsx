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
      } else {
         document.getElementById("error").innerHTML = "";
         setTimeout(() => {
            setPass("");
            document.getElementById("error").innerHTML = "Incorrect Pass | You are probably not authorised to be on this part of the site";
         }, 250);
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
         <div className="alert alert-danger" id="error"></div>
      </form>
    </div>
  );
}

export default Admin;