import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {FilterValueType, TaskStatuses, TaskType} from "../../Types/Types";
import {Todolist} from "../Todolist/Todolist";
import {useAppDispatch, useAppSelector} from "../../CustomHooks/CustomHooks";
import {
    addTodolistTC,
    changeFilterAC,
    changeTodolistTitleTC,
    getTodolistsTC,
    removeTodolistTC
} from "../../Redux/Reducers/todolistsReducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../../Redux/Reducers/tasksReducer";
import {Navigate} from "react-router-dom";
import s from './TodolistsContainer.module.css'

export const TodolistsContainer = () => {


    //  ----------------  Get State and Dispatch  ------------------

    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const isLogged = useAppSelector(state => state.auth.isLogged)
    console.log('login', isLogged)

    const dispatch = useAppDispatch()


    //  ------------  Get Todolists from server  --------------
    useEffect(() => {
        if (!isLogged) {
            return
        }

        dispatch(getTodolistsTC())

    }, [])


    if (!isLogged) {
        return <Navigate to={'/login'}/>
    }


    //-----------  CRUD  ---------------
    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }
    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title: title}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, {status: status}))
    }
    const changeFilter = (todolistId: string, filterValue: FilterValueType) => {
        dispatch(changeFilterAC(todolistId, filterValue))
    }

    const addTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }


    //----------   JSX & MAP  -----------
    const todolistsRender = todolists.map(tl => {
        const taskForTodolist1 = (tasks: Array<TaskType>, filterValue: FilterValueType) => {
            switch (filterValue) {
                case "active":
                    return tasks.filter(t => t.status === TaskStatuses.New)
                case "completed":
                    return tasks.filter(t => t.status === TaskStatuses.Completed)
                default:
                    return tasks
            }
        }

        const propsForTodolist = {
            key: tl.id,
            todolist: tl,
            tasks: taskForTodolist1(tasks[tl.id], tl.filter),
            addTask: addTask,
            removeTask: removeTask,
            changeTaskTitle: changeTaskTitle,
            changeTaskStatus: changeTaskStatus,
            changeTodolistTitle: changeTodolistTitle,
            removeTodolist: removeTodolist,
            changeFilter: changeFilter,
        }
        return (
            <Todolist {...propsForTodolist}/>
        )
    })


    return (
        <Grid container spacing={5} className={s.todolistsContainer}>
            <Grid item xs={12}>
                <AddItemForm callback={addTodolist} label={'New Todolist'}/>
            </Grid>
            {todolistsRender}
        </Grid>
    );
};

