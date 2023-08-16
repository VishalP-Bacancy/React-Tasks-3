import React, { useState } from 'react';
import './EditUser.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditUser = ({ user, editUser, users }) => {
  const { id } = useParams()
  const [userName, setUserName] = useState(user.username);
  const [userAge, setUserAge] = useState(user.age);
  const navigate = useNavigate()

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setUserAge(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
    const updatedUsers = users.map(user => {
      if (user.id === +id) {
        return {
          ...user,
          username: userName,
          age: userAge
        };
      }
      return user;
    });

    editUser(updatedUsers)
    navigate('/user')
  };

  return (
    <div className="add-user">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={userName} onChange={handleNameChange} />
        </div>
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input type="number" id="age" value={userAge} onChange={handleAgeChange} />
        </div>
        <button type="submit" className='submit-form'>Update</button>
        <button className='backButton'>
        <Link
          to={'/user'}
          style={{ textDecoration: 'none', color: 'white'}}
          > 
            Back
          </Link>  
        </button>
      </form>
    </div>
  );
};

export default EditUser;
