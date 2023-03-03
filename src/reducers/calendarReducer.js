import moment from 'moment';
import { types } from '../types/types';


const initialState = {
    events:[{
        title: 'Cumpleaños de Elías',
        start: moment().toDate(),    //new Date()
        end: moment().add( 2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'Comprar el Pastel',
        user: {
          _id:123,
          name: 'Eric'
        }
    }],
    activeEvent: null
};


export const calendarReducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case types.eventSetActive:
            //console.log(action)
            return {
                ...state,
                activeEvent: action.payload
            }; 

        /* case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, 
                    action.payload
                ]
            } */
        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, 
                    { ...action.payload }   
                ]
            }

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }
    
        default:
            return state;
    }
}