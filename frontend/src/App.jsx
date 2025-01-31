import { useEffect, useState, useContext} from 'react';
import Header from './functions/Header'
import { createContext } from 'react';
import axios from 'axios';
import './App.css';

export const AppContext = createContext();

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [isReset, setIsReset] = useState(false);
  const [currentTip, setCurrentTip] = useState(""); // Initialize as an empty string
  const [test, setTest] = useState("This is test 1");
  const [test2, setTest2] = useState("This is test 2");


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



  function handleTipChange(e) {
    setCurrentTip(e.target.value);
  }

  // Pass currentTip to Content and handleSubmit
  return (
  <>
<AppContext.Provider value={{ isStarted, setGameData, setIsReset, setCurrentTip }}>
    <Header />
    <Content
      currentTip={currentTip}
      setCurrentTip={setCurrentTip}
      gameState={isStarted}
      handleTipChange={handleTipChange}
      handleSubmit={(e) => handleSubmit(e, currentTip, setCurrentTip)} // Pass currentTip here
    />
</AppContext.Provider>
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
    <div className="prose flex justify-center flex-col">
      <p>Schätze den Zahlbetrag inklusive Trinkgeld</p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={currentTip}
          onChange={handleTipChange}
        />
        <button type="submit"></button>
      </form>
      {
        //      <div>{useContext(isStartedContext).value1}</div>
        //      <div>{useContext(isStartedContext).value2}</div>
      }
    </div>
  );
  if (gameState === false) {
    return <></>;
  } else {
    return gameArea;
  }
}

export default App;
