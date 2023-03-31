const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.i4cqwjk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



app.get('/', (req, res) => {
    res.send('server start')
})

app.listen(port, () => {
    console.log('server running on port ', port);
})