import bmiCalculator from './calculateBmi_V2'
import exerciseCalculator from './exerciseCalculator_V2'
import express from 'express';

const app = express();
app.use(express.json())
const PORT = 3002;

app.get('/bmi', (req, res) => {
  const weight = req.query.weight
  const height = req.query.height

  try {
    res.send({
      weight: weight,
      height: height,
      bmi: bmiCalculator(weight, height)
    })
  } catch {
    res.send({ error: "malformatted parameters" })
  }
});

app.post('/exercises', (req, res) => {
  const body = req.body
  try {
    res.send(exerciseCalculator(body.daily_exercises, body.target))
  } catch(error) {
    res.send({ error: error })
  }
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});