import React from "react";

class Admin extends React.Component {
   constructor(props) {
      super(props);
      this.login = this.login.bind(this);
      this.state = {
         _pass: ""      }
   }

   login(e) {
      e.preventDefault();

      try{
         if (this.state._pass === "ladiesman217") {
            // Route to Respond page
            window.location.href = "/RespondGuarded";
         }
         else {
            document.getElementById("error").innerText = "";
            setTimeout(() => {
               // 
               document.getElementById("error").innerText = "Incorrect Pass | You are probably not authorised to be on this part of the site";
               document.getElementById("error").style.display = "block";
            }, 250);
         }

         console.log(this.state.authenticated);
      } catch (err) {
         console.log(err);
      }
   }

   render() {
      return (
         <div className="container">
            <h1 className="text-primary">Admin</h1>
            <form onSubmit={this.login} className=" shadow p-3 mb-5 bg-white rounded">
               <div className="mb-3">
                  <label className="form-label" htmlFor="pass">Passcode</label>
                  <input 
                     type="text" 
                     className="form-control" 
                     id="pass" 
                     name="pass" 
                     value={this.state._pass} 
                     onChange={(e) => this.setState({_pass : e.target.value})} 
                     placeholder="Enter passcode"
                  />
               </div>
               <button className="btn btn-primary mb-2" type="submit" id="login">Login</button>
               <div className="alert alert-info" id="error" style={{"display": "none"}}></div>
            </form>
         </div>
      );
   }
}

export default Admin;