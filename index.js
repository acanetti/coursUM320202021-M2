'use strict'

var express = require('express');
var app = express();

const port = process.env.PORT || 3000 ;

var fetch = require('node-fetch');
var https = require('https');


var cors = require('cors');

var corsOptions = {
    origin: 'https://natoine.github.io',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

//serves static files
app.use(express.static('docs'));


//ROUTES

app.get("/:name", function(req, res){
    res.send("hello : " + req.params.name );
})

app.get("/fetchair/shangai", cors(corsOptions), function(req, res){
    let url = "http://api.waqi.info/feed/shanghai/?token=demo" ;
    fetch(url)
    .then(res => res.json())
    .then(json => {
        console.log("fetchair", json);
        res.send("data fetched look your console");
    });
})

app.get("/requestair/shangai", function(req, res){
    let url = "https://api.waqi.info/feed/shanghai/?token=demo" ;
    https.get(url, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
         });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log("requestair", JSON.parse(data));
            res.send("data requested look your console");
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send("nope request didnt work");
    });
})

app.listen(port, function () {
    console.log('Serveur listening on port ' + port);
});