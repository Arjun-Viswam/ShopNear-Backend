const express = require('express')
const port = 5550
var cookieParser = require("cookie-parser")
var morgan = require('morgan')
var cors = require('cors')
var db = require("./config/connection")
require('dotenv').config()

var app = express()

// config middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors())


var userRouter = require('./routes/user')
var adminRouter = require('./routes/admin')
var merchantRouter = require('./routes/merchant')

app.use('/',userRouter);
app.use('/admin',adminRouter);
app.use('/merchant',merchantRouter)

db.connect((err) => {
    if (err) console.log("Connection Error" + err);
    else console.log("Database Connected");
  });

app.listen(port, function(error){
    if (error) {
        console.log("Something went wrong", error);
    } else {
        console.log(`Server is listening on port ${port}`);
    }
}) 