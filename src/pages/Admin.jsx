import React from "react";

class Admin extends React.Component {
   constructor(props) {
      super(props);
      this.login = this.login.bind(this);
      this.state = {
         pass: "",
         body: {}
      }
   }

   async login(e) {
      e.preventDefault();

      // make a fetch to the azure function
      const azureFunctionUrl = 'https://fullstackqnapass.azurewebsites.net/api/qnapass';

      fetch(azureFunctionUrl, {
         method: 'POST',
         headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
         body: JSON.stringify({pass: this.state.pass})
      })
      .then((res) => { 
         if (res.status === 200) { 
                     // click again to handle prefetching
            // document.getElementById("login").click();
            let json = res.json();
            json.then((data) => this.setState(state => ({body: data})))
         } 
         else if (res.status === 400) {
            document.getElementById("error").innerHTML = "";
            setTimeout(() => {

               document.getElementById("error").innerHTML = "Incorrect Pass | You are probably not authorised to be on this part of the site";
            }, 250);
         }
      })
      .catch(err => console.error(err));
     
      if (this.state.body.authenticated) {
         // Route to Respond page
         window.location.href = "/RespondGuarded";
      } else {
         document.getElementById("error").innerHTML = "";
         setTimeout(() => {
            // 
            document.getElementById("error").innerHTML = "Incorrect Pass | You are probably not authorised to be on this part of the site";
         }, 250);
      }     
   }

   render() {
      return (
         <div className="container">
            <h1>Admin</h1>
            <form onSubmit={this.login} className="border border-primary p-5">
               <div className="mb-3">
                  <label className="form-label" htmlFor="pass">Passcode</label>
                  <input type="text" className="form-control" id="pass" name="pass" value={this.state.pass} onChange={(e) => this.setState({pass : e.target.value })} />
               </div>
               <button className="btn btn-primary mb-2" type="submit" id="login">Login</button>
               <div className="alert alert-info" id="error"></div>
            </form>
         </div>
      );
   }
}

export default Admin;