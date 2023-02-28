import {
    ActionType, ResponseStatusType,
    StateType,
    TasksStateType,
    TaskType, UpdatedTaskModelType,
} from "../../Types/Types";

import {Dispatch} from "redux";
import {tasksAPI} from "../../api/api";
import {changeResponseStatusAC} from "./appReducer";
import {changeTodolistEntityStatusAC} from "./todolistsReducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error";

const initialState: TasksStateType = {
    // ['1']: [
    //     {
    //         id: v1(),
    //         title: 'HTML',
    //         status: TaskStatuses.Completed,
    //         addedDate: '',
    //         deadline: null,
    //         description: '',
    //         order: 0,
    //         priority: 0,
    //         startDate: '',
    //         todoListId: '1'
    //
    //     },
    //     {
    //         id: v1(),
    //         title: 'CSS',
    //         status: TaskStatuses.Completed,
    //         addedDate: '',
    //         deadline: null,
    //         description: '',
    //         order: 0,
    //         priority: 0,
    //         startDate: '',
    //         todoListId: '1'
    //     },
    //
    // ],
    // ['2']: [
    //     {
    //         id: v1(),
    //         title: 'Beer',
    //         status: TaskStatuses.Completed,
    //         addedDate: '',
    //         deadline: null,
    //         description: '',
    //         order: 0,
    //         priority: 0,
    //         startDate: '',
    //         todoListId: '2'
    //     },
    //     {
    //         id: v1(),
    //         title: 'Meat',
    //         status: TaskStatuses.Completed,
    //         addedDate: '',
    //         deadline: null,
    //         description: '',
    //         order: 0,
    //         priority: 0,
    //         startDate: '',
    //         todoListId: '2'
    //
    //     },
    // ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "GET_TODOLISTS":
            action.payload.todolists.forEach(el => state[el.id] = [])
            return {...state}
        case "GET_TASKS":
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks.map((t) => ({...t, entityStatus: "idle"}))
            }
        case "ADD_TASK":
            return {
                ...state, [action.payload.task.todoListId]: [
                    action.payload.task, ...state[action.payload.task.todoListId]
                ]
            }
        case "REMOVE_TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.taskId)
            }
        case "UPDATE_TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(
                        t => t.id === action.payload.taskId
                            ? {...t, ...action.payload.updatedTask}
                            : t
                    )
            }
        case "CHANGE_TASK_ENTITY_STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? {...t, entityStatus: action.payload.status}
                        : t)
            }
        case "REMOVE_TODOLIST":
            delete state[action.payload.todolistId]
            return {...state}
        case "ADD_TODOLIST":
            return {...state, [action.payload.todolist.id]: []}
        case "SET_DEFAULT_STATE":
            return {}
        default:
            return state
    }
}


//-----------  ActionCreators   -------------
export type GetTasksACType = ReturnType<typeof getTasksAC>
export const getTasksAC = (todolistId: string, tasks: TaskType[]) => (
    {
        type: "GET_TASKS",
        payload: {
            todolistId,
            tasks
        }
    } as const)
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

export type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistId: string, taskId: string, updatedTask: TaskType) => {
    return {
        type: "UPDATE_TASK",
        payload: {
            todolistId,
            taskId,
            updatedTask
        }
    } as const
}

export type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) => {

    return {
        type: "ADD_TASK",
        payload: {
            task
        }
    } as const
}

export type ChangeTaskEntityStatusACType = ReturnType<typeof changeTaskEntityStatusAC>
export const changeTaskEntityStatusAC = (todolistId: string, taskId: string, status: ResponseStatusType) => (
    {
        type: "CHANGE_TASK_ENTITY_STATUS",
        payload: {
            todolistId,
            taskId,
            status
        }
    } as const
)





// ------------   ThunkCreators   ---------------

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then(data => {
            dispatch(getTasksAC(todolistId, data.items))
            dispatch(changeResponseStatusAC('succeeded'))
        })
        .catch((e: AxiosError) => {
            handleServerNetworkError(e, dispatch)
            dispatch(changeResponseStatusAC('failed'))
        })
}


export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(changeTaskEntityStatusAC(todolistId,taskId, "loading"))
    tasksAPI.removeTask(todolistId, taskId)
        .then(data => {
            if(data.resultCode === 0) dispatch(removeTaskAC(todolistId, taskId))
            else handleServerAppError(data,dispatch)
            dispatch(changeTaskEntityStatusAC(todolistId,taskId,"succeeded"))
        })
        .catch((e: AxiosError) => {
            handleServerNetworkError(e, dispatch)
            dispatch(changeTaskEntityStatusAC(todolistId,taskId,"failed"))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(changeResponseStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
    tasksAPI.addTask(todolistId, title)
        .then(data => {
                if (data.resultCode === 0) {
                    dispatch(addTaskAC(data.data.item))
                } else handleServerAppError(data, dispatch)
                dispatch(changeResponseStatusAC('succeeded'))
                dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
            }
        )
        .catch((e: AxiosError) => handleServerNetworkError(e, dispatch))
        .finally(()=> changeTodolistEntityStatusAC(todolistId, 'idle'))
}

export const updateTaskTC = <T>(todolistId: string, taskId: string, value: T) =>
    (dispatch: Dispatch, getState: () => StateType) => {

        dispatch(changeResponseStatusAC("loading"))
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('Task is not defined')
            return
        }
        const updatedTask: UpdatedTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...value
        }

        tasksAPI.updateTask(todolistId, taskId, updatedTask)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistId, taskId, data.data.item))
                } else handleServerAppError(data, dispatch)

                dispatch(changeResponseStatusAC("succeeded"))
            })
            .catch((e: AxiosError) => handleServerNetworkError(e, dispatch))
    }
