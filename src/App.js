import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import UsersList from './components/Users/Users List/UsersList';
import UserDetail from './components/Users/User Details/UserDetail';
import NotFoundError from './components/Not Found Error/NotFoundError';
import AddUser from './components/Users/Add User/AddUSer';
import { useState } from 'react';

function App() {

  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState({})
  const [search, setSearch] = useState('')

  const addUser = (userName, age) => {
    setUsers([...users, {username: userName, age: age, id: users.length + 1}])    
  }

  const selectUserId = (user) => {
    setSelectedUser(user)
  }

  const deleteUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== +userId))
  }

  const editUser = (editedUsers) => {
    setUsers(editedUsers)
  }
  
  return (
    <div>
     <BrowserRouter>
      <Header setSearch={setSearch}/>
       <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/user' element={<UsersList users={users} selectUserId = {selectUserId} search={search}/>} />
          <Route path='/user/:id' element={<UserDetail user = {selectedUser}/>} />
          <Route path='/user/add' element={<AddUser addUser={addUser} />} />
          <Route path='/user/edit/:id' element={<AddUser user = {selectedUser} editUser = {editUser} users = {users} isEdit = {true}/>}/>
          <Route path='/user/delete/:id' element={<UsersList   deleteUser={deleteUser}/>}/>
          <Route path='*' element={<NotFoundError />}/>
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
