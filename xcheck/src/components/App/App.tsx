import React from 'react';
import AuthorizationForm from '../AuthorizationComponent/Authorization&RegistrationForm'

export class App extends React.Component<{},{}> {
  render(){
    return(
    <div className = "App">
      <AuthorizationForm type='auth'/>
    </div>
  )
  }
}


export default App;
