import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DeleteUser.css'; // Import the CSS file

const DeleteUser = ({ deleteUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteUser(id);
    navigate('/user');
  }; 

  return (
    <div className="delete-user-container">
      <h2 className="delete-user-title">Confirm Delete User</h2>
      <p className="delete-user-message">Are you sure you want to delete this user?</p>
      <div>
         <button className="deleteButton" onClick={handleDelete}>
           Delete
         </button>
         <button className='cancelDelete' onClick={() => navigate('/user')}>
          Cancel
         </button>
      </div>    
    </div>
  );
};

export default DeleteUser;
