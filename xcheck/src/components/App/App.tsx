import React from 'react';
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
