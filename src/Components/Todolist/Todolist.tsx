import React, {memo, useEffect} from 'react';
import s from "./Todolist.module.css"
import {FilterValueType, TaskStatuses, TaskType, TodolistType} from "../../Types/Types";
import {Task} from "../Task/Task";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import DeleteIcon from "@material-ui/icons/Delete";
import {Box, Grid, IconButton, Card, ButtonGroup, Button, CircularProgress} from "@material-ui/core";
import {useAppDispatch} from "../../CustomHooks/CustomHooks";
import {getTasksTC} from "../../Redux/Reducers/tasksReducer";


type TodolistPropsType = {

    todolist: TodolistType
    tasks: Array<TaskType>
    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    removeTodolist: (todolistId: string) => void
    changeFilter: (todolistId: string, filterValue: FilterValueType) => void
}


export const Todolist = memo((props: TodolistPropsType) => {

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getTasksTC(props.todolist.id))
    }, [dispatch, props.todolist.id])


    const tasksRender = props.tasks.map(t => {
        return (
            <Task
                key={t.id}
                task={t}
                removeTask={() => props.removeTask(props.todolist.id, t.id)}
                changeTaskTitle={(title: string) => props.changeTaskTitle(props.todolist.id, t.id, title)}
                changeTaskStatus={(status: TaskStatuses) => props.changeTaskStatus(props.todolist.id, t.id, status)}
            />
        )

    })

    return (
        <Grid item className={s.todolistWrapper}>
            <Card elevation={5}>
                <Box style={{display: 'flex', flexDirection: 'column', padding: '30px'}}>
                    <h2 className={s.TodoTitle}>
                        <EditableSpan
                            title={props.todolist.title}
                            changeTitle={title => props.changeTodolistTitle(props.todolist.id, title)}
                            disable={props.todolist.entityStatus === "loading"}
                        />


                        <IconButton
                            style={{height:"45px"}}
                            aria-label="delete"
                            onClick={() => props.removeTodolist(props.todolist.id)}
                            size={'medium'}>
                            {
                                props.todolist.entityStatus !== 'loading'
                                    ? <DeleteIcon/>
                                    : <CircularProgress size={20}/>
                            }

                        </IconButton>


                    </h2>
                    <AddItemForm
                        callback={title => props.addTask(props.todolist.id, title)}
                        label={'New Task'}
                        disabled={props.todolist.entityStatus === 'loading'}
                    />
                    <ul>
                        {tasksRender}
                    </ul>

                    <ButtonGroup className={s.buttonGroup}>
                        <Button
                            onClick={() => props.changeFilter(props.todolist.id, 'all')}
                            variant={props.todolist.filter === 'all' ? 'contained' : 'outlined'}
                            color={'primary'}

                        >
                            All
                        </Button>
                        <Button
                            onClick={() => props.changeFilter(props.todolist.id, 'active')}
                            variant={props.todolist.filter === 'active' ? 'contained' : 'outlined'}
                            color={'primary'}
                        >
                            Active
                        </Button>
                        <Button
                            onClick={() => props.changeFilter(props.todolist.id, 'completed')}
                            variant={props.todolist.filter === 'completed' ? 'contained' : 'outlined'}
                            color={'primary'}
                        >
                            Completed
                        </Button>
                    </ButtonGroup>
                </Box>


            </Card>
        </Grid>


    );
});

