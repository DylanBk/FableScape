const sqlite = require('sqlite3');
const db = require('../config/db.js');
const bcrypt = require('bcrypt');

// --- PRIMITIVE CRUD FUNCTIONS ---

export function create_table(table_name, column_names, data_types) {
    let columns_and_data_types = [];
    for (let [index, element] of column_names.entries()) {
        let temp = `${column_names[index]} ${data_types[index]}`;
        columns_and_data_types.push(temp);
    }
    const query = (`CREATE TABLE IF NOT EXISTS ${table_name} (${columns_and_data_types})`);
    db.run(query, (err) => {
        if (err) {
            console.error(`Error: ${error}`);
        } else {
            console.log(`Table ${table_name} created`)
        }
    });
};

export function read_table(table_name) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${table_name}`;

        db.all(query, (err, data) => {
            if (err) {
                console.error(`Error: ${error}`);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export function update_table(table_name, column_names, data) {
    column_names = column_names.join(", ");
    data = data.join(", ")
    const temp = Array(data.length).fill('?').join(', ');
    const query = `INSERT INTO ${table_name} (${column_names}) VALUES (${temp})`;

    db.run(query, data);
};

export function delete_table(table_name) {
    const query = `DROP TABLE ${table_name}`;
    db.run(query);
};


// --- USER CRUD FUNCTIONS

export function create_user(user_data) {
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

export function read_user_by_email(email) { //! CHANGE TO PROMISE(RESOLVE, REJECT)
    try {
        const query = `SELECT * FROM users WHERE email = ?`;
        db.get(query, email);
    } catch(err) {
        console.error(`DB Func Error: ${err}`);
    }
};


// --- MISC FUNCTIONS ---
export function check_if_user_exists(email) {
    try {
        const query = `SELECT * FROM users WHERE email = ?`;
        const check =  db.get(query, email);

        if (check) {
            return true;
        } else {
            return false;
        }
    } catch(err) {
        console.error(`DB Func Error: ${err}`);
    }
};