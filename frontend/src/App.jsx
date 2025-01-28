import { useEffect, useState, useContext} from 'react';
import { createContext } from 'react';
import axios from 'axios';
import './App.css';

const isStartedContext = createContext(false);

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [isReset, setIsReset] = useState(false);
  const [currentTip, setCurrentTip] = useState(""); // Initialize as an empty string
  const [test, setTest] = useState("This is test 1");
  const [test2, setTest2] = useState("This is test 2");

  async function startGame(event) {
    event.preventDefault();
    try {
      const response = await axios.get("http://localhost:3000/api/startGame");
      setGameData(response.data.values);
    } catch (err) {
      console.error("Cannot start game: " + err);
    }
  }

  // React to gameData updates
  useEffect(() => {
    if (gameData) {
      console.log("gameData has been updated:", gameData);
      setIsStarted(true); // Set game to started when data is updated
    }
  }, [gameData]);

  // React to reset action
  useEffect(() => {
    if (isReset) {
      console.log("Game has been reset");
      setGameData(null); // Clear game data
      setIsStarted(false); // Mark game as not started
      setIsReset(false); // Reset completed
    }
  }, [isReset]);

  function resetGame () {
    setIsReset(true);
    setCurrentTip("");
  }

  function Header() {
    return (
      <div className="flex flex-col prose">
        <h1 className="flex justify-center m-0">Trinkgeldspiel</h1>
        <div className="flex justify-around">
          <button className="btn btn-primary" onClick={startGame}>
            Start game
          </button>
          <button className="btn btn-secondary" onClick={resetGame}>
            Reset game
          </button>
        </div>
        <div className="flex justify-center">
          Game started? {isStarted.toString()}
        </div>
      </div>
    );
  }

  function handleTipChange(e) {
    setCurrentTip(e.target.value);
  }

  // Pass currentTip to Content and handleSubmit
  return (
    <>
    <isStartedContext.Provider value={{"value1":test, "value2":test2}}>
      <Header />
      <Content
        currentTip={currentTip}
        setCurrentTip={setCurrentTip}
        gameState={isStarted}
        handleTipChange={handleTipChange}
        handleSubmit={(e) => handleSubmit(e, currentTip, setCurrentTip)} // Pass currentTip here
      />
</isStartedContext.Provider>
    </>
  );
}

function handleSubmit(e, currentTip, setCurrentTip) {
  e.preventDefault();
  console.log("Submitted tip:", currentTip);
  setCurrentTip("");
}

function Content({ gameState, handleTipChange, currentTip, handleSubmit, setCurrentTip}) {
  const gameArea = (
    <div className='prose flex justify-center flex-col'>
      <p>Schätze den Zahlbetrag inklusive Trinkgeld</p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={currentTip}
          onChange={handleTipChange}
        />
        <button type="submit">
          
        </button>
      </form>
      <div>{useContext(isStartedContext).value1}</div>
      <div>{useContext(isStartedContext).value2}</div>
    </div>
  );
  if (gameState === false) {
    return <></>;
  } else {
    return gameArea;
  }
}

export default App;
