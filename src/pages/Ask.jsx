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
        await res.json();
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
    <div className='container flex'>
      {/* form caption */}
      <h1 className='display-1 text-primary'>Ask away</h1>
      {/* border border-primary */}
      <form onSubmit={handleSubmit} className="w-100 shadow p-3 mb-5 bg-white rounded"> 
        <div className='mb-3'>
          <label htmlFor='questionText'>Question</label>
          <textarea
            type="text"
            id='questionText'
            className="form-control"
            value={questionText}
            placeholder="Enter the question here ..."
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
            placeholder="Who's asking the question?"
            onChange={(e) => setQuester(e.target.value)}
          />
        </div>
        <button type="submit" className='btn btn-primary mb-3'>Ask</button>
        { message 
          ? 
          <div id="status" className="alert alert-info p-2">{message}</div>
          :
          null
        }
      </form>
    </div>
  );
}

export default Ask;