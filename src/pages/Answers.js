
import React, {useState} from "react";
const axios = require('axios').default;

const baseUrl = "https://sulfuricqna.azurewebsites.net/api";

function Answer(props) {
   // const pprops = JSON.
   const [questionText, setQuestionText] = useState(null);
   const [quester, setQuester] = useState(null);

   // use question Id to get Question   
   React.useEffect(() => {
      let questionId = props.questionId;
      console.log(questionId);
      axios.get(baseUrl + "/Questions/" + questionId).then((res) => {
         setQuestionText(res.data.questionText);
         setQuester(res.data.quester);
      })
   }, []);


   let answer = <div className="answer">
      <span className="quester">{quester}</span>
      <span className="questionText">{questionText}</span>
      <span className="answerText">{props.answerText}</span>
   </div>;

   return answer // <li>{props.answerText}</li>
}

function Answers() {
   const [data, setData] = useState(null);

   React.useEffect(() => {
      axios.get(baseUrl + "/Answers").then((res) => {
         setData(res.data);
      })
   }, []);

   if (!data) return <h1>There are no answers at the moment</h1>;


   // prepare the element to render
   return (
      <div>
         <h1>Answers</h1>
         <div className="scroll">
            <ul>
               {data.map((ans) => <Answer key={ans.answerId} answerText={ans.answerText} questionId={ans.questionId}/>)}
               {/* {<Answer data={JSON.stringify(data[0])} />} */}
            </ul>
         </div>
      </div>
   );
}

export default Answers;