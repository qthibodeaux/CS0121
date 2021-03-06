import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

function LoginForm () {
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = async (data) => {
    axios.post("/login", {
      email: data.email,
      password: data.password,
    })
    .then(function (response){
      console.log(response)
      if (response.data.emailError) {
        setEmailError(true)
        console.log(emailError)
      }
      if (response.data.passwordError) setPasswordError(true)
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
            <input type="text" className={ errors.email ? "form-control is-invalid" : "form-control"} placeholder="Enter email" name="email" ref={register({ required: "Email is required" })} />
            { emailError ? (<div className="invalid-feedback">
              Please select a valid state.
            </div>) : " huh "}
          </div>
          <div className="mb-3">
            <label className="form-label is-valid">Password</label>
            <input type="password" className="form-control" placeholder="Password" name="password" ref={register({ required: "Passord is required" })} />
            { passwordError && <div className="invalid-feedback">Your password is incorrect</div>}
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