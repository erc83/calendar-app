import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'    // para cambiar el idioma en moment

import Navbar from '../ui/Navbar'
import { messages } from '../helpers/calendar-messages-es'
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('es');    // para cambiar el idioma en moment de los dias y los meses

const localizer = momentLocalizer(moment);

const myEventsList = [{
  title: 'Cumpleaños de Elías',
  start: moment().toDate(),    //new Date()
  end: moment().add( 2, 'hours').toDate(),
  bgcolor: '#fafafa',
  notes: 'Comprar el Pastel'
}]

const CalendarScreen = () => {

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    // console.log(event, start, end, isSelected)
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }

    return {
      style
    }
  
  };
 

  return (
   <div className='calendar-screen'>
        <Navbar />

        <Calendar
          localizer={localizer}
          events={ myEventsList }
          startAccessor="start"
          endAccessor="end"
          messages={ messages }
          eventPropGetter={ eventStyleGetter }
        />
   </div> 
  
  )
}

export default CalendarScreen