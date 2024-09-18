const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r5t@aruna',
    database: 'mentorconnect'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Import and use routes
const mentorRoutes = require('./routes/mentorRoutes');
const menteeRoutes = require('./routes/menteeRoutes');

app.use('/mentee', menteeRoutes);
app.use('/mentor', mentorRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
