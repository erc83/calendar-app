import React, { useState } from 'react';
import { useDispatch,  useSelector } from "react-redux";
import { uiCloseModal } from '../../actions/ui';

import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'                   

const customStyles = {  
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

    // const state = useSelector( state => state );               // tenemos el state completo de la app 
    // console.log(state.ui.modalOpen)                           // para llegar a la propiedad false
    const { modalOpen } = useSelector( state => state.ui );      //1  asi podemos desestructurar modalOpen de ui en el state 
    
    const dispatch = useDispatch();

    const [ dateStart, setDateStart ] = useState( now.toDate() );
    const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );
    const [titleValid, setTitleValid] = useState( true )      

    const [ formValues, setFormValues ] = useState({    
      title: 'evento',
      notes: '',
      start: now.toDate(),
      end: nowPlus1.toDate()
    })

    const { notes, title, start, end } = formValues;    
    
    const handleInputChange = ({ target }) => {  

      setFormValues({            
        ...formValues,
        [target.name]: target.value
      });

    }

    const handleStartDateChange = ( e ) => {     
      setDateStart( e )
      // console.log( e )
      setFormValues({                 
        ...formValues,
        start: e 
      })
    }

    const handleEndDateChange = ( e ) => {
      setDateEnd( e )
      //console.log( e )
      setFormValues({                 
        ...formValues,
        end: e 
      })

    }

    const closeModal = () => {
        console.log( 'closing... el modalOpen false' )
        dispatch( uiCloseModal() )
        //TODO: cerrar el modal                 
    }

    const handleSubmitForm = (e) => {     
      e.preventDefault();
      //console.log( formValues )

      const momentStart = moment( start );        
      const momentEnd = moment( end );
      //console.log(momentStart)
      //console.log(momentEnd)

      
      if(momentStart.isSameOrAfter( momentEnd ) ){   
        //console.log('Fecha 2 debe de ser mayor')
        Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error') //5
        return;
      }

      if( title.trim().length < 2 ){                
        //return;                                      
        return setTitleValid( false );              
      }

      //TODO: falta realizar la grabacion en la base de datos

      setTitleValid(true);                          
      closeModal();
    }

  return (
    <Modal
        /* isOpen={ true } */
        isOpen={ modalOpen }
        onRequestClose={ closeModal }
        style={ customStyles }
        closeTimeoutMS={ 200 }
        className='modal'
        overlayClassName='modal-fondo'   
    >
        {/* Inicio contenido Modal */}
        <h1> Nuevo evento </h1>
        <hr />
        <form 
          className="container"
          onSubmit={ handleSubmitForm }                
        
        >
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
                    //className="form-control is-valid"                               
                    className={ `form-control ${ !titleValid && 'is-invalid'} `}    
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ title }                     
                    onChange={ handleInputChange }      
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
                    value={ notes }                     
                    onChange={ handleInputChange }      
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




