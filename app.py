from flask import Flask, render_template, request, jsonify
import jwt
import datetime

app = Flask(__name__)
# IMPORTANT: Change this to a strong, unique key for your project.
app.config['SECRET_KEY'] = 'your_super_secret_key'


@app.route('/')
def home():
    return render_template('index.html')


# Endpoint to handle login and issue a JWT token.
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Simple, hardcoded credentials for demonstration.
    # In a real app, this would be a secure check against a database.
    if username == "hacker" and password == "cyberpunk2025":
        # Create a token that expires in 30 minutes.
        token = jwt.encode({
            'user': username,
            'exp': datetime.datetime.now(datetime.UTC) + datetime.timedelta(minutes=30)
        }, app.config['SECRET_KEY'])
        return jsonify({'token': token})

    return jsonify({'error': 'Invalid credentials'}), 401


# Protected endpoint to reveal the secret key.
@app.route('/secret')
def get_secret():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Token is missing!'}), 401

    try:
        # Decode the token to check if it's valid.
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return jsonify({'secret_key': 'GDG_CYBER_2025'})
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired!'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token!'}), 401


if __name__ == '__main__':
    # The debug=True flag automatically restarts the server when you save changes.
    app.run(debug=True)