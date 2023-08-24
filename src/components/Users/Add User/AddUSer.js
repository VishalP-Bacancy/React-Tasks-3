import React, { useEffect, useState } from 'react';
import './AddUser.css'; // Import the associated CSS file
import { Link, useNavigate, useParams } from 'react-router-dom';


const ErrorModal = ({ error, setError }) => {
  return (
     <div className='error-modal'>
      <h2>{error?.title}</h2><br />{error?.message}<button className='error-button' onClick={()=>setError(null)}>Close</button>
     </div>
   )
}



const AddUser = ({ addUser, editUser, users, isEdit }) => {
  const { id } = useParams()
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [error, setError] = useState('')

  const navigate = useNavigate()



  useEffect(() => {
    if(isEdit){
      const user = users.filter(user => user.id === +id)
      setUserName(user[0].username)
      setUserAge(user[0].age)
      isEdit = false
    }
 },[isEdit])

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setUserAge(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userName.trim().length === 0 || userAge === '') {
      setError({
          title: "Invalid Input",
          message: `Please enter a valid Username and Age⚠`
      })
      return;
  }
  if (+userAge < 1) {
      setError({
          title: "Invalid Age",
          message: `Enter a valid age! (> 0) 😒`
      })
      return;
    }
    
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
    <>
      {error && (<ErrorModal error={error} setError={setError}/>)}
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
        <button type="submit" className='add-btn'>{isEdit? 'Update': 'Add User'}</button>
        <button className='backButton'>
        <Link
          to={'/user'}
          style={{ textDecoration: 'none', color: 'white'}}
          onClick={() => setError(null)}
          > 
            Back
          </Link>  
        </button>
      </form>
      </div>
    </>
  );
};

export default AddUser;
