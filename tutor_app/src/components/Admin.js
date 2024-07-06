import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/Admin.css';

function Admin() {
  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState(['']);
  const [message, setMessage] = useState('');

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/add_course', {
        id: parseInt(courseId),
        title,
        questions
      });
      setMessage(response.data.message);
      setCourseId('');
      setTitle('');
      setQuestions(['']);
    } catch (error) {
      console.error('Error adding course:', error);
      setMessage('Failed to add course');
    }
  };

  return (
    <div className="container">
      <h2>Admin Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course ID</label>
          <input
            type="number"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Course Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Questions</label>
          {questions.map((question, index) => (
            <input
              key={index}
              type="text"
              value={question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              required
            />
          ))}
          <button type="button" onClick={handleAddQuestion}>
            Add Question
          </button>
        </div>
        <button type="submit">Add Course</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Admin;
