import { useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { AppContext } from '../App';

export default function Header() {
    const { isStarted, setIsStarted, gameData, setGameData, isReset, setIsReset, currentTip, setCurrentTip, index, setIndex, fieldEmpty, setFieldEmpty, answers, setAnswers } = useContext(AppContext);

function resetGame() {
  setIsReset(true);
  setCurrentTip("");
  setAnswers([]);
}
  return (
    <div className="flex flex-col prose">
      <h1 className="flex justify-center m-0">Trinkgeldspiel</h1>
      <div className="flex justify-around">
        <button className="btn btn-primary" onClick={(event) => startGame(event, setGameData)}>
          Start game
        </button>
        <button className="btn btn-secondary" onClick={(event) => {resetGame()}}>
          Reset game
        </button>
      </div>
      <div className="flex justify-center">
        Game started? {isStarted.toString()}
      </div>
    </div>
  );
}

async function startGame(event, setGameData) {
  event.preventDefault();
  try {
    // wrap this into a separate file an make it available everywhere
    const response = await axios.get("http://localhost:3000/api/startGame");
    setGameData(response.data.values);
  } catch (err) {
    console.error("Cannot start game: " + err);
  }
}
