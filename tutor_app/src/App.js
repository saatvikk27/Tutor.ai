import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Courses from './components/Courses';
import Admin from './components/Admin';
import './App.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar/>
            <Routes>
              <Route path="/" element={<Courses/>} />
              <Route path="/admin" element={<Admin/>} />

            </Routes>
            <Footer/>
        </BrowserRouter>  
    </div>
    
  );
}

export default App;