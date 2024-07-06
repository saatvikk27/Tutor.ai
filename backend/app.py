from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)  # To enable Cross-Origin Resource Sharing

logging.basicConfig(level=logging.DEBUG)

client = MongoClient('mongodb://localhost:27017/')
db = client['tutor_app']

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    logging.debug(f"Login attempt with username: {username} and password: {password}")
    
    user = db.users.find_one({"username": username, "password": password})
    logging.debug(f"User found: {user}")
    
    if user:
        return jsonify({"message": "Login successful", "user": {"username": username}})
    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/api/courses', methods=['GET'])
def get_courses():
    courses = list(db.courses.find({}, {"_id": 0}))
    return jsonify(courses)

@app.route('/api/courses/<int:course_id>', methods=['GET'])
def get_course_details(course_id):
    course = db.courses.find_one({"id": course_id}, {"_id": 0})
    if course:
        course_questions = list(db.questions.find({"course_id": course_id}, {"_id": 0}))
        course["questions"] = course_questions
        return jsonify(course)
    return jsonify({"message": "Course not found"}), 404

@app.route('/api/submit_answer', methods=['POST'])
def submit_answer():
    data = request.json
    course_id = data.get('course_id')
    question_id = data.get('question_id')
    answer = data.get('answer')
    
    # Mock submission handling
    return jsonify({"message": "Submission received"})

@app.route('/api/add_course', methods=['POST'])
def add_course():
    data = request.json
    course_id = data.get('id')
    title = data.get('title')
    questions = data.get('questions')
    
    db.courses.insert_one({"id": course_id, "title": title})
    
    for question in questions:
        db.questions.insert_one({"course_id": course_id, "question": question})
    
    return jsonify({"message": "Course and questions added successfully"})

if __name__ == '__main__':
    app.run(debug=True)
