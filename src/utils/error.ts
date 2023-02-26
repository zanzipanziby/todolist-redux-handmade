import {TaskResponseType} from "../Types/Types";
import {Dispatch} from "redux";
import {changeResponseStatusAC, setResponseErrorAC} from "../Redux/Reducers/appReducer";
import {AxiosError} from "axios";

export const handleServerAppError = <T>(data: TaskResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setResponseErrorAC(data.messages[0]))
    } else {
        dispatch(setResponseErrorAC('some error'))
    }
}


export const handleServerNetworkError = (error:AxiosError, dispatch: Dispatch) => {
    dispatch(setResponseErrorAC(error.message))
    dispatch(changeResponseStatusAC('failed'))
}