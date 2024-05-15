import React from 'react'
import { getAuth } from 'firebase/auth'
import './Home.css'
export default function Home() {
  const auth = getAuth()
  return (
    <>
     {auth?.currentUser?.accessToken ?
     <div className='d-flex justify-content-center align-items-center home-bg'>
      <h1 className='home-text'>Visit Weather Page to check your current Location's Weather</h1>
     </div>
     :
     <div className='d-flex justify-content-center align-items-center home-bg'>
      <h1 className='home-text'>You need to Sign-Up or Sign-In to check Weather</h1>
     </div>
     } 
    </>
  )
}
