import MyUserFinder from './components/UserFinder';

import UserContext from './store/user-context'


const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

function App() {

  const usersContext = {
    users: DUMMY_USERS
  }


  return (
    <UserContext.Provider value={usersContext}>
    <div className='finder'>
      <MyUserFinder />
    </div>
    </UserContext.Provider>
  );
}

export default App;
