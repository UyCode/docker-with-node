const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require("express-session");
const redis = require('redis');

let RedisStore = require('connect-redis')(session);


const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config.js');


let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
let isConnected = false;
const connectWithRetry = () => {
    if(!isConnected) {
        mongoose
            .connect(mongoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
            .then(() => {
                isConnected = true;
                console.log("successfully connected to MongoDB");
            }).catch((err) => console.log(err));
        setTimeout(connectWithRetry, 5000);
    }
}

connectWithRetry();
app.use(express.json());

const port = process.env.PORT || 3000
//const host = '192.168.31.231';


app.get("/", function (req, res) {
    res.send("<h1>Hi There!!!</h1>");
});

const postRouter = require("./routes/postRoutes.js");
const userRouter = require("./routes/userRoutes.js");

app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 60000
    }
}));

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})
