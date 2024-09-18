const express = require('express');
const router = express.Router();
const db = require('../models/db');
router.get('/profile', (req, res) => {
    res.send('Mentor profile');
  });
  // Mentor dashboard route
router.get('/dashboard', (req, res) => {
    res.sendFile('mentordashboard.html', { root: './public' });
});


router.post('/signup', (req, res) => {
    const { fullname, username, email, password, gender } = req.body;
    db.query('INSERT INTO mentors (full name,username, email, password, gender) VALUES (?, ?, ?, ?, ?)', [fullname, username, email,password, gender], (err) => {
        if (err) {
            console.error('Error signing up mentor:', err);
            return res.status(500).send('Error signing up');
        }
        res.send('Mentor signed up successfully');
    });
});

router.post('/signin', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM mentors WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            console.error('Error signing in mentor:', err);
            return res.status(500).send('Error signing in');
        }
        if (results.length > 0) {
            return res.redirect('/mentor/dashboard');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

module.exports = router;
