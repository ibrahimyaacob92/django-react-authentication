import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {signup} from '../actions/auth'

const Signup = ({signup, isAuthenticated}) => {
    const [accountCreated, setaccountCreated] = useState(false)
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        re_password:''
    })
    const {name, email, password, re_password} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        if (password === re_password){
            signup(name, email, password, re_password)
            setaccountCreated(true)
        }
    }

    // Is user uthenticated ?
    // Redirect to homepage
    if (isAuthenticated){
        return <Redirect to='/'/>
    }
    if (accountCreated){
        return <Redirect to='/login'/>
    }
    
    return (
        <div className='container mt-5'>
            <h1>Sign Up</h1>
            <p>Sign into your Account</p>
            <form onSubmit={e=>onSubmit(e)}>
            <div className='form-group'>
                    <input 
                        className='form-control' 
                        type='text' 
                        placeholder='name'
                        name='name'
                        value={name}
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
export default connect(mapStateToProps, {signup})(Signup)
