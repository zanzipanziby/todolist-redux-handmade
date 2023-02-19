import {
    ActionType,
    StateType,
    TasksStateType,
    TaskType, UpdatedTaskModelType,
} from "../../Types/Types";

import {Dispatch} from "redux";
import {tasksAPI} from "../../api/api";

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
            return {...state, [action.payload.todolistId]: action.payload.tasks}
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
        case "REMOVE_TODOLIST":
            delete state[action.payload.todolistId]
            return {...state}
        case "ADD_TODOLIST":
            return {...state, [action.payload.todolist.id]: []}
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


// ------------   ThunkCreators   ---------------

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then(data => dispatch(getTasksAC(todolistId, data.items)))
}


export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.removeTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.addTask(todolistId, title)
        .then(data => {
                dispatch(addTaskAC(data.data.item))
            }
        )
}

export const updateTaskTC = <T>(todolistId: string, taskId: string, value: T) =>
    (dispatch: Dispatch, getState: () => StateType) => {
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
                dispatch(updateTaskAC(todolistId, taskId, data.data.item))
            })
    }
