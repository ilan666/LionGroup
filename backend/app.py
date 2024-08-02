from flask import Flask, jsonify, request
from functools import wraps

app = Flask(__name__)

def enable_cors(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Set CORS headers
        response = func(*args, **kwargs)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200'  # Allow requests from http://localhost:4200 origin
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'  # Allowed HTTP methods
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'  # Allowed headers
        return response
    return wrapper

@app.route('/')
@enable_cors
def index():
    return jsonify({'message': 'Welcome to the backend!'})

@app.route('/users', methods=['GET'])
@enable_cors
def get_users():
    # Fetch user data from your database or other source
    users = [
        {'id': 1, 'name': 'Alice'},
        {'id': 2, 'name': 'Bob'}
    ]
    return jsonify(users)
  
@app.route('/users', methods=['POST'])
@enable_cors
def create_user():
    data = request.get_json()  # Get user data from the request body
    # Process the data (e.g., store in your database)
    return jsonify({'message': 'User created successfully'}), 201  # Return a success response


if __name__ == '__main__':
    app.run(debug=True)