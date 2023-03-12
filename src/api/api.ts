import axios from "axios";
import {
    GetTaskResponseType,
    LoginFormDataType,
    TaskResponseType,
    TaskType,
    TodolistResponseType,
    TodolistServerType,
    UpdatedTaskModelType
} from "../Types/Types";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'e4ef45f4-a82b-4eac-8c32-94376658e62c'
    }
})

export const todolistsAPI = {
    getTodolist() {
        return instance.get<TodolistServerType[]>('todo-lists').then(res => res.data)
    },
    addTodolist(title: string) {
        return instance.post<TodolistResponseType<{ item: TodolistServerType }>>('todo-lists', {title: title})
            .then(res => res.data)
    },
    removeTodolist(todolistId: string) {
        return instance.delete<TodolistResponseType>('todo-lists/' + todolistId)
            .then(res => res.data)
    },
    changeTodolistTitle(todolistId: string, title: string) {
        return instance.put<TodolistResponseType>('todo-lists/' + todolistId, {title: title})
            .then(res => res.data)
    }
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
            .then(res => res.data)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<TaskResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: title})
            .then(res => res.data)
    },
    removeTask(todolistId: string, taskId: string) {
        return instance.delete<TaskResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => res.data)
    },
    updateTask(todolistId: string, taskId: string, updatedTask: UpdatedTaskModelType) {
        return instance.put<TaskResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, updatedTask)
            .then(res => res.data)
    },
}

export const authAPI = {
    login(loginData: LoginFormDataType) {
        return instance.post<TodolistResponseType<{ userId: number }>>('/auth/login', loginData)
            .then(res => res.data)
    },
    me() {
        return instance.get<TodolistResponseType<{ id: number, login: string, email: string }>>('/auth/me')
            .then(res => res.data)
    },
    logOut() {
        return instance.delete<TodolistResponseType>('/auth/login')
            .then(res => res.data)
    }
}








