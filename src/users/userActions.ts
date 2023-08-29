/** @format */
import { deleteUserById, UserId } from "./user-slice";
import { useAppDispatch } from "../hooks/store";

export const useUserActions = () => {
  const dispatch = useAppDispatch();
  const handleDeleteUser = (id: UserId) => {
    dispatch(deleteUserById(id));
  };

  return {
    handleDeleteUser,
  };
};

// screaming architecture
