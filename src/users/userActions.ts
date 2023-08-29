/** @format */
import {
  deleteUserById,
  UserId,
  addNewUser,
  User,
  rollbackUser,
  UserWithId,
  editUser,
} from "./user-slice";
import { useAppDispatch } from "../hooks/store";

export const useUserActions = () => {
  const dispatch = useAppDispatch();
  const handleDeleteUser = (id: UserId) => {
    dispatch(deleteUserById(id));
  };
  const addUser = ({ name, email, github }: User) => {
    dispatch(addNewUser({ name, email, github }));
  };
  const rollback = (props: UserWithId) => {
    dispatch(rollbackUser(props));
  };
  const edit = (props: UserWithId) => {
    dispatch(editUser(props));
  };

  return {
    handleDeleteUser,
    addUser,
    rollback,
    edit,
  };
};

// screaming architecture
