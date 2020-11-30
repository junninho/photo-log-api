const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

const upload = require('./routes/upload');
const images = require('./routes/images');

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(cors());
app.use(express.json());

const multer = require('multer')();

app.post('/upload', multer.single('file'), upload);

app.get('/images', images);

app.get('/', (req, res) => {
    res.send("API working!");
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})