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

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType
}

export type FilterValueType = 'all' | 'active' | 'completed'

// ----------------  Tasks  ------------------

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
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