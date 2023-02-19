import React, {useEffect, useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {FilterValueType, StateType, TasksStateType, TaskStatuses, TaskType, TodolistType} from "./Types/Types";
import {Todolist} from "./Components/Todolist";
import {
    addTaskTC,
    removeTaskTC, updateTaskTC
} from "./Redux/Reducers/tasksReducer";
import {
    addTodolistTC,
    changeFilterAC,
    changeTodolistTitleAC, changeTodolistTitleTC, getTodolistsTC,
    removeTodolistAC, removeTodolistTC
} from "./Redux/Reducers/todolistsReducer";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Box, Button, Grid, IconButton, Paper, TextField, Toolbar, Typography} from "@material-ui/core";
import {ToolbarComponent} from "./Components/ToolbarComponent";
import {LoginPage} from "./Components/LoginPage";
import {useAppDispatch} from "./CustomHooks/CustomHooks";


function App() {

    //  ----------------  Get State and Dispatch  ------------------

    const todolists = useSelector<StateType, Array<TodolistType>>((state: StateType) => state.todolists)
    const tasks = useSelector<StateType, TasksStateType>((state: StateType) => state.tasks)
    const dispatch = useAppDispatch()


    //  ------------  Get Todolists from server  --------------
    useEffect(() => {

        dispatch(getTodolistsTC())

    }, [])


    //-----------   PopUpState ---------------

    const [popUp, setPopUp] = useState(false)
    const openPopUp = () => {
        setPopUp(true)
    }
    const closePopUp = () => {
        setPopUp(false)
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
            todolistId: tl.id,
            title: tl.title,
            tasks: taskForTodolist1(tasks[tl.id], tl.filter),
            filter: tl.filter,
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
        <div className="App">
            <LoginPage popUp={popUp} closePopUp={closePopUp}/>
            <Paper elevation={4}>
                <ToolbarComponent openPopUp={openPopUp}/>
                <Grid container spacing={5} style={{padding: '5%'}}>
                    <Grid item xs={12}>
                        <AddItemForm callback={addTodolist} label={'New Todolist'}/>
                    </Grid>
                    {todolistsRender}
                </Grid>
            </Paper>
        </div>
    );
}

export default App;
