import moment from 'moment';
import { types } from '../types/types';


const initialState = {
    events:[{
        id: new Date().getTime(), 
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

        case types.eventUpdated:    // necesito realizar un map para actualizar el evento con el id que tenga
            return {
                ...state,
                events: state.events.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e 
                )
            }

        // no tengo action donde se tiene la informacion que se necesita para sabar el id de la nota activa
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    e => ( e.id !== state.activeEvent.id )  // si es asi se van a regresar
                ),
                activeEvent: null
            }
    
        default:
            return state;
    }
}