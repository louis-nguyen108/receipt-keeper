import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function Home() {
  const { logout, loginWithRedirect } = useAuth0()

  function handleRegister(e) {
    e.preventDefault()
    return loginWithRedirect({
      redirectUri: `${window.location.origin}/register`,
    })
  }

  const { isAuthenticated, user } = useAuth0()

  function handleLogin(e) {
    e.preventDefault()
    return loginWithRedirect()
  }

  function handleLogout(e) {
    e.preventDefault()
    return logout()
  }

  function consoleLog(e) {
    e.preventDefault()
    console.log('isAuthenticated', isAuthenticated)
    console.log('user', user)
  }
  return (
    <div>
      <div className="app">
        <h1>Hello World</h1>
        <IfAuthenticated>
          <button onClick={handleLogout}>Log out</button>
          <button onClick={consoleLog}>Console Log</button>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Log in</button>
        </IfNotAuthenticated>
      </div>

      <Link to="/register">
        <button>register page</button>
      </Link>
      <Link to="/lauren">
        <button>user page</button>
      </Link>
    </div>
  )
}
