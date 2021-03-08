import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

function RegisterForm () {
  const [emailError, setEmailError] = useState(false)
  const { register, handleSubmit, errors, getValues } = useForm()
  const onSubmit = async (data) => {
    axios.post("/register", {
      name: data.fname,
      email: data.email,
      password: data.password,
    })
    .then(function (response){
      if (response.data.error) setEmailError(true)
    })
    .catch(function (err) {
      console.log(err)
    })

  }

    return (
      <div className="col-lg-5 d-flex flex-column">
      <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
        <h4><strong>Create your account</strong></h4>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" className={ errors.fname ? "form-control is-invalid" : "form-control"} placeholder="Enter full name" name="fname" ref={register({ required: "Please enter a name", maxLength: { value: 40, message: "Too many characters"} })} />
          { errors.fname && <p>{errors.fname.message}</p> }
        </div>

        <div className="mb-3">
          <label className="form-label is-valid">Email address</label>
          <input type="email" className={ errors.email ? "form-control is-invalid" : "form-control"} placeholder="Enter email" name="email" ref={register({ required: true
          })} />
          {emailError ? null : <div className="invalid-feedback">Email already exists"</div>}
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          
        </div>

        <div className="mb-3">
          <label className="form-label is-valid">Password</label>
          <input type="password" className={ errors.password ? "form-control is-invalid" : "form-control"} placeholder="Password" name="password" ref={register({ required: {value: true, message: "Password is required"}, minLength: { value: 8, message: 'Password must have at least 8 characters'}})} />
          <div className="invalid-feedback">{errors.password?.message}</div>
          
        </div>

        <div className="mb-3">
          <label className="form-label is-valid">Confirm Password</label>
          <input type="password" className={ errors.confirm ? "form-control is-invalid" : "form-control"} placeholder="Confirm password" name="confirm" ref={register({ required: 'Please confirm password!', 
          validate: {
            matchesPreviousPassword: (value) => {
              const { password } = getValues();
              return password === value || "The passwords do not match!"
            }
          } })} />
          <div className="invalid-feedback">{ errors.confirm?.message}</div>
        </div>
        

        <button className="btn btn-primary text-light" type="submit">Create Account</button>

        <div className="d-flex justify-content-center">
          <p>Already a user?</p>
          <a href="/login">Login to your account</a>
        </div>
      </form>
    </div>
        
    )
}

export default RegisterForm