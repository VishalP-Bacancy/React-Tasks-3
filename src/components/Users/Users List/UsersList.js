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
  const [selectedUser, setSelectedUser] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(2)
  // const [filterUser, setFilterUser] = useState([])
  const { id } = useParams()
  // const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()


  let filterUser = users.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))

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

  // const pageNo = searchParams.get('page')
  // const noOfPages = Math.ceil(Number(filterUser.length/+usersPerPage));
  // useEffect(()=>{
  //   if(pageNo){
  //     setCurrentPage(pageNo)
  //     // console.log("sdfghjkl"+noOfPages +"dfghjkl"+pageNo)
  //     if(+pageNo > noOfPages){
  //       setSearchParams({page:1})
  //     }      
  //   }
  // }, [pageNo, search])
  

  // const selectPageHandler = (selectedPage) => {
  //   if (
  //     selectedPage >= 1 &&
  //     selectedPage <= noOfPages &&
  //     selectedPage !== currentPage
  //   )
  //   setCurrentPage(selectedPage);
  //   setSearchParams({page:selectedPage})
  // };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortUsers().slice(indexOfFirstUser, indexOfLastUser)

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

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
              Userame: <strong>{selectedUser.username}</strong>
            </label>
            <br />
            <label>
              Age: <strong>{selectedUser.age}</strong>
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
                        onClick={() => setSelectedUser(user)}
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
    <div className='pagination'>
      {filterUser && <Pagination usersPerPage={usersPerPage} totalUsers={filterUser.length} currentPage={currentPage} paginate={handlePaginate}/> }
    </div>
    </>
  );
};

export default UsersList;
