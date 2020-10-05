const express = require('express');
const cors = require("cors");
const app = express();

mongoose = require('mongoose');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect('mongodb://127.0.0.1/bigBoss',{ useUnifiedTopology: true,useNewUrlParser: true, } ,() => {
    console.log('connected to mongodb');
})
mongoose.set('useFindAndModify', false);

app.use(cors());


const competitions= require("./routes/competitions.js");
const users= require("./routes/users.js");
const orders = require("./routes/orders");
const token = require ("./routes/token.js");

 app.use("/token",token)
 app.use("/competitions",competitions);
 app.use('/users',users);
 // app.use("/orders",orders)


const port = 4000
app.listen(port, () => console.log(`listening on port ${port}`))