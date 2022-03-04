const express=require('express')
const app=express();
var router = express.Router();
const mongoose=require('mongoose')
var bodyParser = require('body-parser');
// var router = express.Router();
var appRoutes = require("./route/api")(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/Hello")

app.use('/api',appRoutes);

app.listen(9001);