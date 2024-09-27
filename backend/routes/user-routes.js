const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
    res.send("Sign Up")
})

router.post('/login', (req, res) => {
    res.send("Login")
})

module.exports = router;