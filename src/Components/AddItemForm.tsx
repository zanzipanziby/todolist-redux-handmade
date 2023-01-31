import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField, Box, Paper, Button} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


type AddItemFormPropsType = {
    label: string
    callback: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onClick = () => {
        debugger
        if (title.trim()) {
            props.callback(title.trim())
            setTitle('')
        } else {
            setError('Please,enter value')
        }

    }
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClick()
        }
    }


    return (
        <>
            <Box style={{display: "flex", alignItems: "center"}}>
                <TextField
                    label={!error ? props.label : "Please, enter value"}
                    error={!!error}
                    size={'medium'}
                    variant="outlined"
                    value={title}
                    onChange={onChange}
                    onKeyDown={(e) => e.key === 'Enter' && onClick()}
                    onBlur={() => setError(null)}
                />
                <Box>
                    <AddCircleOutlineIcon
                        fontSize={'large'}
                        color={'primary'}
                        onClick={onClick}
                        aria-disabled={!!error}/>
                </Box>
            </Box>
        </>

    );
}

