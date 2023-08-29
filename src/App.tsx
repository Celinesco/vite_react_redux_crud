import { Title } from '@tremor/react';
import './App.css';
import CreateNewUser from './users/components/CreateNewUser';
import ListOfUsers from './users/components/ListOfUsers';

function App() {


  return (
    <>
      <Title>Practica Redux</Title>
      <CreateNewUser />
      <ListOfUsers />
    </>
  )
}

export default App
