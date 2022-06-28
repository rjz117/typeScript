import { useState } from 'react';
import './App.css';
import AddUser from './components/User/AddUser';
import UserList from './components/User/UserList';

function App() {
  const[users, setUsers] = useState([])

  const addUser = (user) => {
    setUsers(prevUsers => {
      return [...prevUsers, user]
    })
  }

  return (
    <div className="App">
      <AddUser onSubmit= {addUser}/>
      {users.length >0 && <UserList users={users}/>}
    </div>
  );
}

export default App;
