const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db_config = require('./config/db.js');
const db = require('./utils/db-functions.js');
const db_path = './db/FableScapeDB.db';

const user_router = require('./routes/user-routes.js');


// --- SETUP ---

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    // origin: "fablescape-6b72e6pzs-dylans-projects-67c9a75c.vercel.app", //TODO use in production IF hosted on Vercel
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(express.static(path.join(__dirname, '../frontend/build')));
index_path = path.join(__dirname, '../frontend/build', 'index.html');

// --- ROUTES ---

function handleIndexRoutes() {
    res.sendFile(index_path);
    console.log("index path sent");
}

// main routes
app.get('*', (req, res) => {
    res.sendFile(index_path);
});

app.get('/', handleIndexRoutes);
app.get('/home', handleIndexRoutes);
app.get('/index', handleIndexRoutes);

// user routes
app.use('/api/users', user_router)


// --- MAIN ---

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
    db.create_db();
});