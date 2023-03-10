import React, {useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {FilterValueType, StateType, TasksStateType, TaskType, TodolistType} from "./Types/Types";
import {Todolist} from "./Components/Todolist";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./Redux/Reducers/tasksReducer";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./Redux/Reducers/todolistsReducer";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Box, Button, Grid, IconButton, Paper, TextField, Toolbar, Typography} from "@material-ui/core";
import {ToolbarComponent} from "./Components/ToolbarComponent";
import {LoginPage} from "./Components/LoginPage";

function App() {

    const todolists = useSelector<StateType, Array<TodolistType>>((state: StateType) => state.todolists)
    const tasks = useSelector<StateType, TasksStateType>((state: StateType) => state.tasks)
    const dispatch = useDispatch()


    //-----------   PopUpState ---------------

    const [popUp, setPopUp] = useState(false)
    const openPopUp = () => {
        setPopUp(true)
    }
    const closePopUp = () => {
        setPopUp(false)
    }


    //--------  CRUD  ---------------
    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }
    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }
    const changeFilter = (todolistId: string, filterValue: FilterValueType) => {
        dispatch(changeFilterAC(todolistId, filterValue))
    }

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }


    //----------   JSX & MAP  -----------
    const todolistsRender = todolists.map(tl => {
        const taskForTodolist1 = (tasks: Array<TaskType>, filterValue: FilterValueType) => {
            switch (filterValue) {
                case "active":
                    return tasks.filter(t => !t.isDone)
                case "completed":
                    return tasks.filter(t => t.isDone)
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
            <ToolbarComponent openPopUp={openPopUp}/>
            <Grid container spacing={5} style={{paddingTop: '5%'}}>
                <Grid item xs={12}>
                    <AddItemForm callback={addTodolist} label={'New Todolist'}/>
                </Grid>
                {todolistsRender}
            </Grid>

        </div>
    );
}

export default App;
