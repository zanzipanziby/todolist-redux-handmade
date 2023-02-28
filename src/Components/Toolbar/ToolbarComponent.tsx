import React from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../../CustomHooks/CustomHooks";
import {logoutTC} from "../../Redux/Reducers/authReducer";

type ToolbarComponentPropsType = {
    callback?: () => void
}
export const ToolbarComponent = (props: ToolbarComponentPropsType) => {
    const dispatch = useAppDispatch()

    const isLogged = useAppSelector(state => state.auth.isLogged)
    const logOutHandler = () => {
        dispatch(logoutTC())
    }



    return (
        <AppBar position="static">
            <Toolbar style={{display: "flex", justifyContent: 'space-between'}}>
                <Box style={{display: 'flex', alignItems: 'center'}}>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                </Box>
                <Box>
                    {isLogged && <Button color="inherit" onClick={logOutHandler}>Log out</Button>}

                </Box>
            </Toolbar>
        </AppBar>

    );
};

