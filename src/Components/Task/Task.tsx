import React from 'react';
import s from './Task.module.css'
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Box, Checkbox, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {TaskStatuses, TaskType} from "../../Types/Types";

type TaskPropsType = {
    task: TaskType
    removeTask: () => void
    changeTaskTitle: (title: string) => void
    changeTaskStatus: (status: TaskStatuses) => void

}

export const Task = (props: TaskPropsType) => {
    return (
        <li className={s.task}>
            <Box className={s.checkboxAndTitleWrap}>
                <Checkbox
                    defaultChecked={props.task.status === TaskStatuses.Completed}
                    onChange={e => props.changeTaskStatus(e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)}
                    color={'primary'}
                />
                <EditableSpan title={props.task.title} changeTitle={props.changeTaskTitle} status={props.task.status}/>
            </Box>
            <Box>
                <IconButton aria-label="delete" onClick={props.removeTask}>
                    <DeleteIcon/>
                </IconButton>
            </Box>
        </li>
    );
};

