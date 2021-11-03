const express = require('express');
const rotas = require('./rotas');
//const cors = require('cors');

const app = express();

app.use(express.json());
//app.use(cors());
app.use(rotas);

app.get('/', async (req, res) => {

  return res.json('ok');
})

app.listen(3000);