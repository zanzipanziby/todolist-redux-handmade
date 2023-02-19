import {ActionType, FilterValueType, TodolistServerResponseType, TodolistType} from "../../Types/Types";
// import {v1} from "uuid";
import {Dispatch} from "redux";
import { todolistsAPI} from "../../api/api";


const initialState: Array<TodolistType> = [
    // {id: '1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    // {id: '2', title: 'What to buy', filter: 'all', addedDate: '', order: 0},
]

export const todolistsReducer = (state: Array<TodolistType> = initialState,
                                 action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "GET_TODOLISTS":
            return action.payload.todolists.map(tl => ({...tl, filter: 'all'}))
        case "ADD_TODOLIST":
            return [{...action.payload.todolist, filter: 'all'}, ...state]
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
        default:
            return state
    }
}


//---------------  todolistAC -----------

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistServerResponseType) => {

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
export const getTodolistsAC = (todolists: TodolistServerResponseType[]) => {
    return {
        type: "GET_TODOLISTS",
        payload: {
            todolists
        }
    } as const
}


//---------------  todolistsThunkCreator -----------

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolist()
        .then(data => dispatch(getTodolistsAC(data)))
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.addTodolist(title)
        .then(data => dispatch(addTodolistAC(data.data.item)))
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.removeTodolist(todolistId)
        .then(() => dispatch(removeTodolistAC(todolistId)))
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.changeTodolistTitle(todolistId, title)
        .then(() => dispatch(changeTodolistTitleAC(todolistId, title)))
}