import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  const [key, setKey] = useState("");
  const [keyWs, setKeyWs] = useState("");
  const [valid, setValid] = useState(true);
  const [validWs, setValidWs] = useState(true);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:3001/ws");
    ws.current.onopen = () => {
      console.log("ws opened");
      // listen for changes
      ws.current.onmessage = (e) => {
        const { data } = e;
        let message = "";
        if(data) {
          message = JSON.parse(data).value;
        }
        setData(message)
      };
    };
    ws.current.onclose = () => console.log("ws closed");

    return () => {
      ws.current.close();
    };
  }, []);

  const onChange = (e) => {
    const { value } = e.target;
    if (isNumber(value) && isValidNumber(value)) {
      setValid(true);
      setKey(value.trim());
    } else {
      setValid(false);
      setKey("");
      setData("");
    }
  };

  const onChangeWs = (e) => {
    const { value } = e.target;
    if (!ws.current) return;
    if (isNumber(value) && isValidNumber(value)) {
      setValidWs(true);
      const trimmedValue = value.trim();
      setKeyWs(trimmedValue);
      ws.current.send(trimmedValue);
    } else {
      setValidWs(false);
      setKeyWs("");
      setData("");
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
            setData(data.value);
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
        <h1>Home Assignment - ChangeHealtcare</h1>
        <label>WebSocket Example</label>
        <p>
          <input
            type="text"
            placeholder="Input number from 1 to 1000"
            value={keyWs}
            onChange={onChangeWs}
            className={validWs ? "" : "invalid"}
          />
        </p>
        <label>Rest Example</label>
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
