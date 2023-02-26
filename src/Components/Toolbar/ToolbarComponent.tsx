import React from 'react';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

type ToolbarComponentPropsType = {
    callback?: () => void
}
export const ToolbarComponent = (props: ToolbarComponentPropsType) => {
    return (
        <AppBar position="static">
            <Toolbar style={{display: "flex", justifyContent: 'space-between'}}>
                <Box style={{display: 'flex', alignItems: 'center'}}>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                </Box>
                <Box>
                    <Button color="inherit" onClick={props.callback}>Login</Button>
                </Box>
            </Toolbar>
        </AppBar>

    );
};

