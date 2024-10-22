from modules import *

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')
CORS(app)

db_path = "./instance/db.db"

load_dotenv()
port = os.getenv('PORT')


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
        password = data['password']

        with db.connect(db_path) as conn:
            db.create_user(conn, [email, username, password])

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


db.create_db()
with db.connect(db_path) as conn:
    db.default_admin(conn)

with db.connect(db_path) as conn:
    x = db.read_data(conn, "users", "*", "11")
    print(f"user: {x}")

if __name__ == "__main__":
    app.run(port=port, debug=True)