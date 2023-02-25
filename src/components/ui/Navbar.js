import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand" href="#">Elías</span>
                <div>
                    <ul className="navbar-nav ms-auto">
                        <button className="btn btn-outline-danger">
                            <i className='fas fa-sign-out-alt'></i>
                            <span> Salir</span>
                        </button>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar