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
      let res = await fetch("https://sulfuricqna.azurewebsites.net/api/Questions",{
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionText: questionText,
          quester: quester
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
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          value={questionText}
          placeholder="Question?"
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <input
          type="text"
          value={quester}
          placeholder="Who's asking?"
          onChange={(e) => setQuester(e.target.value)}
        />
        <br />
        <button type="submit">Ask</button>
        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default Ask;