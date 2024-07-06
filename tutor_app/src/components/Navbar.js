import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Navbar.css';
import Logo from '../assets/images/now.png'

function Navbar() {
  return (
    <nav className="navbar">
      <div className='navbar-logo'>
                <a href='/'>
                    <img className='logo img-fluid' src={Logo} alt='Tutor.ai' />
                </a>
            </div>
      <ul className="navbar-links">
        <li><Link to="/">Courses</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
