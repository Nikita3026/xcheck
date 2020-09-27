import React from 'react'
import Router from '../Router/Router'

export class App extends React.Component<{history:object},{}> {
  render(){
    return(
    <div className = "App">
      <Router
        history = {this.props.history}
      />
    </div>
    )
  }
}


export default App;
