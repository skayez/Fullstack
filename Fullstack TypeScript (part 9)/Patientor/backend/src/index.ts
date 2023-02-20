import express from 'express';
import diagnoseRouter from './routes/diagnosesRouter'
import patientsRouter from './routes/patientsRouter'
const cors = require('cors')

const app = express();
const PORT = 3001;

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.use(cors())
app.use(express.json());
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});