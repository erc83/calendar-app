import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import Navbar from '../ui/Navbar'
import { messages } from '../helpers/calendar-messages-es'
import CalendarEvent from './CalendarEvent'
import { CalendarModal } from './CalendarModal'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es'    // para cambiar el idioma en moment
import './style.css'


moment.locale('es');    // para cambiar el idioma en moment de los dias y los meses

const localizer = momentLocalizer(moment);

const myEventsList = [{
  title: 'Cumpleaños de Elías',
  start: moment().toDate(),    //new Date()
  end: moment().add( 2, 'hours').toDate(),
  bgcolor: '#fafafa',
  notes: 'Comprar el Pastel',
  user: {
    _id:123,
    name: 'Eric'
  }
}]

const CalendarScreen = () => {

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month'  )
  
  const onDoubleClick = (e) => {
    console.log(e)
  }

  const onSelectEvent = (e) => {
    console.log(e)
  }

  const onViewChange =(e) => {
    console.log(e)  
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

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
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelectEvent }
          onView={ onViewChange }
          defaultView = { lastView }
          components={{
            event: CalendarEvent     // se envia como referencia el componente
          }}
        />

          
        <CalendarModal />
   </div> 
  
  )
}

export default CalendarScreen