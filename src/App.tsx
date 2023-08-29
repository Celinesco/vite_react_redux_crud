import { Title } from '@tremor/react';
import './App.css';
import CreateNewUser from './users/components/CreateNewUser';
import ListOfUsers from './users/components/ListOfUsers';
import { Toaster } from 'sonner';

function App() {


  return (
    <>
      <Title>Practica Redux</Title>
      <CreateNewUser />
      <ListOfUsers />
      <Toaster richColors />
    </>
  )
}

export default App
