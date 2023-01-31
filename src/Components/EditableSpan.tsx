import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './EditableSpan.module.css'
import {Box, TextField} from "@material-ui/core";


type EditableSpanPropsType = {
    title: string
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
        return <span style={{width: '100px', overflow:'hidden'}} onDoubleClick={editModeOn}>{props.title}</span>
    }

};

