const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 9123;
const cors = require('cors')
const ConnectDB = require('./Config/DataBase');
const cookieParser = require('cookie-parser')
const Router = require('./Routes/Routes')

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1',Router)

app.get('/',(req,res)=>{
    res.send('Welcome To P Anand Server')
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

ConnectDB()