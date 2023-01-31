import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./Reducers/todolistsReducer";
import {tasksReducer} from "./Reducers/tasksReducer";

const reducers = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(reducers)

//@ts-ignore
window.store = store