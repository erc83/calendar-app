import React from 'react'
import { useDispatch } from 'react-redux'
import { eventDeleted } from '../../actions/eventsCalendar';

const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleDelete = ()=> {
        dispatch( eventDeleted() ); 
    }


  return (
    <button
        onClick={ handleDelete }
        className='btn btn-danger fab-danger'
    >
        <i className='fas fa-trash'></i>
        <span> Borrar evento</span>
    </button>
  )
}

export default DeleteEventFab