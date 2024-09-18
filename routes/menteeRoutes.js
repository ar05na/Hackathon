const express = require('express');
const router = express.Router();
const db = require('../models/db');
router.get('/profile', (req, res) => {
    res.send('Mentee profile');
  });
  
router.post('/signup', (req, res) => {
    const { username, password, email } = req.body;
    db.query('INSERT INTO mentees (username, password, email) VALUES (?, ?, ?)', [username, password, email], (err) => {
        if (err) {
            console.error('Error signing up mentee:', err);
            return res.status(500).send('Error signing up');
        }
        res.send('Mentee signed up successfully');
    });
});

router.post('/signin', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM mentees WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            console.error('Error signing in mentee:', err);
            return res.status(500).send('Error signing in');
        }
        if (results.length > 0) {
            res.send('Successfully logged in');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

module.exports = router;
