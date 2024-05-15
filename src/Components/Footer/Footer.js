import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css'
export default function Footer() {
  return (
    <>
      <footer class="bg-dark text-center text-lg-start">
        <div class="text-center p-3 footer-text">
          © 2024 Copyright: <Link class="text-body footer-text" to="#">Tectsoft.com</Link>
        </div>
      </footer>  
    </>
  )
}
