import React from "react";
import Respond from "./Respond";

const baseUrl = "https://sulfuricqna.azurewebsites.net";

class Admin extends React.Component {
   constructor(props) {
      super(props);
      this.login = this.login.bind(this);
      this.state = {
         _pass: "",
         renderResponse: false      
      };
      this.renderResponse = this.renderResponse.bind(this);
   }

   renderResponse() {
      this.render(<Respond authorised={true} />);
   }

   async login(e) {
      e.preventDefault();

      try{
         fetch(baseUrl + '/api/Auth?pass=' + this.state._pass)
         .then((res) => res.json())
         .then((data) => {
            if(data.authorised) {
               // window.location.href = "/RespondGuarded";
               this.state.renderResponse = data.authorised;
               this.forceUpdate();
            }
            else {
               document.getElementById("error").style.display = "block";
               document.getElementById("error").innerText = "Incorrect passcode. | High chance you might not be authorised to access this part.";
            }
         })
         .catch((reason) => console.error(reason));

         // console.log(this.state.renderResponse);
      } catch (err) {
         console.log(err);
      }
   }

   render() {
      if (this.state.renderResponse) {
         return <Respond authorised={true} />;
      } 
      else {
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
}

export default Admin;