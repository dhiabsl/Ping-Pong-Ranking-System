const express = require('express')
const BodyParser = require('body-parser')
const CRUD = require('./routes/CRUD');
const app = express();
const port = process.env.PORT;
const cors = require('cors');

app.use(cors());

app.use(BodyParser.json())
app.use('/CRUD',CRUD);


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server is Running on PORT : ${port}`))