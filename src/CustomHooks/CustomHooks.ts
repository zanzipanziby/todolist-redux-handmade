import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {StateType} from "../Types/Types";


export type AppThunkDispatch = ThunkDispatch<StateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector
