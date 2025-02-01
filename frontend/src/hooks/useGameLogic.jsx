import { useEffect } from "react";

export function useGameLogic(gameData, setIsStarted, isReset, setGameData, setIsStarted, setIsReset) {
    // Effect for handling game start when data updates
    useEffect(() => {
        if (gameData) {
            console.log("gameData has been updated:", gameData);
            setIsStarted(true); // Set game to started when data is updated
        }
    }, [gameData, setIsStarted]);

    // Effect for handling game reset
    useEffect(() => {
        if (isReset) {
            console.log("Game has been reset");
            setGameData(null); // Clear game data
            setIsStarted(false); // Mark game as not started
            setIsReset(false); // Reset completed
        }
    }, [isReset, setGameData, setIsStarted, setIsReset]);
}
