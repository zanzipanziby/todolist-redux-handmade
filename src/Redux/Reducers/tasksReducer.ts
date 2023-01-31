import {ActionType, TasksStateType, TaskType} from "../../Types/Types";
import {v1} from "uuid";

const initialState: TasksStateType = {
    ['1']: [
        {id: v1(), title: 'Html', isDone: true},
        {id: v1(), title: 'Css', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ],
    ['2']: [
        {id: v1(), title: 'Beer', isDone: true},
        {id: v1(), title: 'Fish', isDone: true},
        {id: v1(), title: 'Cheese', isDone: false},
        {id: v1(), title: 'Meat', isDone: false},
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    debugger
    switch (action.type) {
        case "ADD_TASK":
            const newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        case "REMOVE_TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.taskId)
            }
        case "CHANGE_TASK_TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? {...t, title: action.payload.title}
                        : t)
            }
        case "CHANGE_TASK_STATUS":
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? {...t, isDone: action.payload.isDone}
                        : t)
            }
        case "REMOVE_TODOLIST":
            delete state[action.payload.todolistId]
            return {...state}
        case "ADD_TODOLIST":
            return {...state, [action.payload.newTodolistId]:[]}
        default:
            return state
    }
}


//-----------  ActionCreators   -------------
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const
}


export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            todolistId,
            taskId,
            title
        }
    } as const
}

export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            todolistId,
            taskId,
            isDone
        }
    } as const
}

export type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title: string) => {

    return {
        type: "ADD_TASK",
        payload: {
            todolistId,
            title

        }
    } as const
}