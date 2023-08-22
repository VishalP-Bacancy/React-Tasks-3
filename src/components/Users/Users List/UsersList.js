import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UsersList.css';

const UsersList = ({ users, selectUserId, search }) => {
 const [sortBy, setSortBy] = useState('')

  const handleViewDetail = (user) => {
    selectUserId(user)
  };

  const handleEditUser = (user) => {
    selectUserId(user)
  }

  const sortHandler = (e) => {
    setSortBy(e.target.value)
    console.log('Sort selected:- ', e.target.value)
  }

  return (
    <div className='userList'>
      <div className='add-sort-option'>
        <button className='addUser'>
        <Link
          to={'/user/add'}
          style={{ textDecoration: 'none', color: 'white' }}
        >
          Add User
        </Link>
      </button>
      <select name="cars" id="cars" onChange={sortHandler}>
         <option value="">Sort By</option>
         <option value="username">Username</option>
         <option value="age">Age</option>
      </select>
      </div>
      <div>
        <ul>
          {users && users?.reverse().filter((filteredUser) => 
            filteredUser.username.toLowerCase().includes(search.toLowerCase())
          ).map((user) => {
            return (
              <div key={user.id} className='userListItem'>
                <li>
                  <span className='username'>{user.username}</span>
                  <span className='userAge'>Age: {user.age}</span>
                  <div className='button-container'>
                    <button className='button view-detail'>
                      <Link
                        to={`/user/${user.id}`}
                        style={{ textDecoration: 'none', color: 'white' }}
                        onClick={() => handleViewDetail(user)} 
                      >
                        View
                      </Link>
                    </button>
                    <button className='button'>
                      <Link
                        to={`/user/edit/${user.id}`}
                        style={{ textDecoration: 'none', color: 'white' }}
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </Link>
                    </button>
                    <button className='button delete'>
                      <Link
                        to={`/user/delete/${user.id}`}
                        style={{ textDecoration: 'none', color: 'white' }}
                      >
                        Delete
                      </Link>
                    </button>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default UsersList;
