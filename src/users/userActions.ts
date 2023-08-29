/** @format */
import {
  deleteUserById,
  UserId,
  addNewUser,
  User,
  rollbackUser,
  UserWithId,
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

  return {
    handleDeleteUser,
    addUser,
    rollback,
  };
};

// screaming architecture
