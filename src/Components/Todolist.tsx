import React from 'react';
import {FilterValueType, TaskType} from "../Types/Types";
import {Task} from "./Task";
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";
import DeleteIcon from "@material-ui/icons/Delete";
import {Box, Grid, IconButton, Card, ButtonGroup, Button} from "@material-ui/core";


type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    removeTodolist: (todolistId: string) => void
    changeFilter: (todolistId: string, filterValue: FilterValueType) => void
}


export const Todolist = (props: TodolistPropsType) => {
    const tasksRender = props.tasks.map(t => {
        return (
            <Task
                key={t.id}
                title={t.title}
                isDone={t.isDone}
                removeTask={() => props.removeTask(props.todolistId, t.id)}
                changeTaskTitle={(title: string) => props.changeTaskTitle(props.todolistId, t.id, title)}
                changeTaskStatus={(isDone: boolean) => props.changeTaskStatus(props.todolistId, t.id, isDone)}
            />
        )

    })

    return (
        <Grid item>
            <Card elevation={5}>
                <Box style={{display: 'flex', flexDirection: 'column', padding: '30px'}}>
                    <h2 style={{margin:'10px 0'}}>
                        <EditableSpan
                            title={props.title}
                            changeTitle={title => props.changeTodolistTitle(props.todolistId, title)}
                        />
                        <IconButton
                            aria-label="delete"
                            onClick={() => props.removeTodolist(props.todolistId)}
                            size={'medium'}>
                            <DeleteIcon/>
                        </IconButton>
                    </h2>
                    <AddItemForm callback={title => props.addTask(props.todolistId, title)} label={'New Task'}/>
                    <ul>
                        {tasksRender}
                    </ul>

                    <ButtonGroup>
                        <Button
                            onClick={() => props.changeFilter(props.todolistId, 'all')}
                            variant={props.filter === 'all' ? 'contained' : 'outlined'}
                            color={'primary'}

                        >
                            All
                        </Button>
                        <Button
                            onClick={() => props.changeFilter(props.todolistId, 'active')}
                            variant={props.filter === 'active' ? 'contained' : 'outlined'}
                            color={'primary'}
                        >
                            Active
                        </Button>
                        <Button
                            onClick={() => props.changeFilter(props.todolistId, 'completed')}
                            variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                            color={'primary'}
                        >
                            Completed
                        </Button>
                    </ButtonGroup>
                </Box>


            </Card>
        </Grid>


    );
};

