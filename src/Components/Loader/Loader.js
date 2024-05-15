import React from 'react'
import Lottie from 'lottie-react'
import Animation from './Loading.json'
import './Loader.css'
export default function Loader() {
  return (
    <>
    <div className='d-flex justify-content-center'>
        <Lottie animationData={Animation} loop={true} autoPlay={true} className='lottie'/>
    </div>
    </>
  )
}
