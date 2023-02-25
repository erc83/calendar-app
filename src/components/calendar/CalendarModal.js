import React, { useState } from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'                      //4 instalación de sweet alert 2

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

    const [ dateStart, setDateStart ] = useState( now.toDate() );
    const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );
    const [titleValid, setTitleValid] = useState( true )      //7   si el titulo esta correcto es true y cuando no sea correcto se llama setTitleValid

    const [ formValues, setFormValues ] = useState({    
      title: 'evento',
      notes: '',
      start: now.toDate(),
      end: nowPlus1.toDate()
    })

    const { notes, title, start, end } = formValues;    //1 se agrega start y end para trabajar de mejor manera la fecha con moment  
    
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
        console.log('closing...')
        //setIsOpen( false )
        //TODO: cerrar el modal                 //12 falta agregar la configuración
    }

    const handleSubmitForm = (e) => {     
      e.preventDefault();
      //console.log( formValues )

      const momentStart = moment( start );        //2 se tranforman las intacias date de javascript a instancias de moment
      const momentEnd = moment( end );
      //console.log(momentStart)
      //console.log(momentEnd)

      
      if(momentStart.isSameOrAfter( momentEnd ) ){   //3 si la fecha de inicializacion es igual o esta despues de la fecha end es un error
        //console.log('Fecha 2 debe de ser mayor')
        Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error') //5
        return;
      }

      if( title.trim().length < 2 ){                //6 validacion de la caja de texto con bootstrap otra forma de hacerlo
        //return;                                      
        return setTitleValid( false );              //8 
      }

      //TODO: falta realizar la grabacion en la base de datos

      setTitleValid(true);                          //11 para que se quite la caja roja con el submit del formulario ok
      closeModal();
    }

  return (
    <Modal
        isOpen={ true }
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
                    //className="form-control is-valid"                               //9 se trabaja  con la clase is-valid y is-invalid
                    className={ `form-control ${ !titleValid && 'is-invalid'} `}      //10 muestra la caja con rojo con el detalle
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




