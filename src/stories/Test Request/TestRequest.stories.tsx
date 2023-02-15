import React, {useEffect, useState} from 'react';
import {tasksAPI, todolistsAPI} from "../../api/api";

export default {
    title: "API"
}

export const GetTodolist = () => {
    const [state, setState] = useState<any>('')

    useEffect(() => {
        todolistsAPI.getTodolist()
            .then(res => setState(res))

    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    );
};


export const AddTodolist = () => {
    const [state, setState] = useState<any>('')
    const title = 'NewTodoTest'

    useEffect(() => {
        todolistsAPI.addTodolist(title)
            .then(res => setState(res))

    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    );
};


export const RemoveTodolist = () => {
    const [state, setState] = useState<any>('')
    const todolistId = "2e8fa876-d5be-440c-a5a8-d1b0259065ef"

    useEffect(() => {
        todolistsAPI.removeTodolist(todolistId)
            .then(res => setState(res))

    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    );
};
export const ChangeTodolistTitle = () => {
    const [state, setState] = useState<any>('')
    const todolistId = "7575c284-1ea0-4cf8-aa59-921c8660197f"
    const title = 'UPDATE TITLE'

    useEffect(() => {
        todolistsAPI.changeTodolistTitle(todolistId, title)
            .then(res => setState(res))

    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    );
};

export const GetTasks = () => {
    const [state, setState] = useState<any>('')
    const todolistId = "867d38c1-a830-49db-a101-dd0b1575cdd4"

    useEffect(() => {
        tasksAPI.getTasks(todolistId)
            .then(res => setState(res))
    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    );
};

export const AddTask = () => {
    const [state, setState] = useState<any>('')
    const todolistId = "867d38c1-a830-49db-a101-dd0b1575cdd4"
    const title = "New Test Task"

    useEffect(() => {
        tasksAPI.addTask(todolistId, title)
            .then(res => setState(res))
    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    );
};

export const RemoveTask = () => {
    const [state, setState] = useState<any>('')
    const todolistId = "867d38c1-a830-49db-a101-dd0b1575cdd4"
    const taskId = '8b0ccdc9-4fd6-4dc1-9066-4819b6ca41c0'

    useEffect(() => {
        tasksAPI.removeTask(todolistId, taskId)
            .then(res => setState(res))
    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    );
};

export const UpadateTask = () => {
    const [state, setState] = useState<any>('')
    const todolistId = "867d38c1-a830-49db-a101-dd0b1575cdd4"
    const taskId = 'f9ebbb05-12cb-46a8-a98e-6c14438d78b2'
    const updatedTask = {
        title: 'Updated Task',
        description: '',
        status: 1,
        priority: 0,
        startDate: '',
        deadline: '',
    }
    useEffect(() => {
        tasksAPI.updateTask(todolistId, taskId, updatedTask)
            .then(res => setState(res))
    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    );
}






