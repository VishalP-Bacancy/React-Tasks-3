import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import UsersList from './components/Users/Users List/UsersList';
import UserDetail from './components/Users/User Details/UserDetail';
import NotFoundError from './components/Not Found Error/NotFoundError';
import AddUser from './components/Users/Add User/AddUSer';
import EditUser from './components/Users/Edit User/EditUser';
import { useState } from 'react';
import DeleteUser from './components/Users/Delete User/DeleteUser';

function App() {

  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState({})

  const addUser = (userName, age) => {
    setUsers([...users, {username: userName, age: age, id: users.length + 1}])    
    console.log('In App.js: ---- ', users)
  }

  const selectUserId = (user) => {
    setSelectedUser(user)
  }

  const deleteUser = (userId) => {
    console.log('userID:-  ', userId)
    setUsers(prevUsers => prevUsers.filter(user => user.id !== +userId))
    console.log('users in app.js:--', users)
  }

  const editUser = (editedUsers) => {
    setUsers(editedUsers)
    console.log('edited users in app.js:- ', editedUsers)
  }
  
  return (
    <div>
     <BrowserRouter>
      <Header />
       <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/users' element={<UsersList users={users} selectUserId = {selectUserId}/>} />
          <Route path='/user/:id' element={<UserDetail user = {selectedUser}/>} />
          <Route path='/user/edit/:id' element={<EditUser user = {selectedUser} editUser = {editUser} users = {users}/>}/>
          <Route path='/user/add' element={<AddUser addUser={addUser} />} />
          <Route path='/user/delete/:id' element={<DeleteUser deleteUser={deleteUser}/>}/>
          <Route path='*' element={<NotFoundError />}/>
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
