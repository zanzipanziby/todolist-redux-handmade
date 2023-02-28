import {ActionType, authStateType, LoginFormDataType} from "../../Types/Types";
import {Dispatch} from "redux";
import {changeResponseStatusAC} from "./appReducer";
import {authAPI} from "../../api/api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error";
import {AxiosError} from "axios";
import {setDefaultStateAC} from "./todolistsReducer";

const initialState: authStateType = {
    isLogged: false,
    isInitialized: false
}


export const authReducer = (state: authStateType = initialState, action: ActionType): authStateType => {
    switch (action.type) {
        case "LOGIN":
            return {...state, isLogged: action.payload.value}
        default:
            return state
        case "INITIALIZED":
            return {...state, isInitialized: action.payload.value}
    }
}


//  ------------   Action Creators   -------------
export type LoginACType = ReturnType<typeof loginAC>
export const loginAC = (value: boolean) => {
    return {
        type: "LOGIN",
        payload: {
            value
        }
    } as const
}


export type ChangeInitializedACType = ReturnType<typeof changeInitializedAC>
export const changeInitializedAC = (value: boolean) => {
    return {
        type: "INITIALIZED",
        payload: {
            value
        }
    } as const
}


//  ------------   Thunk Creators  --------------

export const loginTC = (loginData: LoginFormDataType) => (dispatch: Dispatch) => {
    dispatch(changeResponseStatusAC("loading"))
    authAPI.login(loginData)
        .then((data) => {
            if (data.resultCode === 0) {
                dispatch(loginAC(true))
            } else handleServerAppError(data, dispatch)
            dispatch(changeResponseStatusAC('succeeded'))
        })
        .catch((e: AxiosError) => {
            handleServerNetworkError(e, dispatch)
            dispatch(changeResponseStatusAC('failed'))
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(changeResponseStatusAC("loading"))
    dispatch(setDefaultStateAC())

    authAPI.logOut()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(loginAC(false))
            } else {
                handleServerAppError(data, dispatch)
            }
            dispatch(changeResponseStatusAC('succeeded'))
        })
        .catch((e: AxiosError) => handleServerNetworkError(e, dispatch))

}


export const checkAutorisationTC = () => (dispatch: Dispatch) => {
    dispatch(changeResponseStatusAC('loading'))
    dispatch(changeInitializedAC(false))

    authAPI.me()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(loginAC(true))
            } else {
                handleServerAppError(data, dispatch)
                dispatch(loginAC(false))
            }
            dispatch(changeResponseStatusAC('succeeded'))
        })
        .catch((e: AxiosError) => {
            handleServerNetworkError(e, dispatch)
            dispatch(loginAC(false))
        })
        .finally( () => dispatch(changeInitializedAC(true)))
}
