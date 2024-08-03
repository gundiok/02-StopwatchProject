import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const startTimeRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [timerRunning]);

  function Start() {
    setTimerRunning(true);
    startTimeRef.current = Date.now() - time;
  }

  function Stop() {
    setTimerRunning(false);
  }

  function Reset() {
    setTime(0);
    setTimerRunning(false);
  }

  function formattedTime() {
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let seconds = Math.floor((time / 1000) % 60);
    let milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <>
      <div className="stopwatch-display">{formattedTime()}</div>
      <div className="button-container">
        <button className=" btn start-btn" onClick={Start}>
          Start
        </button>
        <button className="btn stop-btn " onClick={Stop}>
          Stop
        </button>
        <button className=" btn reset-btn" onClick={Reset}>
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
