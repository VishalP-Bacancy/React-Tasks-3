import React, { useEffect, useState } from 'react';
import './AddUser.css'; // Import the associated CSS file
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddUser = ({ addUser, user, editUser, users, isEdit }) => {
  const { id } = useParams()
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    if(isEdit){
      setUserName(user.username)
      setUserAge(user.age)
      isEdit = false
    }
 },[])

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setUserAge(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEdit) {
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
    } else {
      console.log(userName, typeof(userName), userAge, typeof(+userAge))
      addUser(userName, parseInt(userAge))
    }
    
    navigate('/user')
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
        <button type="submit" className='submit-form'>Add User</button>
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

export default AddUser;
