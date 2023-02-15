import {ActionType, TasksStateType, TaskStatuses, TaskType} from "../../Types/Types";
import {v1} from "uuid";

const initialState: TasksStateType = {
    ['1']: [
        {
            id: v1(),
            title: 'HTML',
            status: TaskStatuses.Completed,
            addedDate:'',
            deadline: null,
            description: '',
            order: 0,
            priority: 0,
            startDate: '',
            todoListId: '1'

        },
        {
            id: v1(),
            title: 'CSS',
            status: TaskStatuses.Completed,
            addedDate:'',
            deadline: null,
            description: '',
            order: 0,
            priority: 0,
            startDate: '',
            todoListId: '1'
        },

    ],
    ['2']: [
        {
            id: v1(),
            title: 'Beer',
            status: TaskStatuses.Completed,
            addedDate:'',
            deadline: null,
            description: '',
            order: 0,
            priority: 0,
            startDate: '',
            todoListId: '2'
        },
        {
            id: v1(),
            title: 'Meat',
            status: TaskStatuses.Completed,
            addedDate:'',
            deadline: null,
            description: '',
            order: 0,
            priority: 0,
            startDate: '',
            todoListId: '2'

        },
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    debugger
    switch (action.type) {
        case "ADD_TASK":
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.title,
                status: TaskStatuses.New,
                addedDate:'',
                deadline: null,
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                todoListId: action.payload.todolistId
            }
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
                        ? {...t, status: action.payload.status}
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
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            todolistId,
            taskId,
            status
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