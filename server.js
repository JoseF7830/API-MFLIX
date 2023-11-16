require('dotenv').config()
const express = require('express');

const connectDatabase = require('./database');

const app = express();

app.get('/', async function(req, res) {
    const query = req.query;
    const database = await connectDatabase();
    const collection = database.collection(process.env.COLLECTION_NAME);
    const findResult = await collection.find({ title: query.movieName }).toArray();
    // res.json(findResult);
    res.json({"response":{
        "text": [`Encontre la pelicula titulada ${findResult[0].title}, con año de lanzamiento ${findResult[0].year}`],
        "response_type": "TEXT",
        "response_options": [],
        "stopChat": true
    }});
});

// app.get('/hola', (req, res) => {
//     res.send({ message: 'Hola mundo' })
// })

app.listen(process.env.PORT, function() {
    console.log('Server is running on port 8080');
});