from modules import *

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')
CORS(app)

db_path = "./instance/db.db"

load_dotenv()
PORT = os.getenv('PORT')
SECRET_KEY = os.getenv('SECRET_KEY')
# ENC_SECRET_KEY = b'1234567890123456'

app.secret_key = SECRET_KEY


# ! --- TESTING ---

def get_credentials():
    creds = None

    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)  
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    return creds

def send_email(creds, to, subject, body):
    service = build('gmail', 'v1', credentials=creds)

    message = MIMEText(body)
    message['to'] = to
    message['subject'] = subject

    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

    message = {'raw': raw_message}

    try:
        message = (service.users().messages().send(userId="me", body=message).execute())
        print(f"Message Id: {message['id']}")
    except Exception as error:
        print(f"An error occurred: {error}")


# --- UTILS ---

# def decrypt_pw(enc_pw):
#     print(enc_pw)

#     if ":" not in enc_pw:
#         raise ValueError("Data received does not contain expected separator.")

#     iv_base64, actual_enc_pw_base64 = enc_pw.split(":")
#     iv = base64.b64decode(iv_base64)
#     actual_enc_pw = base64.b64decode(actual_enc_pw_base64)
#     print(f"IV: {iv}, Length: {len(iv)}")
#     print(f"Encrypted Password: {actual_enc_pw}, Length: {len(actual_enc_pw)}")


#     decryptor = Cipher(algorithms.AES(SECRET_KEY), modes.CFB(iv), backend=default_backend()).decryptor()
#     decrypted_message = decryptor.update(actual_enc_pw) + decryptor.finalize()

#     unpadder = padding.PKCS7(algorithms.AES.block_size).unpadder()
#     unpadded_message = unpadder.update(decrypted_message) + unpadder.finalize()

#     print("Unpadded Message:", unpadded_message)

#     return unpadded_message.decode('utf-8')


# --- ROUTES ---

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/signup', methods=['GET', 'POST'])
@app.route('/register', methods=['GET', 'POST'])
def signup():
    if session:
        return jsonify({"message": "already logged in"})
    if request.method == "POST":
        data = request.get_json()
        email = data['email']
        username = data['username']
        pw = data['password']

        # pw = decrypt_pw(enc_pw)

        with db.connect(db_path) as conn:
            check = db.user_exists(conn, email)
            if check:
                return jsonify({"message": "user already exists"}), 400
            else:
                db.create_user(conn, [email, username, pw])

        return redirect(url_for('index')), 200
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if session:
        return jsonify({"message": "already logged in"})

    if request.method == "POST":
        data = request.get_json()
        email = data['email']
        pw = data['password']

        with db.connect(db_path) as conn:
            user = db.get_user_by_email(conn, email)

        if user:
            if db.check_pw(conn, user[0], pw):
                print("correct pw")
                session['user_id'] = user[0]
                session['email'] = user[1]
                session['username'] = user[2]
                session['role'] = user[4]

                return jsonify({"message": "login successful"}), 200
            else:
                return jsonify({"message": "incorrect password"}), 400
        else:
            return jsonify({"message": "user does not exist"}), 400
            
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/story/upload', methods=['GET', 'POST'])
def upload_story():
    if not session:
        return jsonify({ "message": "Not signed in" })
    if request.method == 'POST':
        data = request.get_json()
        name = data['title']
        description = data['description']
        author = session[0]

        with db.connect(db_path) as conn:
            db.create_story(conn, [name, description, author])  

        return
    return url_for('index')

@app.route('/pages/upload/<int:id>', methods=['GET', 'POST'])
def upload_pages(id):
    if not session:
        return jsonify({ "message": "Not signed in" })
    if request.method ==  'POST':
        data = request.get_json()
        text = data['text']

        with db.connect(db_path) as conn:
            db.create_page(conn, [text, id])


@app.route('/story/<int:id>', methods=['GET', 'POST'])
def get_story(id):
    with db.connect(db_path) as conn:
        story, pages, options = db.read_story(conn, id)

        return jsonify({
            "story": story,
            "pages": pages,
            "options": options
        })

#! -------------------------------------------------------------------------------------

@app.route('/story/<int:story_id>/<int:page_id>', methods=['GET', 'POST'])
def get_page(story_id, page_id):
    with db.connect(db_path) as conn:
        story, pages, options = db.read_story(conn, story_id)
        page = db.read_page(conn, page_id)
        options = db.read_options(conn, page_id)

        return jsonify({
            "story": {
                "title": story[1],
                "description": story[2]
            },
            "page": {
                "chapter": page[4],
                "body": page[1]
            },
            "options": options
        })

#! -------------------------------------------------------------------------------------

# --- ACCOUNT / SETTINGS ROUTES ---

@app.route('/settings')
def settings():
    if not session:
        return jsonify({"message": "not logged in"})
    
    data = {
        "email": session.get('email'),
        "username": session.get('username')
    }

    return jsonify(data)

@app.route('/settings/username', methods=['GET', 'POST'])
def change_username():
    if not session:
        return jsonify({"message": "not logged in"})
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']

        with db.connect(db_path) as conn:
            db.edit_user(conn, "username", username, session.get('user_id'))

        session['username'] = username
        return jsonify({"message": "username updated successfully"}), 200
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/settings/password', methods=['GET', 'POST'])
def change_pw():
    if not session:
        return jsonify({"message": "not logged in"})
    if request.method == 'POST':
        data = request.get_json()
        pw = data['password']

        with db.connect(db_path) as conn:
            db.edit_user(conn, "password", pw, session.get('user_id'))

        return jsonify({"message": "password updated successfully"}), 200
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/settings/del', methods=['GET', 'POST'])
def delete_account():
    if not session:
        return jsonify({"message": "not logged in"})
    if request.method == 'POST':
        with db.connect(db_path) as conn:
            db.remove_user(conn, session.get('user_id'))

        session.clear()

        return jsonify({"message": "account successfully deleted"})
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/logout', methods=['GET', 'POST'])
def logout():
    if not session:
        return jsonify({"message": "not logged in"})
    if request.method == 'POST':
        session.clear()

        return jsonify({"message": "logged out successfully"})
    return send_from_directory(app.static_folder, 'index.html')


# --- MAIN ---

#  ! EMAIL STUFF
# creds = get_credentials()
# send_email(
#     creds,
#     "dylan.bullock.965@accesscreative.ac.uk",
#     "Test Subject",
#     "Hello from Python!"
# )


db.create_db()

# ! only run if db deleted or reset or testing
with db.connect(db_path) as conn:
    db.create_def_admin(conn)
with db.connect(db_path) as conn:
    db.update_def_admin(conn)
# with db.connect(db_path) as conn:
#     db.default_story(conn)


if __name__ == "__main__":
    app.run(port=PORT, debug=True)