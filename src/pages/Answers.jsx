
import React, {useEffect, useState} from "react";
const axios = require('axios').default;
const baseUrl = "https://sulfuricqna.azurewebsites.net/api";

function Answer(props) {
   // const pprops = JSON.
   const [questionText, setQuestionText] = useState(null);
   const [quester, setQuester] = useState(null);

   // use question Id to get Question   
   React.useEffect(() => {
      let questionId = props.questionId;
      // console.log("QID", questionId);
      axios.get(baseUrl + "/Questions/" + questionId).then((res) => {
         setQuestionText(res.data.questionText);
         setQuester(res.data.quester);
      })
   }, []);


   let answer = (
   <div className="answer">
      <span className="quester">{quester}</span>
      <span className="questionText">{questionText}</span>
      <span className="answerText">{props.answerText}</span>
   </div>);

   let answer2 = (
      <div className="card shadow p-3 mb-3 bg-white rounded"   >
         <div className="card-body">
         <h5 className="card-title">Answer to {quester}'s question</h5>
            <p className="card-text">Q: {questionText}</p>
            <p className="card-text">A: {props.answerText}</p>
         </div>
      </div>
   );

   return answer2;
}

function Answers() {
   const [data, setData] = useState(null);

   useEffect(() => {
      axios.get(baseUrl + "/Answers").then((res) => {
         setData(res.data);
      })
   }, []);

   if (!data) return (
      <div className="container text-primary" role="status">
         <h2 className="">Checking if he's answered any questions...
         <br />
         <small className="text-muted">It could be that the internet is slow: give it 15-ish seconds</small>
         </h2>
      </div>
   );

   // prepare the element to render
   return (
      <div className="container">
         <h1 className="text-primary">Responses</h1>
         {/* border border-primary */}
         <div className="container p-3 mb-5">
            <ul>
               {data.map((ans) => <Answer 
               key={ans.answerId} 
               answerText={ans.answerText} 
               questionId={ans.questionId} />)}
            </ul>
         </div>
      </div>
   );
}

export default Answers;