import { combineReducers } from "redux";
import { uiReducer } from "./uiReducer";



export const rootReducer = combineReducers({     // recibe como argumento un objeto que muestra como lucira el store
    ui: uiReducer
    //TODO: AuthReducer
    //TODO: CalendarReducer
})

