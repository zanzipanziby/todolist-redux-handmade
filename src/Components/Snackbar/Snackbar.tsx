import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {useAppDispatch, useAppSelector} from "../../CustomHooks/CustomHooks";
import {setResponseErrorAC} from "../../Redux/Reducers/appReducer";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function SnackbarComponent() {
    const classes = useStyles();
    const dispatch = useAppDispatch()
    const error = useAppSelector(state => state.app.error)


    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setResponseErrorAC(null));
    };

    return (
        <div className={classes.root}>
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{vertical: "bottom", horizontal: "left"}}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}