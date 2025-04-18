import React, { useState} from 'react';
import './App.css';



function App() {
  const [inputString, setInputString] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedValues = inputString
      .split(',')
      .map(val => parseInt(val.trim()))
      .filter(val => !isNaN(val));

     await fetch('http://localhost:8080/api/tree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ values : parsedValues}),
      });

      const tree = await (await fetch('http://localhost:8080/api/tree')).json();
      setResponse(tree);

    }
     catch (err) {
      alert('Invalid JSON or server error, oops!');
      console.error(err);
    }


  };



  return (
    <div className="app-container">
      <h1>Tree Builder Frontend</h1>
      <form onSubmit={handleSubmit}>
        <textarea
        rows="4"
        cols="50"
        placeholder='Enter numbers separated by commas'
        value={inputString}
        onChange={(e) => setInputString(e.target.value)}
        />
        <br/>
        <button type="submit">Submit Tree</button>
      </form>

      {response && (
        <div className="response-container">
          <h2>Returned Tree:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

    </div>
  );
}

export default App;
