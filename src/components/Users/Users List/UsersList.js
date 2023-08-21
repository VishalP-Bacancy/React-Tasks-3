import React from 'react';
import { Link } from 'react-router-dom';
import './UsersList.css';

const UsersList = ({ users, selectUserId, search }) => {


  const handleViewDetail = (user) => {
    selectUserId(user)
  };

  const handleEditUser = (user) => {
    selectUserId(user)
  }


  return (
    <div className='userList'>
      <button className='addUser'>
        <Link
          to={'/user/add'}
          style={{ textDecoration: 'none', color: 'white' }}
        >
          Add User
        </Link>
      </button>
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
