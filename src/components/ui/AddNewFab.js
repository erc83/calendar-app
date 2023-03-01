// florian action botton
import React from 'react';
import { useDispatch } from "react-redux";
import { uiOpenModal } from '../../actions/ui';

import './style.css';

const AddNewFab = () => {

  const dispatch = useDispatch();

  
  const handleAddNew = ( e ) => {
    console.log('provando handleAddNew')
    dispatch( uiOpenModal() )
  }


  return (
    <button
        className='btn btn-primary fab'   //fab aun no esta creada
        onClick={ handleAddNew }
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}

export default AddNewFab
