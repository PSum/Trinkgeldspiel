import { useContext, useEffect } from "react";
import { AppContext } from "../App";

export default function Content() {
    const { isStarted, setIsStarted, gameData, setGameData, isReset, setIsReset, currentTip, setCurrentTip } = useContext(AppContext);

    function handleTipChange(e) {
    setCurrentTip(e.target.value);
    }

    function handleSubmit(e, currentTip, setCurrentTip) {
    e.preventDefault();
    console.log("Submitted tip:", currentTip);
    setCurrentTip("");
    }

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
    </div>
  );
  if (isStarted === false) {
    return <></>;
  } else {
    return gameArea;
  }
}
