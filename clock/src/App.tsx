import { useState, useEffect, FC } from "react";
import {
  Container,
  ButtonGroup,
  Button,
  DropdownButton,
  Row,
} from "react-bootstrap";
import "./index.css";
import { gradients } from "./gradient.js";
console.log(gradients);

// A Interface for props of Clock and StopWatch Component
interface DefaultProps {
  show: boolean;
}

// Interface for BackgroundChanger Components
interface GradientObject {
  name: string;
  colors: Array<string>;
}

interface Gradients {
  gradients: Array<GradientObject>;
  changeBackground(color: string): void;
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
          <h1 className="display-4" style={{ fontSize: "3rem" }}>
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h1>
          <h1 className="display-1" style={{ fontSize: "9rem" }}>
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

// Background Color Chnager Component
const BackgroundChanger: FC<Gradients> = ({
  gradients,
  changeBackground,
}): JSX.Element => {
  return (
    <div className="background-changer-button-group">
      <DropdownButton variant="outline-dark" size="sm" title="">
        <Container>
          <Row className="color-menu">
            {gradients.map((gradient, index) => {
              const background = `linear-gradient(-225deg ,${gradient.colors.map(
                (c) => `${c}`
              )})`;
              return (
                <Button
                  className="col-3 color"
                  key={index}
                  onClick={() => {
                    changeBackground(background);
                  }}
                  style={{
                    background: background,
                  }}
                ></Button>
              );
            })}
          </Row>
        </Container>
      </DropdownButton>
    </div>
  );
};

function App() {
  const [showClock, setShowClock] = useState<boolean>(true);
  const [background, setBackground] = useState({
    background: "linear-gradient(-225deg,#69eacb 0%,#eaccf8 48%,#6654f1 100%)",
    backgroundSize: "300% 300%",
  });

  // function to chnage the background gradient
  const changeBackground = (color: string): void => {
    console.log(color);
    setBackground({ background: color, backgroundSize: "400% 400%" });
  };

  return (
    <Container fluid className="main" style={background}>
      <BackgroundChanger
        gradients={gradients}
        changeBackground={changeBackground}
      ></BackgroundChanger>
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
