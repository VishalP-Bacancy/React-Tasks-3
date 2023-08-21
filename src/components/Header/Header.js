import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css'
import { FormControl } from 'react-bootstrap';


const Header = ({ setSearch }) => {
  return (
    <header>
      <nav className="navbar">
        <div className="brand">
          <Link to={'/'}>Users List</Link>
        </div>
        <div className='searchBar'>
          <form>
            <FormControl
              type='text'
              placeholder='search'
              onChange={(e) => setSearch(e.target.value)}
            >
              
            </FormControl>
          </form>
        </div>
        <ul className="nav-links">
         <Link to={'/user'}>Users</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
