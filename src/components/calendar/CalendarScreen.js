import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";          
import { uiOpenModal } from '../../actions/ui';     
import { eventSetActive, eventClearActiveEvent } from '../../actions/eventsCalendar';

import Navbar from '../ui/Navbar'
import { messages } from '../helpers/calendar-messages-es'
import CalendarEvent from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es'    
import './style.css'


moment.locale('es');    

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {

  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector( state => state.calendar )

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month'  )
  
  const onDoubleClick = (e) => {
    dispatch( uiOpenModal() )      
  }

  const onSelectEvent = (e) => {  
    dispatch( eventSetActive( e ) )

  }

  const onViewChange =(e) => {
    //console.log(e)  
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const onSelectSlot = (e) => {
    // console.log(e)
    dispatch( eventClearActiveEvent() ); 

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
          events={ events }
          startAccessor="start"
          endAccessor="end"
          messages={ messages }
          eventPropGetter={ eventStyleGetter }
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelectEvent }
          onSelectSlot={ onSelectSlot }   
          selectable={ true }
          onView={ onViewChange }
          defaultView = { lastView }
          components={{
            event: CalendarEvent    
          }}
        />

        <AddNewFab />

        {
          ( activeEvent ) && <DeleteEventFab />  // si existe activeEvent muestran DeleteEventFab en caso contrario no se muestra
        }


        <CalendarModal />
   </div> 
  
  )
}

export default CalendarScreen