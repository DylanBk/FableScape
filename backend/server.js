const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const user_router = require('./routes/user-routes.js');


// --- SETUP ---

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}))

app.use(express.static(path.join(__dirname, '../frontend/build')));
index_path = path.join(__dirname, '../frontend/build', 'index.html');

// app.use('/api/users', user_router)


// --- CONNECT CSS ---

// app.get('../src/style.css', (req, res) => {
//     console.log('Request received for index.css');
//     res.setHeader('Content-Type', 'text/css');
//     res.sendFile(path.join(__dirname, 'public', 'src', 'index.css'));
// });


// --- ROUTES ---

function handleIndexRoutes() {
    res.sendFile(index_path);
    console.log("index path sent");
}

// main routes
app.get('/', handleIndexRoutes);
app.get('/home', handleIndexRoutes);
app.get('/index', handleIndexRoutes);

// user routes
app.get('/signin', user_router)


// --- MAIN ---

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
});