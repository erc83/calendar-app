import React from 'react'
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
        <h1>La Ruta que estas consultando no existe</h1>
        <Link to="//login">Ir a Loguearse</Link>
    </div>
  )
}

export default Error