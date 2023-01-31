import React from 'react';
import {EditableSpan} from "./EditableSpan";
import {Box, Checkbox, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

type TaskPropsType = {
    title: string
    isDone: boolean
    removeTask: () => void
    changeTaskTitle: (title: string) => void
    changeTaskStatus: (isDone: boolean) => void

}

export const Task = (props: TaskPropsType) => {
    return (
        <li style={{display: 'flex',justifyContent:'space-between', alignItems:'center'}}>
            <Box>
                <Checkbox
                    defaultChecked={props.isDone}
                    onChange={e => props.changeTaskStatus(e.currentTarget.checked)}
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

