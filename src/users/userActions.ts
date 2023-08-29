/** @format */
import { deleteUserById, UserId, addNewUser, User } from "./user-slice";
import { useAppDispatch } from "../hooks/store";

export const useUserActions = () => {
  const dispatch = useAppDispatch();
  const handleDeleteUser = (id: UserId) => {
    dispatch(deleteUserById(id));
  };
  const addUser = ({ name, email, github }: User) => {
    dispatch(addNewUser({ name, email, github }));
  };

  return {
    handleDeleteUser,
    addUser,
  };
};

// screaming architecture
