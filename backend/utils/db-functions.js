const sqlite = require('sqlite3');
const db = require('../config/db.js');
const bcrypt = require('bcrypt');

const db_path = '../db/FableScapeDB.db';

// --- PRIMITIVE CRUD FUNCTIONS ---

function create_table(table_name, column_names, data_types) {
    let columns_and_data_types = [];
    for (let [index, element] of column_names.entries()) {
        let temp = `${column_names[index]} ${data_types[index]}`;
        columns_and_data_types.push(temp);
    }
    const query = (`CREATE TABLE IF NOT EXISTS ${table_name} (${columns_and_data_types})`);
    console.log(query);
    db.run(query, (err) => {
        if (err) {
            console.error(`Error: ${error}`);
        } else {
            console.log(`Table ${table_name} created`)
        }
    });
};

function read_table(table_name) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${table_name}`;

        db.all(query, (err, data) => {
            if (err) {
                console.error(`Error: ${err}`);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

function update_table(table_name, column_names, data) {
    column_names = column_names.join(", ");
    data = data.join(", ")
    const temp = Array(data.length).fill('?').join(', ');
    const query = `INSERT INTO ${table_name} (${column_names}) VALUES (${temp})`;

    db.run(query, data);
};

function delete_table(table_name) {
    const query = `DROP TABLE ${table_name}`;
    db.run(query);
};


// --- USER CRUD FUNCTIONS

function create_user(user_data) {
    try {
        const [email, username, password] = user_data;
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);

        const column_names = ["email", "username", "password"];
        const data = [email, username, password];

        update_table("users", column_names, data);
    } catch(err) {
        console.error(`DB Func Error: ${err}`);
    }
};

function read_user_by_email(email) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE email = ?`;
        db.get(query, email, (err, data) => {
            if (err) {
                console.error(`Error: ${err}`);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

// --- MISC FUNCTIONS ---
function check_if_user_exists(email) {
    try {
        const query = `SELECT * FROM users WHERE email = ?`;
        const check =  db.get(query, email);
        console.log(check)

        if (check) {
            return true;
        } else {
            return false;
        }
    } catch(err) {
        console.error(`DB Func Error: ${err}`);
    }
};


// --- SETUP FUNCTIONS ---
function create_db() {
    if (db_path) {
        console.log("Database already exists")
    } else {
        create_table("users", ["uid", "email", "username", "password", "role"], ["INTEGER AUTOINCREMENT", "TEXT UNIQUE", "TEXT", "TEXT", "TEXT DEFAULT 'User'"]);
        create_table("stories", ["id", "name", "description", "cover_image", "pages"]);
        console.log("Database Created");
    }
};

module.exports = {
    create_table,
    read_table,
    update_table,
    delete_table,
    create_user,
    read_user_by_email,
    check_if_user_exists,
    create_db
}