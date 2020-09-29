import * as React from 'react'
import { Button } from 'semantic-ui-react'

export const LogInLogOutButton =({props,isLoggedIn})=> {
  debugger
  console.log(props)
  function handleLogin() {
    props.login()
  }

  function handleLogout() {
    props.logout()
  }
  
  if (isLoggedIn) {
    return (
      <Button onClick={handleLogout}>
        Log Out
      </Button>
    )
  } else {
    return (
      <Button onClick={handleLogin}>
        Log In
      </Button>
    )
  }
}
