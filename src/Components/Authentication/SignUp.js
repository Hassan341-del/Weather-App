import React from 'react'
import './SignUp.css'
export default function SignUp(props) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h1 className='card-title text-center mb-5 fw-light fs-5'>Sign Up</h1>
                <p className='text-center text-danger'>{props.message}</p>
                <form action="" onSubmit={props.signUpUser}>
                  <div className="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput email" name='email' placeholder="" required />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword password" name='password' placeholder="" required />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="password" class="form-control" id="confirmFloatingPassword confirm-password" name='confirmPassword' placeholder="" required />
                    <label htmlFor="confirmFloatingPassword">Confirm Password</label>
                  </div>
                  <div className="d-grid">
                    <button className='btn btn-primary btn-login text-uppercase fw-bold'>Sign Up</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
