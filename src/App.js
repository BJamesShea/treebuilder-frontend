import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputString, setInputString] = useState('');
  const [response, setResponse] = useState(null);
  const [savedTrees, setSavedTrees] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedValues = inputString
        .split(',')
        .map(val => parseInt(val.trim()))
        .filter(val => !isNaN(val));

      await fetch('http://localhost:8080/api/tree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: parsedValues }),
      });

      const tree = await (await fetch('http://localhost:8080/api/tree')).json();
      setResponse(tree);
    } catch (err) {
      alert('Invalid input or server error, oops!');
      console.error(err);
    }
  };

  const fetchSavedTrees = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/tree/all');
      const trees = await res.json();
      setSavedTrees(trees);
    } catch (err) {
      alert('Error fetching saved trees!');
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <h1>Tree Builder Frontend</h1>
      <h4>by: Brandon Shea</h4>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          placeholder='Enter numbers separated by commas - if you dare'
          value={inputString}
          onChange={(e) => setInputString(e.target.value)}
        />
        <br />
        <button type="submit">Submit Tree</button>
      </form>

      <button onClick={fetchSavedTrees}>
        Show Saved Trees
      </button>

      {response && (
        <div className="response-container">
          <h2>Returned Tree:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {savedTrees.length > 0 && (
        <div className="response-container">
          <h2>Saved Trees:</h2>
          <pre>{JSON.stringify(savedTrees, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
