import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>
        <div style={{ "alignItems": "horizontal" }}>
          <h1>Navbar placeholder</h1>
          <p>pull in different data before navbar</p>
          <p>link to book</p>
        </div>
      </h1>
      <h1>{message}</h1>
    </div>
  );
}

export default App