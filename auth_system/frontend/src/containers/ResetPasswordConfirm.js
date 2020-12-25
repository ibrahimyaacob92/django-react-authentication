import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {reset_password, reset_password_confirm} from '../actions/auth'

const ResetPasswordConfirm = ({match, reset_password_confirm}) => {
    const [requestSent, setRequestSent] = useState(false)
    const [formData, setFormData] = useState({
        new_password:'',
        re_new_password:''
    })
    const {new_password, re_new_password} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        
        const uid = match.params.uid
        const token = match.params.token

        reset_password_confirm(uid, token, new_password, re_new_password)
        setRequestSent(true)


    }

    // Is user uthenticated ?
    // Redirect to homepage
    if (requestSent){
        return <Redirect to='/'/>
    }
    
    return (
        <div className='container mt-5'>
            <form onSubmit={e=>onSubmit(e)}>
                <div className='form-group'>
                    <input 
                        className='form-control' 
                        type='password' 
                        placeholder='new password'
                        name='new_password'
                        value={new_password}
                        minLength='6'
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input 
                        className='form-control' 
                        type='password' 
                        placeholder='confirm new password'
                        name='re_new_password'
                        value={re_new_password}
                        minLength='6'
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <button className='btn btn-primary' type='submit'>Reset Password</button>
            </form>

        </div>
    )
}

// this is the part where action is passed to the 
export default connect(null, {reset_password_confirm})(ResetPasswordConfirm)
