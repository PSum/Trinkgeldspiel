import { useContext, useEffect } from "react";
import { AppContext } from "../App";

export default function Content() {
    const { isStarted, setIsStarted, gameData, setGameData, isReset, setIsReset, currentTip, setCurrentTip, index, setIndex, fieldEmpty, setFieldEmpty } = useContext(AppContext);

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
    setCurrentTip("");
    setIndex(index + 1)
    setFieldEmpty(false)
      }
    }

  const gameArea = (
    <div className="prose flex justify-center flex-col">
      <p>Schätze den Zahlbetrag inklusive Trinkgeld:</p>
      <h1>{gameData && gameData[index]}</h1>
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
      {fieldEmpty && <div className="alert alert-error">"Please enter a number before submitting"</div>}
    </div>
  );
  if (isStarted === false) {
    return <></>;
  } else {
    return gameArea;
  }
}
