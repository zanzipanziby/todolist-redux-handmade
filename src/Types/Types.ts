// -------------- State ----------------
import {
    AddTodolistACType,
    ChangeFilterACType,
    ChangeTodolistEntityStatusACType,
    ChangeTodolistTitleACType,
    GetTodolistsACType,
    removeTodolistACType, SetDefaultStateACType,
} from "../Redux/Reducers/todolistsReducer";
import {
    AddTaskACType,
    ChangeTaskEntityStatusACType,
    GetTasksACType,
    RemoveTaskACType,
    UpdateTaskACType
} from "../Redux/Reducers/tasksReducer";
import {RootStateType} from "../Redux/store";
import {ChangeResponseStatusACType, SetResponseErrorACType} from "../Redux/Reducers/appReducer";
import {ChangeInitializedACType, LoginACType} from "../Redux/Reducers/authReducer";

export type StateType = RootStateType


// -------------- Todolists --------------------

export type TodolistType = TodolistServerType &
    {
        filter: FilterValueType,
        entityStatus: ResponseStatusType
    }

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
    entityStatus: ResponseStatusType
}


// ----------------  Task Status -----------------

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}


// --------------  AppState   --------------
export type appStateType = {
    isLoading: ResponseStatusType
    error: string | null
}

export type ResponseStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// ------------------  loginFormType  ----------------
export type LoginFormDataType = {
    email: string
    password: string
    rememberMe?: boolean
}


export type LoginFormErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


//  -------------  authStateType  -----------

export type authStateType = {
    isLogged: boolean
    isInitialized: boolean
}


// ----------------   Action  ---------------------
export type ActionType = RemoveTaskACType
    | ChangeTodolistTitleACType
    | AddTaskACType
    | removeTodolistACType
    | AddTodolistACType
    | ChangeFilterACType
    | GetTodolistsACType
    | GetTasksACType
    | UpdateTaskACType
    | ChangeResponseStatusACType
    | SetResponseErrorACType
    | ChangeTodolistEntityStatusACType
    | ChangeTaskEntityStatusACType
    | LoginACType
    | ChangeInitializedACType
    | SetDefaultStateACType


//----------------------------------------------------------
// ------------------|  Response Type  |--------------------
//----------------------------------------------------------

export type TodolistServerType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type UpdatedTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string | null
}


export type TodolistResponseType<T = {}> = {
    data: T
    messages: string[]
    fieldErrors?: string[]
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


