import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import axios from 'axios'

export default function Content() {
    const { isStarted, setIsStarted, gameData, setGameData, isReset, setIsReset, currentTip, setCurrentTip, index, setIndex, fieldEmpty, setFieldEmpty, answers, setAnswers, endGame, setEndGame, result, setResult } = useContext(AppContext);

    function handleTipChange(e) {
    setCurrentTip(e.target.value);
    }

    function handleSubmit(e) {
    e.preventDefault();
      if(currentTip == ""){
        console.error("Tip field is empty")
        setFieldEmpty(true);
      } else {
    console.log("Submitted tip:", currentTip);
    setIndex(index + 1)
    setFieldEmpty(false)
    // Add the current Tip to the answers array here. 
    setAnswers([...answers, currentTip])
    setCurrentTip("");
      }
    }

    async function evaluateResults() {
      // answers is player input
      // gameData is base data of the current game
      try {
        const response = await axios.post(
          "http://localhost:3000/api/analyzeGame",
          {
            values: gameData,
            answers: answers,
          }
        );
        console.log(response.data);
        setResult(response.data.meanDeviation)
      } catch (err) {
        console.error("Can't analyze game" + err);
      }
    }

    useEffect(() => {
      if (index >= 5) {
        console.log(index);
        console.log('We reached index 4!');
        setIndex(0);
        // Theres a bug where it only counts to index 4
        setAnswers([]);
        evaluateResults()
        setEndGame(true)
        setIsStarted(false)
      }
    }, [index])

    useEffect(() => {
      console.log(answers)
      console.log(endGame)
    }, [answers])

  const gameArea = (
    <div className="prose flex justify-center flex-col">
      <p>Schätze den Zahlbetrag inklusive Trinkgeld:</p>
      <h1>{gameData && gameData[index]}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          step="0.01"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={currentTip}
          onChange={handleTipChange}
        />
        <button type="submit"></button>
      </form>
      {fieldEmpty && <div className="alert alert-error">"Please enter a number before submitting"</div>}
    </div>
  );

  if (isStarted === false) {
    return <></>;
  } else {
    return gameArea;
  }
}
