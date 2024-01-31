'use strict'

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const DBAbstraction = require('./DBAbstraction');

// create an instance of a database
const db = new DBAbstraction('./data/cards.sqlite');

// an object is created to represent the 'express' application
const app = express();

// middleware called with each request to log the requests to the console
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

app.use(express.static('card-memory-game/build'));

app.get('/allCards', async (req, res) => {
    try{
        const cards = await db.getAllCards();

        // double the array to create matching pairs
        let gridOfCards = [];
        for(let j = 0; j < 2; j++){
            for(let i = 0; i < cards.length; i++){
                if(j == 1){
                    gridOfCards.push({...cards[i], id : i+11});
                }
                else{
                    gridOfCards.push(cards[i]);
                }
            }
        }

        // shuffle the deck
        for(let i = gridOfCards.length -1; i > 0; i--){
            let index = Math.floor(Math.random() * (i + 1));
            let temp = gridOfCards[i];
            gridOfCards[i] = gridOfCards[index];
            gridOfCards[index] = temp;
        }
        
        if(cards) {
            res.json(gridOfCards);
        }
        else {
            res.json({"result" : "none"});
        }
    }
    catch (err) {
        res.json({"result" : "none"});
    }
});

app.post('/insertCard', async (req, res) => {
    const title = req.body.title;
    const imgURL = req.body.imgURL;

    await db.insertCard(title, imgURL);
    res.json({"result" : "success"});
});

// more middleware to account for invalid urls
app.use((req, res) => {
    res.status(404).json({badRequest: `${req.url} cannot be found.`});
})

db.init()
    // if the intialization of the database is successfully, start the server
    .then(() => {
        app.listen(53154, () => console.log("The server is up and running..."));
    })
    // if the initalization is unsuccessful, do not start the server and print the error
    .catch(err => {
        console.log("There was a problem opening the database.");
        console.log(err);
    })

