const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 4000;
mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require("dotenv").config();

/* mongoose.set("useCreateIndex", true);
async function connecting() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/bigBoss", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to the DB");
  } catch (error) {
    console.log(error);
    console.log(
      "ERROR: Seems like your DB is not running, please start it up !!!"
    );
  }
}  */

 async function connecting(){
try {
    await mongoose.connect('mongodb+srv://Christopher29:Bauervapor8@cluster0.nruby.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority',
 { useUnifiedTopology: true , useNewUrlParser: true }) 
   console.log('Connected to the DB')
} catch ( error ) {
    console.log('ERROR: Seems like your DB is not running, please start it up !!!');
}
} 

connecting();
mongoose.set("useCreateIndex", true);

app.use(cors());
const competitions = require("./routes/competitions.js");
const users = require("./routes/users.js");
const orders = require("./routes/orders");
const token = require("./routes/token.js");
const coupons = require("./routes/coupons.js");
const admin = require("./routes/admin.js");
const faq = require("./routes/faq.js");

app.use("/token", token);
app.use("/competitions", competitions);
app.use("/users", users);
app.use("/coupons", coupons);
app.use("/orders", orders);
app.use("/admin", admin);
app.use("/faq", faq);

const path = require('path');
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log(`listening on port ${port}`));
