import { combineReducers } from "redux";

import { uiReducer } from "./uiReducer";
import { calendarReducer } from "./calendarReducer";



export const rootReducer = combineReducers({     // recibe como argumento un objeto que muestra como lucira el store
    ui: uiReducer,
    calendar: calendarReducer
    //TODO: CalendarReducer
})

