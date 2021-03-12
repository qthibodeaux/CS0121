import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function Peep () {
    const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = async (data) => {
    alert(JSON.stringify(data));
    axios.post("/login", {
      email: data.email,
      password: data.password,
    })
    .then(function (response){
      
      if (response.data.emailError) {
        
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
        <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">User Name</label>
          <input
            name="username"
            placeholder="Bill"
            ref={register({
              validate: async value => {
                await sleep(3000);
                return value === 'bill';
              },
            })}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input name="lastName" placeholder="Luo" ref={register} />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            placeholder="bluebill1049@hotmail.com"
            type="text"
            ref={register}
          />
        </div>

        <div className="invalid-feedback">
          {Object.keys(errors).length > 0 &&
            'There are errors, check your console.'}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    )
}

export default Peep