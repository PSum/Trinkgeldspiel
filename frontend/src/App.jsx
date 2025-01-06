import { useState } from 'react'
import './App.css'

function App() {
  const [isStarted, setIsStarted] = useState(false);

  function startGame () {
    setIsStarted(true);
  }

  function resetGame () {
    setIsStarted(false);
  }

  function Header () {
    return (
      <>
        <div>
          <button className="btn btn-primary" onClick={startGame}>
            Start game
          </button>
          <button className="btn btn-secondary" onClick={resetGame}>
            Reset game
          </button>
        </div>
        <div>Game started? {isStarted.toString()}</div>
      </>
    );
  }

  function Content ({ gameState }) {
    const gameArea = (
      <>
      <div>test</div>
      </>
    )
    if (gameState == false) {
      return <></>
    } else {
      return gameArea
    }
  }

  return (
    <>
    <Header />
    <Content gameState={isStarted} />
    </>
  );
}

export default App
