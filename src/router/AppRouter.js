import React from 'react'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CalendarApp from '../components/calendar/CalendarScreen';
import LoginScreen from '../components/auth/LoginScreen';
import Error from '../components/error/Error';


const AppRouter = () => {
  return (
    <BrowserRouter>
        <div>
            <Routes>

                <Route path="/" element={ <CalendarApp /> } />

                <Route exact path="/login" element={ <LoginScreen />} />

                <Route exact path="/error" element={ <Error />} />

                <Route exact path="*" element={ <Navigate replace to="/error" />} />

            </Routes>
        </div>
    </BrowserRouter>
  )
}

export default AppRouter