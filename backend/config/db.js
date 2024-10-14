const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db_path = path.join(__dirname, '..', 'db', 'FableScapeDB.db');
console.log(`Db Path: ${db_path}, -db.js`);

const db = new sqlite3.Database(db_path, (err) => {
    if (err) {
        console.error(`Error: ${err}`)
    } else {
        console.log("Successfully connected to database")
    }
});

module.exports = db;