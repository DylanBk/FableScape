from modules import *

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')
CORS(app)

db_path = "./instance/db.db"

load_dotenv()
port = os.getenv('PORT')


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


# --- ROUTES ---

@app.route('/')
def index(path):
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/signup', methods=['GET', 'POST'])
@app.route('/register', methods=['GET', 'POST'])
def signup():
    if session:
        print("already logged in")
    if request.method == "POST":
        data = request.get_json()
        email = data['email']
        username = data['username']
        enc_pw = data['hidden-pw']

        enc_pw_bytes = base64.b64decode(enc_pw)
        iv = enc_pw_bytes[:16]
        actual_enc_pw = enc_pw_bytes[16:]
        print(iv)
        print(actual_enc_pw)

        with db.connect(db_path) as conn:
            db.create_user(conn, [email, username, actual_enc_pw])

        return redirect(url_for('index'))
    return

@app.route('/login', methods=['GET', 'POST'])
def login():
    if session:
        print("already logged in")
    if request.method == "POST":
        email = request.form['email']
        password = request.form['password']

        with db.connect(db_path) as conn:
            user = db.get_user_by_email(email)

        if user:
            if db.check_pw(conn, user[0], password):
                print("correct pw")
                session['user_id'] = user[0]
                session['email'] = user[1]
                session['username'] = user[2]
                session['role'] = user[4]

                return redirect(url_for('index'))
        else:
            print("user does not exist")
            return jsonify({"message": "User does not exist"})
    return

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
        story, pages = db.read_story(conn, id)

        # print(f"story: {story}")
        # print(f"pages: {pages}")

        title = story[0]
        body = pages[1]
        data = {
            "title": title,
            "body": body
        }
        print(f"data: {data}")

        return jsonify({ "data": data })

# --- MAIN ---

# creds = get_credentials()
# send_email(
#     creds,
#     "dylan.bullock.965@accesscreative.ac.uk",
#     "Test Subject",
#     "Hello from Python!"
# )


db.create_db()

# ! only run if db deleted or reset or testing
# with db.connect(db_path) as conn:
#     db.default_admin(conn)
# with db.connect(db_path) as conn:
#     db.default_story(conn)


if __name__ == "__main__":
    app.run(port=port, debug=True)