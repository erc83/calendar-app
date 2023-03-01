import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useDispatch } from "react-redux";          
import { uiOpenModal } from '../../actions/ui';     
import { eventSetActive } from '../../actions/eventsCalendar';

import Navbar from '../ui/Navbar'
import { messages } from '../helpers/calendar-messages-es'
import CalendarEvent from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import AddNewFab from '../ui/AddNewFab';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es'    
import './style.css'


moment.locale('es');    

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

  const dispatch = useDispatch();

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month'  )
  
  const onDoubleClick = (e) => {
    dispatch( uiOpenModal() )      
  }

  const onSelectEvent = (e) => {  // aqui se agrega el dispatch para cambiar el evento activo
    dispatch( eventSetActive( e ) )
    dispatch( uiOpenModal() ) 
    //console.log(e)
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
            event: CalendarEvent    
          }}
        />

        <AddNewFab />

        <CalendarModal />
   </div> 
  
  )
}

export default CalendarScreen