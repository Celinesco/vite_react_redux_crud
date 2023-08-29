import { Title } from '@tremor/react';
import './App.css';
import UserForm from './users/components/CreateNewUser';
import ListOfUsers from './users/components/ListOfUsers';
import { Toaster } from 'sonner';
import { useState } from 'react';
import { UserWithId } from './users/user-slice';




function App() {
  const [editForm, setEditForm] = useState<{ user: UserWithId, edit: boolean }>({ user: { id: "", name: "", email: "", github: "" }, edit: false });

  return (
    <>
      <Title>Practica Redux</Title>
      <UserForm editForm={editForm} setEditForm={setEditForm} />
      <ListOfUsers setEditForm={setEditForm} />
      <Toaster richColors />
    </>
  )
}

export default App
