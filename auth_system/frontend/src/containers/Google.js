import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link,useLocation } from 'react-router-dom'
import { googleAuthenticate } from '../actions/auth'
import queryString from 'query-string'


const Facebook = ({ googleAuthenticate }) => {
  let location = useLocation();

  useEffect(() => {
    const values = queryString.parse(location.search)
    const state = values.state ? values.state : null
    const code = values.code ? values.code : null

    console.log('State: ' + state)
    console.log('Code : ' + code)

    if (state && code) {
      googleAuthenticate(state, code)
    }
  }, [location])

  return (
    <div className='container'>
      <div className="jumbotron">
        <h1 className="display-4">Hello, world! Welcome to Auth System</h1>
        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr className="my-4" />
        <p>Click the login button</p>
        <p className="lead">
          <Link className="btn btn-primary btn-lg" to='/login' role="button">login</Link>
        </p>
      </div>
    </div>
  )
}

export default connect(null, { googleAuthenticate })(Facebook)
