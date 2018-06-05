const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});


const app = express();

const userRoute = require('./routes/userRoute');

const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

require('./config/passport')(passport);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/users', userRoute);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});