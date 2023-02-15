// -------------- State ----------------
import {
    AddTodolistACType, ChangeFilterACType,
    ChangeTodolistTitleACType,
    removeTodolistACType,
    todolistsReducer
} from "../Redux/Reducers/todolistsReducer";
import {
    AddTaskACType,
    ChangeTaskStatusACType,
    ChangeTaskTitleACType,
    RemoveTaskACType,
    tasksReducer
} from "../Redux/Reducers/tasksReducer";

export type StateType = {
    todolists: Array<TodolistType>,
    tasks: TasksStateType
}


// -------------- Todolists --------------------

export type TodolistType = TodolistServerResponseType & { filter: FilterValueType }

export type FilterValueType = 'all' | 'active' | 'completed'


// ----------------  Tasks  ------------------

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type TaskType = {
    id: string
    title: string
    todoListId: string
    status: TaskStatuses
    addedDate: string
    deadline: null
    description: string
    order: number
    priority: number
    startDate: string
}


// ----------------  Task Status -----------------

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}


// ----------------  Action  ---------------------
export type ActionType = RemoveTaskACType
    | ChangeTaskTitleACType
    | ChangeTaskStatusACType
    | ChangeTodolistTitleACType
    | AddTaskACType
    | removeTodolistACType
    | AddTodolistACType
    | ChangeFilterACType


//----------------------------------------------------------
// ------------------|  Response Type  |--------------------
//----------------------------------------------------------

export type TodolistServerResponseType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type UpdatedTaskModel = {
    title: string
    description: string
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
}

export type TodolistResponseType<T = {}> = {
    data: T
    messages: string[]
    fieldErrors: string[]
    resultCode: number
}

export type GetTaskResponseType = {
    items: TaskType[]
    totalCount: number
}

export type TaskResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}


