import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div className='container'>
            <div className="jumbotron">
                <h1 className="display-4">Hello, world! Welcome to Auth System</h1>
                <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-4"/>
                <p>Click the login button</p>
                <p className="lead">
                    <Link className="btn btn-primary btn-lg" to='/login' role="button">login</Link>
                </p>
            </div>
        </div>
    )
}

export default Home
