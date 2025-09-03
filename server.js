import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // serve index.html
app.use(express.json());

const FILE_PATH = path.join('data.txt');

app.post('/update', (req, res) => {
  const { number } = req.body;
  fs.writeFile(FILE_PATH, number.toString(), (err) => {
    if (err) return res.status(500).send('Error writing file');
    res.send('OK');
  });
});

app.get('/read', (req, res) => {
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) return res.send('No number yet.');
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
