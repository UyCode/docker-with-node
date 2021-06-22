const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config.js');

mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?
authSource=admin`)
    .then(() => {
        console.log("successfully connected to MongoDB");
    }).catch(err => console.log(err));


const port = process.env.PORT || 3000
//const host = '192.168.31.231';






app.get("/", function (req, res) {
    res.send("<h1>Hi There!!!</h1>");
});

app.listen(port, () => {
    console.log(`listining on port: ${port}`);
})
