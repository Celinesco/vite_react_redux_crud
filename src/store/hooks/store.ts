/** @format */

import type { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

// si usaras javascript tambien es bueno hacer algo asi, para que redux sea reemplazable. Si no, tenes que importar redux en CADA compoenente. y si el dia de manana cambias a otro administrador de estado, solo deberias cambiar este archivo:
// export const useAppSelector = useSelector;
// export const useAppDispatch = useDispatch;
