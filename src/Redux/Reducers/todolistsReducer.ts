import {ActionType, FilterValueType, TodolistType} from "../../Types/Types";
import {v1} from "uuid";

const initialState: Array<TodolistType> = [
    {id: '1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: '2', title: 'What to buy',filter: 'all', addedDate: '', order: 0},
]

export const todolistsReducer = (state: Array<TodolistType> = initialState,
                                 action: ActionType) => {
    switch (action.type) {
        case "ADD_TODOLIST":
            return [
                ...state,
                {id: action.payload.newTodolistId, title: action.payload.title, filter: 'all'}]
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

//------------  todolistAC ---------
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {

    return {
        type: "ADD_TODOLIST",
        payload: {
            title,
            newTodolistId: v1()
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