import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

function LoginForm () {
  const [emailError, setEmailError] = useState(true)
  const [passwordError, setPasswordError] = useState(true)
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    axios.post("/login", {
      email: data.email,
      password: data.password,
    })
    .then(function (response){
      if (response.data.emailError) setEmailError(false)
      if (response.data.passwordError) setPasswordError(false)
      if (response.data) {
        localStorage.setItem("token", response.data.token)
      }
    })
    .catch(function (err) {
      console.log(err)
    })

  }

    return (
        <div className="col-lg-5 d-flex flex-column">
        <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
          <h2><strong>Welcome Back!</strong></h2>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="text" className="form-control" placeholder="Enter email" name="email" ref={register({ required: true })} />
            {emailError ? null : "The email doesn't exist"}
          </div>
          <div className="mb-3">
            <label className="form-label is-valid">Password</label>
            <input type="password" className="form-control" placeholder="Password" name="password" ref={register({ required: true })} />
            {passwordError ? null : "Your password is incorrect"}
          </div>
          <button className="btn btn-primary text-light" type="submit">Login</button>
          <div className="d-flex justify-content-center">
            <p>New user?</p>
            <a href="/"> Create an account.</a>
          </div>
        </form>
      </div>
    )
}

export default LoginForm