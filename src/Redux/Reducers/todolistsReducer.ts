import {
    ActionType,
    FilterValueType,
    ResponseStatusType,
    TodolistServerType,
    TodolistType
} from "../../Types/Types";
// import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistsAPI} from "../../api/api";
import {changeResponseStatusAC, setResponseErrorAC} from "./appReducer";


const initialState: Array<TodolistType> = [
    // {id: '1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    // {id: '2', title: 'What to buy', filter: 'all', addedDate: '', order: 0},
]

export const todolistsReducer = (state: Array<TodolistType> = initialState,
                                 action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "GET_TODOLISTS":
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case "ADD_TODOLIST":
            return [{...action.payload.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case "REMOVE_TODOLIST":
            return state.filter(tl => tl.id !== action.payload.todolistId)
        case "CHANGE_TODOLIST_TITLE":
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, title: action.payload.title}
                : tl)
        case "CHANGE_FILTER":
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, filter: action.payload.filterValue}
                : tl)
        case "CHANGE_TODO_ENTITY_STATUS":
            return state.map(
                tl => tl.id === action.payload.todolistId
                    ? {...tl, entityStatus: action.payload.status}
                    : tl
            )
        default:
            return state
    }
}


//---------------  todolistAC -----------

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistServerType) => {

    return {
        type: "ADD_TODOLIST",
        payload: {
            todolist
        }
    } as const
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE_TODOLIST",
        payload: {
            todolistId
        }
    } as const
}

export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            todolistId,
            title
        }
    } as const
}

export type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistId: string, filterValue: FilterValueType) => {
    return {
        type: "CHANGE_FILTER",
        payload: {
            todolistId,
            filterValue
        }
    } as const
}

export type GetTodolistsACType = ReturnType<typeof getTodolistsAC>
export const getTodolistsAC = (todolists: TodolistServerType[]) => {
    return {
        type: "GET_TODOLISTS",
        payload: {
            todolists
        }
    } as const
}

export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>
export const changeTodolistEntityStatusAC = (todolistId: string, status: ResponseStatusType) => {
    return {
        type: "CHANGE_TODO_ENTITY_STATUS",
        payload: {
            status,
            todolistId
        }
    } as const
}


//---------------  todolistsThunkCreator -----------

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(changeResponseStatusAC('loading'))
    todolistsAPI.getTodolist()
        .then(data => {
            if (data)
                dispatch(getTodolistsAC(data))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(changeResponseStatusAC('loading'))
    todolistsAPI.addTodolist(title)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(addTodolistAC(data.data.item))
            } else {
                if (data.messages.length) {
                    dispatch(setResponseErrorAC(data.messages[0]))
                } else {
                    dispatch(setResponseErrorAC('some error'))
                }
            }
            dispatch(changeResponseStatusAC('succeeded'))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(changeResponseStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.removeTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(changeResponseStatusAC('succeeded'))
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(changeResponseStatusAC('loading'))
    todolistsAPI.changeTodolistTitle(todolistId, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(todolistId, title))
            dispatch(changeResponseStatusAC('succeeded'))
        });


}