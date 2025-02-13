const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


router.get('/', async (req, res) => {
    try {
        const data = await prisma.score.findMany({})
        res.status(200).send(data);

  } catch (err) {
    console.log(err);
    res.status(500).send('There has been an error' + err)
  }
})

router.get('/startGame', (req, res) => {
    try {
      const max = 100;
      const min = 2;
      const amount = 5;
      const values = [];
      for (let i = 1; i <= amount; i++) {
        const value = (Math.random() * (max - min) + min).toFixed(1);
        values.push(Number(value));
      }
      res.send({ values: values });
    } catch (err) {
      console.error(err);
      res.status(500).send(`There has been an error: ${err.message}`);
    }
})

router.post("/analyzeGame", (req, res) => {
  try {
    const { values, answers } = req.body;
    const analyzedData = [];
    let meanDeviation = 0;
    values.forEach((istWert, index) => {
      istWert = parseFloat(istWert);
      const playerInput = parseFloat(answers[index]);
      const sollWert = (istWert * 1.1).toFixed(1); // 10 % Trinkgeld soll gegeben werden
      const AbweichungProzent =
        (((((playerInput - sollWert) / istWert) * 100) ** 2) ** 0.5).toFixed(1);
        // console.log(`Das Trinkgeld soll für den Betrag ${istWert} € berechnet werden \n Der richtige Wert wäre: ${sollWert} € \n Der Spieler hat ${playerInput} € geschätzt - Die Abweichung liegt damit bei ${AbweichungProzent} %`)
        analyzedData.push(AbweichungProzent);
        meanDeviation += (parseFloat(AbweichungProzent))
        console.log(meanDeviation)
    }
);
// Change code so it sends the analyzed data to the user
      meanDeviation = (meanDeviation/5).toFixed(2)
      const deviationTo10 = ((10-meanDeviation)**2)**0.5
      res.status(200).send({deviation: analyzedData, meanDeviation: meanDeviation, deviationTo10: deviationTo10});

  } catch (err) {
    console.error(err);
    res.status(500).send(`There has been an error: ${err.message}`);
  }
});

router.post('/addScore', async (req, res) => {
    try {
        const {username, score} = req.body;
        const data = await prisma.score.create({
            data: {
            username: username,
            Score: score
            }
        })
        res.status(201).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('There has been an error')
    }
})

module.exports = router;