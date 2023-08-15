import React, { useState } from 'react';
import './AddUser.css'; // Import the associated CSS file
import { useNavigate } from 'react-router-dom';

const AddUser = ({ addUser}) => {
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');

  const navigate = useNavigate()

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setUserAge(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userName, typeof(userName), userAge, typeof(+userAge))
    addUser(userName, parseInt(userAge))
    navigate('/users')
  };

  return (
    <div className="add-user">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={userName} onChange={handleNameChange} />
        </div>
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input type="number" id="age" value={userAge} onChange={handleAgeChange} />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
