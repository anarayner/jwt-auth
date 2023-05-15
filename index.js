require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const PORT = process.env.PORT || 5001

const authRouter = require('./authRouter')
const app = express()
app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json())
app.use('/api', authRouter)
const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://whileanaray:fGh6kxeYRIuFRcdN@cluster0.levnwxw.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(`Server started on ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()


module.exports = app
