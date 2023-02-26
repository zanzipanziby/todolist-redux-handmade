import React, {useState} from 'react';
import './App.css';

import {ResponseStatusType} from "./Types/Types";
import {LinearProgress, Paper} from "@material-ui/core";
import {ToolbarComponent} from "./Components/Toolbar/ToolbarComponent";
import {useAppSelector} from "./CustomHooks/CustomHooks";
import SnackbarComponent from "./Components/Snackbar/Snackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "./Components/LoginPage/LoginPage";
import {TodolistsContainer} from "./Components/TodolistsContainer";
import {Error404} from "./Components/Error404/Error404";


function App() {


    const responseStatus: ResponseStatusType = useAppSelector(state => state.app.isLoading)


    //-----------   PopUpState ---------------

    // const [popUp, setPopUp] = useState(false)
    // const openPopUp = () => {
    //     setPopUp(true)
    // }
    // const closePopUp = () => {
    //     setPopUp(false)
    // }


    return (
        <div className="App">
            <Paper elevation={4} className={'wrapper'}>
                <ToolbarComponent />
                {responseStatus === 'loading' ? <LinearProgress/> : <div style={{height: "4px"}}></div>}

                <Routes>
                    <Route path='/' element={<TodolistsContainer/>}/>
                    <Route path='login' element={<LoginPage/>}/>
                    <Route path='404' element={<Error404/>}/>
                    <Route path='*' element={<Navigate to={'404'}/>}/>
                </Routes>

            </Paper>
            <SnackbarComponent/>
        </div>
    );
}

export default App;
