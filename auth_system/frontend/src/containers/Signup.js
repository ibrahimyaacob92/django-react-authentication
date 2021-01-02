import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signup } from '../actions/auth'
import axios from 'axios'

const Signup = ({ signup, isAuthenticated }) => {
  const [accountCreated, setaccountCreated] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name:'',
    email: '',
    password: '',
    re_password: ''
  })
  const { first_name, last_name, email, password, re_password } = formData
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = e => {
    e.preventDefault()
    if (password === re_password) {
      signup(first_name, last_name, email, password, re_password)
      setaccountCreated(true)
    }
  }

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)
      window.location.replace(res.data.authorization_url)
      console.log(res.request)
    } catch (error) {
      console.log(error)
    }
  }

  const continueWithFacebook = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)
      window.location.replace(res.data.authorization_url)

    } catch (error) {
      console.log(error)
    }
  }

  // Is user uthenticated ?
  // Redirect to homepage
  if (isAuthenticated) {
    return <Redirect to='/' />
  }
  if (accountCreated) {
    return <Redirect to='/login' />
  }

  return (
    <div className='container mt-5'>
      <h1>Sign Up</h1>
      <p>Sign into your Account</p>
      <form onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='first name'
            name='first_name'
            value={first_name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='Last Name'
            name='last_name'
            value={last_name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='email'
            placeholder='email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='password'
            placeholder='password'
            name='password'
            value={password}
            minLength='6'
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='password'
            placeholder='password confirmation'
            name='re_password'
            value={re_password}
            minLength='6'
            onChange={e => onChange(e)}
            required
          />
        </div>
        <button className='btn btn-primary' type='submit'>Signup</button>
      </form>
      <button className='btn btn-danger mt3' onClick={continueWithGoogle}>Continue with Google</button>
      <button className='btn btn-primary mt3' onClick={continueWithFacebook}>Continue with Facebook</button>
      <p className='mt-3'>
        Forgot your password ? <Link to='/reset-password'>Reset Password</Link>
      </p>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

// this is the part where action is passed to the 
export default connect(mapStateToProps, { signup })(Signup)
