import React, { useState } from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';

const customStyles = {  // lo podemos dejar en un helpers
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours'); 
const nowPlus1 = now.clone().add( 1, 'hours' );


export const CalendarModal = () => {

    const [ dateStart, setDateStart ] = useState( now.toDate() );
    const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );
    
    const handleStartDateChange = ( e ) => {
      setDateStart( e )
      console.log( e )
    }

    const handleEndDateChange = ( e ) => {
      setDateEnd( e )
      console.log( e )
    }

    const closeModal = () => {
        console.log('closing...')
        //setIsOpen( false )
    }

  return (
    <Modal
        //isOpen={ isOpen }  // si esta en true se muestra si esta en false se oculta
        isOpen={ true }
        // onAfterOpen={afterOpenModal}
        onRequestClose={ closeModal }
        style={ customStyles }
        closeTimeoutMS={ 200 }
        className='modal'
        overlayClassName='modal-fondo'   
    >
        {/* Inicio contenido Modal */}
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container">
            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                <DateTimePicker 
                  onChange={ handleStartDateChange } 
                  /* value={ startDate.toDate() } */ 
                  value={ dateStart } 
                  className="form-control"
                />
            </div>
            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DateTimePicker 
                  onChange={ handleEndDateChange } 
                  /* value={ startDate.toDate() } */ 
                  value={ dateEnd } 
                  minDate={ dateStart }
                  className="form-control"
                />
            </div>
            <hr />
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>
            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>
            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>
        </form>
        {/* Termino contenido Modal */}
    </Modal>
  )
}




