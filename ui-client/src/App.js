import React, { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  const [key, setKey] = useState("");
  const [valid, setValid] = useState(true);

  const onChange = (e) => {
    const { value } = e.target;
    if (isNumber(value) && isValidNumber(value)) {
      setValid(true);
      setKey(value.trim());
    } else {
      setValid(false);
      setKey("");
    }
  };

  const isValidNumber = (value) => {
    if (value > 0 && value <= 1000) {
      return true;
    }
    return false;
  };

  const isNumber = (value) => {
    if (
      value &&
      !isNaN(value) &&
      value.length !== 0 &&
      value.trim().length !== 0
    ) {
      return true;
    }
    return false;
  };

  const onClick = () => {
    if (isNumber(key) && isValidNumber(key)) {
      fetch(`${process.env.REACT_APP_CLIENT_ARRAYS_SERVICE}/arrays/${key}`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          ({ data }) => {
            setData(JSON.stringify(data.value));
          },
          (error) => {
            console.log("Ooops ", error);
          }
        );
    } else {
      console.log("Invalid number");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <label>Home Assignment - ChangeHealtcare</label>
        <p>
          <input
            type="text"
            placeholder="Input number from 1 to 1000"
            value={key}
            onChange={onChange}
            className={valid ? "" : "invalid"}
          />
          <button className="App-button" onClick={onClick}>
            SEND
          </button>
        </p>
        <label>Result:</label>
        <p>
          <textarea rows="10" value={data} disabled></textarea>
        </p>
      </header>
    </div>
  );
}

export default App;
