import React, { useState } from 'react';

function Ask() {
  // Declare the states needed to store the input values, and functions to update those values| questionText, quester
  const [questionText, setQuestionText] = useState("");
  const [quester, setQuester] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // The function to handle the submit action
      let res = await fetch("https://sulfuricqna.azurewebsites.net/api/Questions", {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionText: questionText,
          quester: quester,
          // questionAnswered: false, // this is handled at the server side
          // createdDate: new Date().toISOString() // this is handled at the server side
        })
      });
      // Get the resposnse?
        let resJson = await res.json();
        if (res.status >= 200 && res.status < 300) {
          setQuestionText("");
          setQuester("");
          setMessage("Question Sent :)");
        } else {
          setMessage("Sth happened please ask your question again.")
        }
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div className='container'>
      {/* form caption */}
      <h1>Ask a question</h1>
      <form onSubmit={handleSubmit} className="border border-primary p-5">
        <div className='mb-3'>
          <label htmlFor='questionText'>Question</label>
          <textarea
            type="text"
            id='questionText'
            className="form-control"
            value={questionText}
            placeholder="Question?"
            onChange={(e) => setQuestionText(e.target.value)}
          />
          {/* <div id="questionHelp" class="form-text">Well, you have to type something..</div> */}
        </div>
        <div className='mb-3'>
          <label htmlFor='quester'>Your Name</label>
          <input
            type="text"
            id='quester'
            className="form-control"
            value={quester}
            placeholder="Who's asking?"
            onChange={(e) => setQuester(e.target.value)}
          />
        </div>
        <button type="submit" className='btn btn-primary mb-2'>Ask</button>
        <div className="alert alert-info">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default Ask;