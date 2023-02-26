import React, {useEffect, useState} from 'react';
import './App.css';

import {FilterValueType, ResponseStatusType, TaskStatuses, TaskType} from "./Types/Types";
import {Todolist} from "./Components/Todolist/Todolist";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./Redux/Reducers/tasksReducer";
import {
    addTodolistTC,
    changeFilterAC,
    changeTodolistTitleTC, getTodolistsTC,
    removeTodolistTC
} from "./Redux/Reducers/todolistsReducer";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {Grid, LinearProgress, Paper} from "@material-ui/core";
import {ToolbarComponent} from "./Components/Toolbar/ToolbarComponent";
import {LoginPage} from "./Components/LoginPage/LoginPage";
import {useAppDispatch, useAppSelector} from "./CustomHooks/CustomHooks";
import SnackbarComponent from "./Components/Snackbar/Snackbar";


function App() {

    //  ----------------  Get State and Dispatch  ------------------

    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const responseStatus: ResponseStatusType = useAppSelector(state => state.app.isLoading)

    const dispatch = useAppDispatch()


    //  ------------  Get Todolists from server  --------------
    useEffect(() => {

        dispatch(getTodolistsTC())

    }, [dispatch])


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
        <div className="App">
            <LoginPage popUp={popUp} closePopUp={closePopUp}/>
            <Paper elevation={4} className={'wrapper'}>
                <ToolbarComponent openPopUp={openPopUp}/>
                {responseStatus === 'loading' ? <LinearProgress /> : <div style={{height:"4px"}}></div>}
                <Grid container spacing={5} style={{padding: '5%'}}>
                    <Grid item xs={12}>
                        <AddItemForm callback={addTodolist} label={'New Todolist'} />
                    </Grid>
                    {todolistsRender}
                </Grid>
            </Paper>
            <SnackbarComponent/>
        </div>
    );
}

export default App;
