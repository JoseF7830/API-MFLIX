require('dotenv').config()
const express = require('express');

const connectDatabase = require('./database');

const app = express();

app.use(express.json());

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

app.post('/', async function(req, res){
    console.log(req.body);
    const body = req.body.chat_log[req.body.chat_log.length-1].text;
   
    const database = await connectDatabase();
    const collection = database.collection(process.env.COLLECTION_NAME);
    const findResult = await collection.find({ title: body }).toArray();
    // res.json(findResult);
    if(findResult.length == 0){
        res.json({"response":{
            "text": ["Disculpa no he encontrado la pelicula que buscas."],
            "response_type": "TEXT",
            "response_options": [],
            "stopChat": true
        }});
    }else{
        res.json({"response":{
            "text": [`Encontre la pelicula titulada ${findResult[0].title}, con año de lanzamiento ${findResult[0].year}`],
            "response_type": "TEXT",
            "response_options": [],
            "stopChat": true
        }});
        }
})

// app.get('/hola', (req, res) => {
//     res.send({ message: 'Hola mundo' })
// })

app.listen(process.env.PORT, function() {
    console.log('Server is running on port 8080');
});