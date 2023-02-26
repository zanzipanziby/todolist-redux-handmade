import axios from "axios";
import {
    GetTaskResponseType,
    TaskResponseType, TaskType,
    TodolistResponseType,
    TodolistServerType,
    UpdatedTaskModelType
} from "../Types/Types";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': '4d6597eb-df70-4e85-821c-db8c9bb9a582'
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
        return instance.post<TaskResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: title})
            .then(res => res.data)
    },
    removeTask(todolistId: string, taskId: string) {
        return instance.delete<TaskResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => res.data)
    },
    updateTask(todolistId: string, taskId: string, updatedTask: UpdatedTaskModelType) {
        return instance.put<TaskResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, updatedTask)
            .then(res => res.data)
    },

}








