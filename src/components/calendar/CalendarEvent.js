import React from 'react'

const CalendarEvent = ({ event }) => {   // recibe todo el evento
   //  console.log(event, "CalendarEvent.js")    // solo para verlo

    const { title, user } = event;

  return (
    <div>
        <strong>{ title } </strong>
        <span>- { user.name }</span>
    </div>
  )
}

export default CalendarEvent