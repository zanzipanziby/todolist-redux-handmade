import React from 'react';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

type ToolbarComponentPropsType = {
    openPopUp: () => void
}
export const ToolbarComponent = (props: ToolbarComponentPropsType) => {
    return (
        <AppBar position="static">
            <Toolbar style={{display: "flex", justifyContent: 'space-between'}}>
                <Box style={{display: 'flex', alignItems: 'center'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                </Box>
                <Box>
                    <Button color="inherit" onClick={props.openPopUp}>Login</Button>
                </Box>
            </Toolbar>
        </AppBar>

    );
};

