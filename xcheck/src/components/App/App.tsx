import React from 'react';
import NavBar from '../Navbar/Navbar'
import AuthorizationForm from '../AuthorizationComponent/AuthorizationForm'
import RegistrationForm from '../AuthorizationComponent/RegistrationForm'
import StartComponent from './StartComponent'
export class App extends React.Component<{history:object},{}> {
  render(){
    return(
    <div className = "App">
      <StartComponent 
      history = {this.props.history}/>
    </div>
    )
  }
}


export default App;
