import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../actions/auth'

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    })
    const [loginError, setLoginError] = useState(false)
    
    const {email, password} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        login(email, password)
        if (isAuthenticated==false) setLoginError(true)
    }

    // Is user uthenticated ?
    // Redirect to homepage
    if (isAuthenticated){
        return <Redirect to='/'/>
    }
    
    return (
        <div className='container mt-5'>
            <h1>Sign In</h1>
            <p>Sign into your Account</p>
            <form onSubmit={e=>onSubmit(e)}>
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
                <button className='btn btn-primary' type='submit'>Login</button>
            </form>
            {loginError?<p>Wrong username or password</p>:''}
            <p className='mt-3'>
                Don't have an account ? <Link to='/signup'>Sign Up</Link>
            </p>
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
export default connect(mapStateToProps, {login})(Login)
