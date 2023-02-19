import React from 'react';
import s from './Task.module.css'
import {EditableSpan} from "./EditableSpan";
import {Box, Checkbox, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {TaskStatuses} from "../Types/Types";

type TaskPropsType = {
    title: string
    status: TaskStatuses
    removeTask: () => void
    changeTaskTitle: (title: string) => void
    changeTaskStatus: (status: TaskStatuses) => void

}

export const Task = (props: TaskPropsType) => {
    return (
        <li style={{display: 'flex',justifyContent:'space-between', alignItems:'center'}}>
            <Box className={s.checkboxAndTitleWrap}>
                <Checkbox
                    defaultChecked={props.status === TaskStatuses.Completed}
                    onChange={e => props.changeTaskStatus(e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)}
                    color={'primary'}
                />
                <EditableSpan title={props.title} changeTitle={props.changeTaskTitle}/>
            </Box>
            <Box>
                <IconButton aria-label="delete" onClick={props.removeTask}>
                    <DeleteIcon/>
                </IconButton>
            </Box>
        </li>
    );
};

