import React from 'react';
import './UserDetail.css'
import { useNavigate } from 'react-router-dom';

const UserDetail = ({ user }) => {
  const navigate = useNavigate()
  console.log('UserDetails:-  ', user)
  const handleBackButton = () => {
    navigate('/users')
  }
  return (
    <div>
     <div className='userDetail'>
        <h1 className='userDetail-title'>User Details:</h1>
        <br />
      <div style={{display: 'flex', justifyContent: 'center',gap: '20px', flexDirection: 'column'}}>
          <h5>{user.username}</h5>
          <h6>{user.age}</h6>
      </div>
    </div>
     <br />
    <button className='back-button' onClick={handleBackButton}>Back</button>
  </div> 
  );
};

export default UserDetail;
