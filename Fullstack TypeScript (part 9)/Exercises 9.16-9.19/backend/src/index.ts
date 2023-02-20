import express from 'express';
import diaryRouter from './routes/diaries';

const app = express();
const cors = require('cors')
const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use(cors())
app.use(express.json());
app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});