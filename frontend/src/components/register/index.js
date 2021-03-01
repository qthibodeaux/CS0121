import React, { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'

function Index () {
  const { register, handleSubmit, errors } = useForm()
  const password = useRef({})
  //password.current = watch("password", "")
  const [emailValid, setEmailValid] = useState()
  const [passwordValid, setPasswordValid] = useState()
  const [confirmValid, setConfirmValid] = useState()
  const [passwordConfirm, setPasswordConfirm] = useState(false)

  const onSubmit = data => {
    emailsValidation(data)
    if (passwordConfirm) {
      axios.post("/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then(function (response){
        if (response.data.add) {
          console.log(response.data)
        }
        else {
          setEmailValid("is-invalid")
        }
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  }

  const emailsValidation = (data) => {
    setEmailValid("")
    if (data.password.length < 8) {
      setPasswordValid("is-invalid")
    } else {
      setPasswordValid("")
    }

    if (data.confirm != data.password) {
      setConfirmValid("is-invalid")
    } else {
      setConfirmValid("")
    }

    if (passwordValid == "is-invalid" || confirmValid == "is-invalid") {
      console.log("NOT VALID")
      setPasswordConfirm(false)
      return
    } else {
      setPasswordConfirm(true)
    }
  }

    return (
        <div className="col-lg-5 d-flex flex-column">
          <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
            <h4><strong>Create your account</strong></h4>
            <div className="mb-3">
              <label htmlFor="InputFullName" className="form-label">Full Name</label>
              <input type="text" className="form-control" id="InputFullName" placeholder="Enter full name" name="fname" ref={register({ required: true, max: 40 })} />
              {errors.fname && "Full name is required"}
            </div>
            <div className="mb-3">
              <label htmlFor="InputEmail" className="form-label is-valid">Email address</label>
              <input type="email" className={`form-control ${emailValid}`} id="InputEmail" placeholder="Enter email" name="email" id="emailCheck" ref={register({ required: true })} />
              {errors.email && "Email already exists"}
              <div id="validationEmailFeedback" className="invalid-feedback">
                Email already exists
              </div>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword1" className="form-label is-valid">Password</label>
              <input type="password" className={`form-control ${passwordValid}`} id="InputPassword1" placeholder="Password" name="password" ref={register({ required: true, min: 8, max:30})} />
              {errors.password && "Password must have at least 8 characters"}
              <div id="validationPasswordFeedback" className="invalid-feedback">
                Password must have at least 8 characters
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword2" className="form-label is-valid">Confirm Password</label>
              <input type="password" className={`form-control ${confirmValid}`} id="InputPassword2" placeholder="Confirm password" name="confirm" ref={register({ required: true, validate: value => value === password.current })} />
              {errors.confirm && "The passwords do not match"}
              <div id="validationConfirmFeedback" className="invalid-feedback">
                The passwords do not match
              </div>
            </div>
            <button className="btn btn-primary text-light" type="submit">Create Account</button>
            <div className="d-flex justify-content-center">
              <p>Already a user?</p>
              <a href="/">Login to your account</a>
            </div>
          </form>
        </div>
        
    )
}

export default Index