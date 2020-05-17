const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose'); //help connect to MongoDB 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); //middleware

const uri = process.env.ATLAS_URI; //Whats a uri?
mongoose.connect(uri, { //some flags to use the new updates
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection successfully established');
});

const exercisesRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', userRouter);

app.listen(port, ()=> {
    console.log(`Server is now running on port: ${port}`);
});

//cmd -> nodemon server
//how does it know to know to run `node server.js`