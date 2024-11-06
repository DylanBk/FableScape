import bcrypt
import os
import sqlite3

db_path = "./instance/db.db"


# --- CONNECTION ---

def connect(db_path):
    return sqlite3.connect(db_path)


# --- SETUP ---

def db_exists():
    if os.path.exists(db_path):
        return True
    else:
        print("not exist")
        return False

def create_db():
    check = db_exists()
    if check:
        print("database already exists")
    else:
        conn = connect(db_path)
        print("connected to database")
        conn.execute("PRAGMA foreign_keys = ON")
        print("foreign keys enabled")
        create_table(conn, "auth_keys", ["id", "code", "expires", "used", "user"], ["INTEGER PRIMARY KEY AUTOINCREMENT", "TEXT", "TEXT", "INTEGER", "INTEGER REFERENCES users(id)"])
        create_table(conn, "users", ["id", "email", "username", "password", "role"], ["INTEGER PRIMARY KEY AUTOINCREMENT", "TEXT UNIQUE", "TEXT", "TEXT", "TEXT DEFAULT 'User'"])
        create_table(conn, "stories", ["id", "name", "description", "thumbnail", "author"], ["INTEGER PRIMARY KEY AUTOINCREMENT", "TEXT", "TEXT", "BLOB", "INTEGER REFERENCES users(id)"])
        create_table(conn, "pages", ["id", "text", "image", "story", "chapter"], ["INTEGER PRIMARY KEY AUTOINCREMENT", "TEXT", "BLOB", "INTEGER REFERENCES stories(id)", "TEXT"])
        create_table(conn, "choices", ["id", "page", "choice", "next_page"], ["INTEGER PRIMARY KEY", "INTEGER REFERENCES pages(id)", "TEXT", "INTEGER REFERENCES pages(id)"])
        print("tables added")
        conn.close()


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

def add_data(conn, table_name, cols, data):
    c = conn.cursor()

    temp = ', '.join(['?'] * len(cols))
    cols = ', '.join(cols)
    query = f"INSERT OR IGNORE INTO {table_name} ({cols}) VALUES ({temp})"
    c.execute(query, data)

    return c.lastrowid

def read_data(conn, table_name, cols, id):
    c = conn.cursor()

    query = f"SELECT {cols} FROM {table_name} WHERE id = (?)"
    c.execute(query, (id, ))

    return c.fetchone()

def read_data_all(conn, table_name, cols, id):
    c = conn.cursor()

    query = f"SELECT {cols} FROM {table_name} WHERE id =(?)"
    c.execute(query, (id, ))

    return c.fetchall()

def edit_data(conn, table_name, col, val, id):
    c = conn.cursor()

    query = f"UPDATE {table_name} SET {col} = (?) WHERE id = (?)"
    c.execute(query, (val, id))

    return c.rowcount

def remove_data(conn, table_name, id):
    c = conn.cursor()

    query = f"DELETE FROM {table_name} WHERE id = (?)"
    c.execute(query, (id, ))

    return c.rowcount


# --- USER FUNCTIONS ---

def create_user(conn, data):
    data[2] = gen_pw(data[2])

    add_data(conn, "users", ['email', 'username', 'password'], data)

def read_user(conn, cols, id):
    data = read_data(conn, "users", cols, id)
    return data

def edit_user(conn, col, val, id):
    if col == "password":
        val = gen_pw(val)

    edit_data(conn, "users", col, val, id)

def remove_user(conn, id):
    remove_data(conn, "users", id)

# --- STORY FUNCTIONS ---

def create_story(conn, data): # TODO: ADD THUMBNAIL BACK TO cols
    add_data(conn, "stories", ['name', 'description', 'author'] , data)

def read_story(conn, id):
    story = read_data(conn, "stories", "*", id)
    pages = read_data(conn, "pages", "*", story[0])
    options = read_options(conn, pages[0])
    return story, pages, options

def edit_story(conn, col, data, id):
    edit_data(conn, "stories", col, data, id)

def remove_story(conn, id):
    remove_data(conn, "stories", id)

# --- PAGE FUNCTIONS ---

def create_page(conn, data): # TODO: ADD IMAGE BACK TO cols
    add_data(conn, "pages", ['text', 'story'], data)

def read_page(conn, id):
    page = read_data(conn, "pages", "*", id)

    return page

# --- OPTIONS FUNCTIONS ---

def read_options(conn, page):
    c = conn.cursor()

    c.execute("SELECT * FROM choices WHERE page = (?)", (page, ))

    return c.fetchall()

# --- AUTH & CHECK FUNCTIONS ---

def gen_pw(pw):
    bytes = pw.encode('utf-8')
    salt = bcrypt.gensalt(10)
    hash_pw = bcrypt.hashpw(bytes, salt)

    return hash_pw

def check_pw(conn, id, user_pw):
    data = read_user(conn, "password", id)
    hash_pw = data[0]
    bytes = user_pw.encode('utf-8')
    res = bcrypt.checkpw(bytes, hash_pw)

    return res

def user_exists(conn, email):
    c = conn.cursor()

    res = c.execute("SELECT * FROM users WHERE email = ?", (email, ))
    res = c.fetchone()

    if res:
        # print(res)
        return res
    return False

def get_user_by_email(conn, email):
    c = conn.cursor()

    c.execute("SELECT * FROM users WHERE email = ?", (email, ))
    return c.fetchone()


# ! --- DEFAULTS ---

def create_def_admin(conn):
    create_user(conn, ['admin@domain.com', '0xadmin', 'admin'])
    print("default admin account created")
def update_def_admin(conn):
    edit_user(conn, "role", "Admin", 1)
    print("admin status granted")