const express=require('express')
const app=express();
var router = express.Router();
const morgan = require('morgan');
const mongoose=require('mongoose')
var bodyParser = require('body-parser');
var appRoutes = require("./route/api")(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/Hello")
const conn = mongoose.connection
console.log('contion succesfully')

app.use('/api',appRoutes);
app.use('/uploads',express.static('uploads'));
app.use(morgan('dev'));

app.listen(9011,function(){
    console.log('port run suceesfuly')
});