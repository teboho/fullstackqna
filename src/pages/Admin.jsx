import React from "react";
import Respond from "./Respond";

const baseUrl = "https://fullstackqna-api.azurewebsites.net";
const baseUrl2 = "https://fsqna-api-aehqdzfua9g5exew.z01.azurefd.net";

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
         fetch(baseUrl2 + '/api/Auth?pass=' + this.state._pass)
         .then((res) => res.json())
         .then((data) => {
            if(data.authorised) {
               this.setState({renderResponse: data.authorised});
               this.forceUpdate();
            }
            else {
               document.getElementById("error").style.display = "block";
               document.getElementById("error").innerText = "Incorrect passcode. | High chance you might not be authorised to access this part.";
            }
         })
         .catch((reason) => console.error(reason));
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
            <div className="container flex">
               <h1 className="display-1 text-primary">Admin</h1>
               <form onSubmit={this.login} className="w-100 shadow p-3 mb-5 bg-white rounded">
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