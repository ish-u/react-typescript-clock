import { useState, useEffect } from "react";
import { Container, ButtonGroup, Button } from "react-bootstrap";
import "./index.css";

function App() {
  const [hide, setHide] = useState<boolean>(true);
  const [clock, setClock] = useState(new Date().toLocaleTimeString());
  const [stopwatch, setStopwatch] = useState<number>(0);
  const [stopwatchStatus, setTimerStatus] = useState(false);
  useEffect(() => {
    const t = setInterval(
      (): void => setClock(new Date().toLocaleTimeString()),
      1000
    );
    const timerInterval = setInterval((): void => {
      if (stopwatchStatus) {
        setStopwatch(stopwatch + 1);
      }
    }, 1000);
    return () => {
      clearInterval(t);
      clearInterval(timerInterval);
    };
  }, [stopwatch, stopwatchStatus]);
  return (
    <Container fluid className="clock">
      <div className="group">
        <ButtonGroup>
          <Button
            variant="outline-dark"
            // onClick={(): void => setHide(hide === false ? true : false)}
          >
            <i className="bi bi-alarm"></i>
          </Button>
          <Button
            variant="outline-dark"
            // onClick={(): void => setHide(hide === true ? false : true)}
          >
            <i className="bi bi-clock-history"></i>
          </Button>
        </ButtonGroup>
      </div>
      <div className={!hide ? "hide" : ""}>
        <h1 className="display-1">{clock}</h1>
      </div>
      <div className={hide ? "hide" : ""}>
        <h1 className="display-1">{stopwatch}</h1>
        <ButtonGroup>
          <Button
            variant="outline-dark"
            onClick={() => setTimerStatus(!stopwatchStatus)}
          >
            {"Start"}
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => {
              setTimerStatus(false);
              setStopwatch(0);
            }}
          >
            Reset
          </Button>
        </ButtonGroup>
      </div>
    </Container>
  );
}

export default App;
