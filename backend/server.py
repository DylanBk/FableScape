from modules import *

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')

db_path = "../instance/db.db"


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    print(f"path: {path}")
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/signup', methods=['GET', 'POST'])
@app.route('/register', methods=['GET', 'POST'])
def signup():
    # if session:
        # pass
    if request.method == "POST":
        email = request.form['email']
        username = request.form['username']
        password = request.form['password']


        with db.connect(db_path) as conn:
            db.create_user(conn, [email, username, password])

        return redirect(url_for('/'))
    return

# @app.route('/signin', )

if __name__ == "__main__":
    app.run(port=5000)