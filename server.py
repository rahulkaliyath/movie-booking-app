from flask import Flask, request, jsonify,render_template,redirect,url_for
from model import db_connection
from controllers import authentication,movies
from flask_cors import CORS, cross_origin
from functools import wraps
from time import time
import datetime
import jwt
import json

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
auth=authentication.Authenticate()
movies = movies.Movies()

def validate_token(function):
    @wraps(function)
    def wrapper():
        data = request.get_json(force=True)

        input_data, status = auth.authenticate(data)
        if status == "success":
            return function(input_data,time())  
        return input_data
    return wrapper

def main():
    app.run(debug=True)

@app.route('/')
@validate_token
def home(input,start_time):
    return jsonify({'time':time()-start_time})

@app.route('/login',methods=['POST'])
def login():
    result = auth.login()
    return jsonify(result)

@app.route('/list_movies',methods=['GET'])
def list_movies():
    result = movies.list_movies()
    return jsonify(result)

@app.route('/movie_details',methods=['GET'])
def movie_details():
    result = movies.movie_details()
    return jsonify(result)

# @app.route('/book_ticket',methods=['POST'])
# @validate_token
# def book_ticket(input,start_time):
#     result = booking.book_ticket(input)
#     return jsonify(result)

# @app.route('/cancel_ticket',methods=['POST'])
# @validate_token
# def cancel_ticket(input,start_time):
#     result = booking.cancel_ticket(input)
#     return jsonify(result)

@app.route('/add_movie',methods=['POST'])
@validate_token
def add_movie(input_data,start_time):
    result = movies.add_movie(input_data)
    return jsonify(result)


@app.route('/update_movie',methods=['POST'])
@validate_token
def update_movie(input,start_time):
    result = movies.update_movie(input)
    return jsonify(result)


@app.route('/delete_movie',methods=['POST'])
@validate_token
def delete_movie(input,start_time):
    result = movies.delete_movie(input)
    return jsonify(result)




if __name__ == '__main__':
    main()
