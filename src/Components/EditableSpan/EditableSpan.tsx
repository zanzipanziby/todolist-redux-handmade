import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './EditableSpan.module.css'
import {TextField} from "@material-ui/core";
import {ResponseStatusType, TaskStatuses} from "../../Types/Types";


type EditableSpanPropsType = {
    title: string
    status?: TaskStatuses
    changeTitle: (title: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onBlur = () => {
        if (title.trim()) {
            setEditMode(false)
            props.changeTitle(title.trim())
            setTitle(title.trim())
        }
    }
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title.trim()) {
            setEditMode(false)
            props.changeTitle(title.trim())
            setTitle(title.trim())
        }
    }
    const editModeOn = () => {
        setEditMode(true)
    }


    //----------  JSX  ---------------
    if (editMode) {
        return <>
            <TextField
                label={!title && 'Please, enter value'}
                style={{width: '70%'}}
                size={'medium'}
                variant={'standard'}
                className={s.error}
                error={!title}
                autoFocus={true}
                value={title}
                onChange={onChangeTitle}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
            />

        </>

    } else {
        return (
            <span
                className={props.status !== TaskStatuses.Completed ? s.title : `${s.title} ${s.completed}`}
                onDoubleClick={editModeOn}
            >
                {props.title}
            </span>
        )

    }

};

