import { useEffect, useState, useContext} from 'react';
import Header from './components/Header'
import Content from './components/Content'
import Results from './components/Results'
import { createContext } from 'react';
import axios from 'axios';
import './App.css';

export const AppContext = createContext();

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [isReset, setIsReset] = useState(false);
  const [currentTip, setCurrentTip] = useState(""); // Initialize as an empty string
  const [index, setIndex] = useState(0);
  const [fieldEmpty, setFieldEmpty] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [result, setResult] = useState([]);

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

  // Pass currentTip to Content and handleSubmit
  return (
  <>
<AppContext.Provider value={{ isStarted, setIsStarted, gameData, setGameData, isReset, setIsReset, currentTip, setCurrentTip, index, setIndex, fieldEmpty, setFieldEmpty, answers, setAnswers, endGame, setEndGame, result, setResult }}>
    <Header />
    <Content/>
    <Results/>
</AppContext.Provider>
  </>
  );
}

export default App;
