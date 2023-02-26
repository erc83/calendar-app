import { types } from "../types/types";

const initialState = {                      //2 aunque se tenga una propiedad
    modalOpen: false,
}


export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        //case types.uiOpenModal:               //1
        //    return {}   // esta definido pero falta implementar
        
        case types.uiOpenModal:                 //3 
            return {
                ...state, modalOpen: true
            } 
    
        default:
            return state;
    }

}