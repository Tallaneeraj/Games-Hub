
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require('dotenv').config()
const cors = require('cors');
const dbUserName = process.env.dbUserName
const dbPassword = process.env.dbPassword
const session = require('express-session');
const Passport = require('passport');

// MiddleWare
app.use(express.json());
app.use(session({
    secret: 'my-secret-key',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false } // set to true if using HTTPS
  }));
const corsOptions = {
    origin: 'http://local:4000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}; 
app.use(cors(corsOptions));
app.use(Passport.initialize());
app.use(Passport.session());
  

var url = "mongodb://" +dbUserName+ ":" + dbPassword + "-vvhk5pz-shard-00-00.qt68uzr.mongodb.net:27017,ac-vvhk5pz-shard-00-01.qt68uzr.mongodb.net:27017,ac-vvhk5pz-shard-00-02.qt68uzr.mongodb.net:27017/?ssl=true&replicaSet=atlas-caarjd-shard-0&authSource=admin&retryWrites=true&w=majority";
async function connect(){
    try{
        await mongoose.connect(url,{useNewUrlParser: true});
        console.log("Connected to the Database. Yayzow!");
    }
    catch (error){
        console.log(error);
    }
}

connect();

app.get("/", (req,res) => {
    res.sendFile("Games-Hub\Client\games-hub\public\index.html")
})

app.listen(4000, () => {
    console.log("at 4000");
    //console.log(process.env.dbUserName, process.env.dbPassword);
})