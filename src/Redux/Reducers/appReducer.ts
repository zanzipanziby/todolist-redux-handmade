import {ActionType, appStateType, ResponseStatusType} from "../../Types/Types";


const initialState: appStateType = {
    isLoading: 'idle',
    error: null
}


export const appReducer = (state: appStateType = initialState, action: ActionType) => {

    switch (action.type) {
        case "APP/CHANGE_RESPONSE_STATUS":
            return {...state, isLoading: action.payload.status}
        case "APP/SET_RESPONSE_ERROR":
            return {...state, error: action.payload.value}
        default:
            return state
    }

}


// ---------------  Action Creators  ------------

export type ChangeResponseStatusACType = ReturnType<typeof changeResponseStatusAC>
export const changeResponseStatusAC = (status: ResponseStatusType) => {
    return {
        type: "APP/CHANGE_RESPONSE_STATUS",
        payload: {
            status
        }
    } as const
}

export type SetResponseErrorACType = ReturnType<typeof setResponseErrorAC>
export const setResponseErrorAC = (value: string | null) => {
    return {
        type: "APP/SET_RESPONSE_ERROR",
        payload: {
            value
        }
    } as const
}


