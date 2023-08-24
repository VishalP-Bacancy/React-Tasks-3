import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './UsersList.css';
import { CloseCircleOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import { Modal } from 'antd';
import Pagination from '../../pagination/Pagination';

const UsersList = ({ users, selectUserId, deleteUser, search }) => {
  const [sortBy, setSortBy] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(2)
  
  const { id } = useParams()

  const [searchParams] = useSearchParams()
  const pageParam = searchParams.get('page');

  const navigate = useNavigate()


  let filterUser = users.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
  const selectedUser = users.filter(user => user.id === +id)
  // const [sortUsers, setSortUser] = useState(filterUser)

  useEffect(() => {
    if (!isEmpty(id)) {
      setIsModalOpen(true);
    }
  }, [id]);

  const handleOk = () => {
    deleteUser(+id);
    setIsModalOpen(false);
    navigate("/user");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    navigate("/user");
  };


  const sortUsers = () => {
    if (sortBy === 'username') {
      return [...filterUser].sort((a, b) => a.username.localeCompare(b.username));
    } else {
      return [...filterUser].sort((a, b) => a.age - b.age);
    }
  };

  //pagination

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortUsers().slice(indexOfFirstUser, indexOfLastUser)

  useEffect(() => {
    if (!pageParam) {
      navigate('/user?page=1', { replace: true });
      return;
    }
    if (!isNaN(pageParam)) {
      setCurrentPage(parseInt(pageParam));
    } else {
      setCurrentPage(1);
    }
  }, [pageParam]);
  



  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/user?page=${pageNumber}`, { replace: true });
  };
  

  return (
    <>
      {
        !isEmpty(id) && (
          <Modal
          title = "Delete User:- "
          closeIcon=<CloseCircleOutlined style={{color: 'red'}}/>
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          >
          <div className="delete__modal">
            <br />
            <br />
            <label>
              Userame: <strong>{selectedUser[0].username}</strong>
            </label>
            <br />
            <label>
              Age: <strong>{selectedUser[0].age}</strong>
            </label>
          </div>
          <br />
          <br />
          <p style={{ color: "#BB2525", fontSize: '20px' }}>
            Are you sure you want to delete record? 🙄
          </p>
          </Modal>
        )
      }
      { filterUser.length > 0 &&
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
          <select name="cars" id="cars" onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="username">Username</option>
            <option value="age">Age</option>
          </select>
        </div>
        <div>
          <ul>
            {currentUsers?.map((user) => {
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
                        >
                          View
                        </Link>
                      </button>
                      <button className='button'>
                        <Link
                          to={`/user/edit/${user.id}`}
                          style={{ textDecoration: 'none', color: 'white' }}
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
      }
      {filterUser.length <= 0 && <h1 className='no-users-found'>No users Found! ❌</h1>}
    <div className='pagination'>
        {filterUser && filterUser.length > 0 &&
          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={filterUser.length}
            currentPage={currentPage}
            paginate={handlePaginate} 
            pageParam = {pageParam}
            />}
    </div>
    </>
  );
};

export default UsersList;
