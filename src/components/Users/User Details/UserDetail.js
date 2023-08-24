import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NotFoundError from '../../Not Found Error/NotFoundError';
import './UserDetail.css';

const UserDetail = ({ users }) => {
  
  const { id } = useParams()
  const user = users.filter(user => user.id === +id)

  const navigate = useNavigate();
  const isUserAvailable = Object.keys(user).length > 0;

  const handleBackButton = () => {
    navigate(-1)
  };

  return (
    <div>
      {!isUserAvailable && <NotFoundError />}
      {isUserAvailable && (
        <div>
          <div className='userDetail'>
            <h1 className='userDetail-title'>User Details:</h1>
            <br />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                flexDirection: 'column',
              }}
            >
              <h5>Username: {user[0].username}</h5>
              <h6>Age: {user[0].age}</h6>
            </div>
          </div>
          <br />
          <button className='back-button' onClick={handleBackButton}>
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
