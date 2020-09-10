import React from 'react';
import TasksPage from '../TasksPage/TasksPage';

export class App extends React.Component<{},{}> {
  render(){
    return(
    <div className = "App">
      <TasksPage/>
    </div>
  )
  }
}


export default App;
