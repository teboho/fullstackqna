import React, { Fragment } from "react";

const baseUrl = "https://sulfuricqna.azurewebsites.net";

class Question extends React.Component {
   constructor(props) {
      super(props);
   }

   render () {
      return (
         <tr><td>{this.props.questionId}</td><td>{this.props.quester}</td><td>{this.props.questionText}</td></tr>
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
         _answerText: ""
      };
   }

   componentDidMount() {
      fetch(baseUrl + '/api/Questions')
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            // the data is an array of objects
            this.setState(state => ({questions: data})); 
         })
         .catch((reason) => console.error(reason));
   }

   async handleSubmit(e) {
      console.log("handleSubmit");
      e.preventDefault();
      
      try {
         let res = await fetch(baseUrl + '/api/Answers', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               questionId: this.state._questionId,
               answerText: this.state._answerText
            })
         });
   
         let resJson = await res.json();
         console.log(resJson);

         if (res.status >= 200 && res.status < 300) {
            this.setState(state => ({
               _questionId: 0,
               _answerText: "",
               _message: "Answer Sent :)"
            }));
         } else {
            this.setState(state => ({
               _message: "Sth happend."
            }));
         }
      } catch (error) {
         console.error(error);
      }
   }

   render() {
      console.log(this.state.questions);

      return (
         <div className='container'>
            <div>
               <h1>Respond</h1>
               <form onSubmit={this.handleSubmit} className="border border-primary p-3">
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
            <div className="questionsList">
               <table className="table table-info table-striped m-2">
                  <thead>
                     <tr>
                        <th scope="col">Question Id</th>
                        <th scope="col">Quester</th>
                        <th scope="col">Question</th>
                     </tr>
                  </thead> 
                  <tbody>
                     {this.state.questions.map((q) => <Question key={q.questionId} quester={q.quester} questionId={q.questionId} questionText={q.questionText}/>)}
                  </tbody>
               </table>
            </div>
         </div>
      );
   }
}

export default Respond;