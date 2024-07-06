import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/Courses.css';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const response = await axios.get('http://localhost:5000/api/courses');
    setCourses(response.data);
  };

  const handleCourseClick = async (courseId) => {
    const response = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
    setSelectedCourse(response.data);
  };

  const handleAnswerSubmit = async (questionId) => {
    const response = await axios.post('http://localhost:5000/api/submit_answer', {
      course_id: selectedCourse.id,
      question_id: questionId,
      answer
    });
    alert(response.data.message);
    setAnswer('');
  };

  return (
    <div className="container">
      <h2>Courses</h2>
      <ul className="course-list">
        {courses.map(course => (
          <li key={course.id} className="course-item" onClick={() => handleCourseClick(course.id)}>
            <span className="course-title">{course.title}</span>
          </li>
        ))}
      </ul>

      {selectedCourse && (
        <div className="course-details">
          <h2>{selectedCourse.title}</h2>
          <h3>Questions</h3>
          <ul className="question-list">
            {selectedCourse.questions.map(q => (
              <li key={q.id} className="question-item">
                <span className="question-text">{q.question}</span>
                <input
                  type="text"
                  className="answer-input"
                  placeholder="Type your answer here"
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                />
                <div className="button-container">
                  <button className="submit-button" onClick={() => handleAnswerSubmit(q.id)}>Submit</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Courses;
