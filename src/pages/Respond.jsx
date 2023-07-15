import React from "react";

const baseUrl = "https://fullstackqna-api.azurewebsites.net/api";
const baseUrl2 = "https://fullstackqnaapi20230713165053.azurewebsites.net/api";

class Delete extends React.Component {
   constructor(props) {
      super(props);
      this.handleDelete = this.handleDelete.bind(this);
   }

   handleDelete(e) {
      e.preventDefault();

      const url = baseUrl2 + '/questions/' + this.props._id;
      fetch(url, {
         method: 'DELETE'
      })
      .then((res) => res.json())
      .then((res) => {
         console.log(res);
         document.getElementById('deleteBtn').style = 'display: none';
         document.getElementById(this.props._id).innerText = res.result;
         document.getElementById(this.props._id).className = 'form-text p-3 text-success';

         // Wait 3 seconds then render the Respond page
         // setTimeout(() => {
         //    window.location.reload();
         // }
         // , 3000);
      })
      .catch(err =>  {
         console.error(err);
         document.getElementById('deleteBtn').style = 'display: none';
         document.getElementById(this.props._id).innerText = "there was an error deleting the question.";
         document.getElementById(this.props._id).className = 'form-text p-3 text-danger';
      });
   }

   render() {
      return (
         <React.Fragment>
            <button id="deleteBtn" type="button" className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
            <span id={this.props._id}></span>
         </React.Fragment>
      );
   }   
}

class Question extends React.Component {
   // The constructor is not needed for this component
   //  constructor(props) {
   //    super(props);
   // }

   render () {
      return (
         <tr>
            <td>{this.props.questionId}</td>
            <td>{this.props.quester}</td>
            <td>{this.props.questionText}</td>
            <td>{new Date(this.props.createdDate).toLocaleString()}</td>
            <td>{this.props.questionAnswered ? "Yes" : "No"}</td>
            <td><Delete _id={this.props.questionId} /></td>   
         </tr>
      );
   }
}

// Respond page
class Respond extends React.Component {
   constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = { 
         questions : [],
         _questionId: 0,
         _answerText: "",
         question: null
      };
   }

   componentDidMount() {
      fetch(baseUrl2 + '/Questions')
         .then((res) => res.json()) // get the response and convert to json
         .then((data) => {
            // the data is an array of objects
            this.setState(state => ({questions: data})); 
         })
         .catch((reason) => console.error(reason));
   }

   async handleSubmit(e) {
      e.preventDefault();
      
      try {
         // POST the answer to the server
         fetch(baseUrl2 + '/Answers', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               questionId: this.state._questionId,
               answerText: this.state._answerText
            })
         })
         .then((res) => res.json())
         .then((data) => {
            this.setState(state => ({_message: "Answer posted."}));
         }).catch((reason) => console.error(reason));

         // Update the question to show that it has been answered by first getting the question
         fetch(baseUrl2 + '/Questions/' + this.state._questionId)
         .then((res) => res.json())
         .then((data) => {
            // Up the question in the state
            console.log(data);
            data.questionAnswered = true;
            // PUT the object
            fetch(baseUrl2 + '/Questions/' + data.questionId, {
               method: 'PUT',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(data)
            })
            .then((res) => {
               console.log("PUT", res);
               this.setState(state => ({_message: 'Question updated'}));
            })
            .catch(err => console.error(err));
            
         })
         .catch(err => console.error(err));

      } catch (error) {
         console.error(error);
      }
   }

   render() {
      if (this.props.authorised) {
         return (
            <div className='container'>
               <div>
                  <h1 className="text-primary">Respond</h1>
                  {/* border border-primary  */}
                  <form onSubmit={this.handleSubmit} className="shadow p-3 bg-white rounded">
                     <div className="mb-3">
                     <label className="form-label" htmlFor="questionId">Question Id</label>
                     <input 
                        type="number"
                        className="form-control" 
                        name="questionId"
                        id="questionId" 
                        value={this.state._questionId}
                        onChange={(e) => this.setState({_questionId: e.target.value})}
                     />
                     </div>                  
                     <div className="mb-3">
                        <label className="form-label" htmlFor="answerText">Response</label>
                        <textarea 
                           type="text"
                           className="form-control"
                           id="answerText"
                           name="answerText"
                           value={this.state._answerText}
                           onChange={(e) => this.setState({_answerText: e.target.value})}
                           placeholder="Response"
                        />
                     </div>
                     <button className="btn btn-primary mb-2" type="submit">Reply</button> 
                     <div className="alert alert-info">{this.state._message ? <p>{this.state._message}</p> : null}</div>
                  </form>
               </div>
               <div className="table-responsive">
                  <table className="table table-info table-striped m-2">
                     <thead>
                        <tr>
                           <th scope="col">Question Id</th>
                           <th scope="col">Quester</th>
                           <th scope="col">Question</th>
                           <th scope="col">Date Posted</th>
                           <th scope="col">Answered</th>
                           <th scope="col">Delete?</th>
                        </tr>
                     </thead> 
                     <tbody>
                        {this.state.questions.map((q) => 
                        <Question key={q.questionId} quester={q.quester} 
                        questionId={q.questionId} questionText={q.questionText} questionAnswered={q.questionAnswered} createdDate={q.createdDate}/>)}
                     </tbody>
                  </table>
               </div>
            </div>
         );
      } else {
         return (
            <div className="container">
               <h1 className="text-danger">You are not authorised to view this page.</h1>
            </div>
         );
      }
   }
}

export default Respond;