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
        <div>
          <ul>
            <li><a href="/pages/home.js">Home</a></li>
            <li><a href="/pages/about.js">About</a></li>
            <li><a href="/pages/poetry.js">Poems</a></li>
          </ul>
        </div>
      </h1>
      <h1>{message}</h1>
    </div>
  );
}

export default App