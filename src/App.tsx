import React, {useEffect} from 'react';
import './App.css';

import {ResponseStatusType} from "./Types/Types";
import {LinearProgress, Paper} from "@material-ui/core";
import {ToolbarComponent} from "./Components/Toolbar/ToolbarComponent";
import {useAppDispatch, useAppSelector} from "./CustomHooks/CustomHooks";
import SnackbarComponent from "./Components/Snackbar/Snackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "./Components/LoginPage/LoginPage";
import {TodolistsContainer} from "./Components/TodolistsContainer/TodolistsContainer";
import {Error404} from "./Components/Error404/Error404";
import {checkAutorisationTC} from "./Redux/Reducers/authReducer";


function App() {

    const dispatch = useAppDispatch()
    const isItnitialization = useAppSelector(state=> state.auth.isInitialized)
    const responseStatus: ResponseStatusType = useAppSelector(state => state.app.isLoading)
    useEffect(() => {
        dispatch(checkAutorisationTC())
        return () => {
        }
    }, [])


    //-----------   PopUpState ---------------

    // const [popUp, setPopUp] = useState(false)-
    // const openPopUp = () => {
    //     setPopUp(true)
    // }
    // const closePopUp = () => {
    //     setPopUp(false)
    // }

    if(!isItnitialization) {
        return <div></div>
    }

    return (
        <div className="App">
            <Paper elevation={4} className={'wrapper'}>
                <ToolbarComponent/>
                {responseStatus === 'loading' ? <LinearProgress/> : <div style={{height: "4px"}}></div>}
                <Routes>
                    <Route path='/' element={<TodolistsContainer/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/404' element={<Error404/>}/>
                    <Route path='*' element={<Navigate to={'404'}/>}/>
                </Routes>
            </Paper>
            <SnackbarComponent/>
        </div>
    );
}

export default App;
