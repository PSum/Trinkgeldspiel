import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [isReset, setIsReset] = useState(false);
  const [currentTip, setCurrentTip] = useState()

async function startGame(event) {
  event.preventDefault();
  try {
  const response = await axios.get('http://localhost:3000/api/startGame')     
//  console.log(response.data.values);
  setGameData(response.data.values);
  } catch (err) {
    console.error('Can not start game' + err)
  }
}

  // React to gameData updates
  useEffect(() => {
    if (gameData) {
      console.log('gameData has been updated:', gameData);
      setIsStarted(true); // Set game to started when data is updated
    }
  }, [gameData]);

  // React to reset action
  useEffect(() => {
    if (isReset) {
      console.log('Game has been reset');
      setGameData(null); // Clear game data
      setIsStarted(false); // Mark game as not started
      setIsReset(false); // Reset completed
    }
  }, [isReset]);

  function resetGame () {
    setIsReset(true);
    setCurrentTip();
  }

  function Header () {
    return (
      <div className="flex flex-col">
        <div className="flex justify-around">
          <button className="btn btn-primary" onClick={startGame}>
            Start game
          </button>
          <button className="btn btn-secondary" onClick={resetGame}>
            Reset game
          </button>
        </div>
        <div className="flex justify-center">Game started? {isStarted.toString()}</div>
      </div>
    );
  }

  function handleTipChange (e) {
    e.preventDefault
    setCurrentTip(e.target.value)
  }

  return (
    <>
    <Header />
    <Content currentTip={currentTip} gameState={isStarted} handleTipChange={handleTipChange} />
    </>
  );
}


  function Content ({ gameState, handleTipChange, currentTip}) {
    const gameArea = (
      <div>
        <h1>Trinkgeldspiel</h1>
        <p>Schätze den Zahlbetrag inklusive Trinkgeld</p>
        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={currentTip}
          onChange={handleTipChange}
        />
        <div>{currentTip}</div>
      </div>
    );
    if (gameState == false) {
      return <></>
    } else {
      return gameArea
    }
  }
export default App
