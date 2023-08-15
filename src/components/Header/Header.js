import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css'


const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="brand">
          <Link to={'/'}>Users List</Link>
        </div>
        <ul className="nav-links">
         <Link to={'/users'}>Users</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
