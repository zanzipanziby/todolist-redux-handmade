import React from 'react';
import {Box, Button, Paper, TextField} from "@material-ui/core";


type LoginPagePropsType = {
    popUp: boolean,
    closePopUp: () => void
}

export const LoginPageLegacy = ({popUp, closePopUp}: LoginPagePropsType) => {
    return (
        <Box style={{
            display: popUp ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            position: "fixed",
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.40)',
            zIndex: 3
        }}>
            <Paper elevation={5}
                   style={{
                       padding: '40px 70px 70px 70px',
                       position: "fixed",
                       zIndex: 4
                   }}>
                <Box>
                    <h3 style={{textAlign: 'center'}}>Login</h3>
                    <Box style={{marginTop: '40px'}}>
                        <TextField variant={'outlined'} label={'Login'}/>
                    </Box>
                    <Box style={{marginTop: '10px'}}>
                        <TextField variant={'outlined'} label={'Password'} type={'password'}/>
                    </Box>
                    <Box style={{display:'flex', justifyContent:'space-around', marginTop: '10px'}}>
                        <Box>
                            <Button variant={'contained'} color={'primary'} onClick={closePopUp}>
                                Sign In
                            </Button>
                        </Box>
                        <Box>
                            <Button variant={'contained'} color={'default'} onClick={closePopUp}>
                                Sign Up
                            </Button>
                        </Box>

                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};
