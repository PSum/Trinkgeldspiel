import axios from 'axios';

export async function startGame(setGameData) {
  try {
    const response = await axios.get("http://localhost:3000/api/startGame");
    setGameData(response.data.values);
  } catch (err) {
    console.error("Cannot start game: " + err);
  }
}