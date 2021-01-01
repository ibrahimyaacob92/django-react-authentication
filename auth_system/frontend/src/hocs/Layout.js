import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { checkAuthenticated, load_user } from '../actions/auth'
import queryString from 'query-string'


const Layout = ({ children, checkAuthenticated, load_user }) => {

  useEffect(() => {
      checkAuthenticated()
      load_user()
    
  }, [])

  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default connect(null, { checkAuthenticated, load_user })(Layout)
