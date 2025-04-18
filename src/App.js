import React, { useState} from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(jsonInput);

      await fetch('http://localhost:8080/api/tree', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(parsed),
      });

      const getRes = await fetch('http://localhost:8080/api/tree');
      const tree = await getRes.json();
      setResponse(tree);

    }
     catch (err) {
      alert('Invalid JSON or server error, oops!');
      console.error(err);
    }


  };



 // styling ideas (note to self)
    // centered, light tan/paper background, orange-ish text box
    // hover buttons




  return (
    <div style={{ padding: "2rem" }}>
      <h1>Tree Builder Frontend</h1>
      <form onSubmit={handleSubmit}>
        <textarea
        rows="10"
        cols="60"
        placeholder='Paste JSON like: {"value":"A","left":{"value":"B"},"right":{"value":"C"}}'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        />
        <br/>
        <button type="submit">Submit Tree</button>
      </form>

      {response && (
        <div>
          <h2>Returned Tree:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

    </div>
  );
}

export default App;
