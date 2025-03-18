import { useContext, useEffect } from "react";
import { AppContext } from "../App";

export default function Results () {
    const { isStarted, setIsStarted, gameData, setGameData, isReset, setIsReset, currentTip, setCurrentTip, index, setIndex, fieldEmpty, setFieldEmpty, answers, setAnswers, endGame, setEndGame, result, setResult } = useContext(AppContext);


  if (endGame === false) {
    return <></>;
  } else {
    // find out why this leads to an error
    return (
   <>
   <div className="prose">
   <h2>Score:</h2>
   <h3>Deine Schätzung weicht zu {result} % vom Standard Trinkgeld ab</h3>
</div>
</> )
  }
}