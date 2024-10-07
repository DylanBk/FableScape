const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const db = require('../utils/db-functions.js');


// --- SIGN UP ---
router.post('/signup', async (req, res) => {
    const {email, username, password} = await req.body;

    try {
        let user_check = db.check_if_user_exists(email);
        console.log(user_check)

        if (user_check) {
            return res.status(400).json({ message: "User Already Exists" });
        } else {
            const user_data = [email, username, password];
            db.create_user(user_data);

            res.redirect('/');
        }
    } catch(err) {
        console.error(`Error: ${err}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// --- LOGIN ---
router.post('/login', async (req, res) => {
    let [email, password] = await req.body;

    try {
        let user_check = db.check_if_user_exists(email);

        if (!user_check) {
            return res.status(400).json({ message: "User Does Not Exist" });
        } else {
            let user = db.read_user_by_email(email);

            if (password !== user[2]) {
                return res.status(400).json({ message: "Incorrect Password" });
            } else {
                email = user[0];
                username = user[1];
                role = user[4];

                let token = jwt.sign(plain_user, process.env.MY_SECRET, {expiresIn: "1h"});

                req.session.token = token;
                req.session.authenticated = true;
                req.session.user = {
                    email,
                    username,
                    role
                };

                res.redirect('/');
            }
        }
    } catch(err) {
        console.error(`Error: ${err}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;