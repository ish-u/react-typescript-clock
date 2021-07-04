import { useState, useEffect, FC } from "react";
import { Container, ButtonGroup, Button } from "react-bootstrap";
import "./index.css";

// A Interface for props of Clock and StopWatch Component
interface DefaultProps {
  show: boolean;
}

// Clock Component
const Clock: FC<DefaultProps> = ({ show }): JSX.Element => {
  const [clock, setClock] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const clock = setInterval(
      (): void => setClock(new Date().toLocaleTimeString()),
      1000
    );

    return () => {
      clearInterval(clock);
    };
  }, []);

  return (
    <>
      {show && (
        <div>
          <h1 className="display-1" style={{ fontSize: "8rem" }}>
            {clock}
          </h1>
        </div>
      )}
    </>
  );
};

// StopWatch Component
const StopWatch: FC<DefaultProps> = ({ show }): JSX.Element => {
  const [stopwatch, setStopwatch] = useState<number>(0);
  const [stopwatchStatus, setTimerStatus] = useState(false);
  useEffect(() => {
    const timerInterval = setInterval((): void => {
      if (stopwatchStatus) {
        setStopwatch(stopwatch + 1);
      }
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, [stopwatch, stopwatchStatus]);

  // function to return formatted time in HH:MM:SS when given seconds
  const returnFormattedTime = (seconds: number): string => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };

  return (
    <>
      {!show && (
        <div>
          <h1 className="display-1" style={{ fontSize: "8rem" }}>
            {returnFormattedTime(stopwatch)}
          </h1>
          <br></br>
          <ButtonGroup>
            <Button
              style={{ border: "none" }}
              variant="outline-dark"
              onClick={() => setTimerStatus(!stopwatchStatus)}
            >
              {!stopwatchStatus ? "Start" : "Stop"}
            </Button>
            <Button
              style={{ border: "none" }}
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
      )}
    </>
  );
};

function App() {
  const [showClock, setShowClock] = useState<boolean>(true);

  return (
    <Container fluid className="main">
      <div className="group">
        <ButtonGroup>
          <Button
            variant="outline-dark"
            onClick={() => {
              if (showClock === false) {
                setShowClock(true);
              }
            }}
          >
            <i className="bi bi-clock"></i>
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => {
              if (showClock === true) {
                setShowClock(false);
              }
            }}
          >
            <i className="bi bi-stopwatch"></i>
          </Button>
        </ButtonGroup>
      </div>
      <Clock show={showClock} />
      <StopWatch show={showClock} />
    </Container>
  );
}

export default App;
