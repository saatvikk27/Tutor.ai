from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['tutor_app']


users = [
    {"username": "student1", "password": "password123"},
    {"username": "student2", "password": "password456"}
]
db.users.insert_many(users)


courses = [
    {"id": 1, "title": "Python"},
    {"id": 2, "title": "Data Structures"}
]
db.courses.insert_many(courses)


