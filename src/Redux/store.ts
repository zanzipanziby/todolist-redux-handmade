import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./Reducers/todolistsReducer";
import {tasksReducer} from "./Reducers/tasksReducer";
import thunk from "redux-thunk";
import {appReducer} from "./Reducers/appReducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export type RootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer,applyMiddleware(thunk))

//@ts-ignore
window.store = store