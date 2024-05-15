import React from 'react'
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth'
import './Header.css'
export default function Header(props) {
  const auth = getAuth()
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light bg-dark'>
        <div className='container-fluid'>
          <Link to='#' className='navbar-brand logo'>Weather App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span lassName="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to='/' className='nav-link'>Home</Link>
              {auth?.currentUser?.accessToken ?
              <>
              <Link to='/weather' className='nav-link'>Weather</Link>
              <Link className='nav-link' onClick={props.signOutUser}>Sign Out</Link>
              </>
              :
              <>
              <Link to='/sign-up' className='nav-link'>Sign Up</Link>
              <Link to='/sign-in' className='nav-link'>Sign In</Link>
              </>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
