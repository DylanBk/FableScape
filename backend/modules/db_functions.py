import bcrypt
import os
import sqlite3

db_path = "../instance/db.db"


# --- CONNECTION ---

def connect(db_path):
    return sqlite3.connect(db_path)


# --- TABLE CRUD FUNCTIONS ---

def create_table(conn, table_name, cols, dat_types):
    c = conn.cursor()

    cols_and_types = []

    for i, e in enumerate(cols):
        temp = f"{e} {dat_types[i]}"
        cols_and_types.append(temp)

    data = (', ').join(cols_and_types)
    query = f"CREATE TABLE IF NOT EXISTS {table_name} ({data})"
    c.execute(query)

    conn.commit()

def read_table(conn, table_name):
    c = conn.cursor()

    query = f"SELECT * FROM {table_name}"
    c.execute(query)

    return c.fetchall

def update_table_add_col(conn, table_name, col, dat_type):
    pass

def update_table_remove_col(conn, table_name, col):
    pass

def delete_table(conn, table_name):
    c = conn.cursor()

    query = f"DROP TABLE {table_name}"
    c.execute(query)

    conn.commit()


# --- TABLE DATA FUNCTIONS ---

def add_data(conn, table_name, data):
    c = conn.cursor()

    data = (', ').join(data)
    query = f"INSERT INTO {table_name} (?)"
    c.execute(query, data)

    conn.commit()

def read_data(conn, table_name, cols, id):
    c = conn.cursor()

    query = f"SELECT {cols} FROM {table_name} WHERE id = (?)"
    c.execute(query, id)

    return c.fetchone

def edit_data(conn, table_name, col, val, id):
    c = conn.cursor()

    query = f"UPDATE {table_name} SET {col} = (?) WHERE id = (?)"
    c.execute(query, val, id)

    conn.comit()

def remove_data(conn, table_name, id):
    c = conn.cursor()

    query = f"DELETE FROM {table_name} WHERE id = (?)"
    c.execute(query, id)

    conn.commit()


# --- USER FUNCTIONS ---

def create_user(conn, data):
    data[2] = gen_pw(data[2])

    add_data(conn, "users", data)

def read_user(conn, cols, id):
    data = read_data(conn, "users", cols, id)
    return data

def edit_user(conn, col, val, id):
    if col == "password":
        val = gen_pw(conn, val)

    edit_data(conn, "users", col, val, id)

def remove_user(conn, id):
    remove_data(conn, "users", id)

# --- STORY FUNCTIONS ---

def create_story(conn, data):
    add_data(conn, "stories", data)

def read_story(conn, id):
    data = read_data(conn, "stories", "*", id)
    return data

def edit_story(conn, col, data, id):
    edit_data(conn, "stories", col, data, id)

def remove_story(conn, id):
    remove_data(conn, "stories", id)


# --- AUTH & CHECK FUNCTIONS ---

def gen_pw(pw):
    bytes = pw.encode('utf-8')
    salt = bcrypt.gensalt(10)
    hash_pw = bcrypt.hashpw(bytes, salt)

    return hash_pw

def check_pw(conn, id, user_pw):
    hash_pw = read_user(conn, "password", id)

    bytes = user_pw.encode('utf-8')
    res = bcrypt.checkpw(bytes, hash_pw)

    return res

def user_exists(conn, email):
    c = conn.cursor()

    res = c.execute("SELECT * FROM users WHERE email = (?)", (email, ))
    res = c.fetchone

    if res:
        return True
    return False