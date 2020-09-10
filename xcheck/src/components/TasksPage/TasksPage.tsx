import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import CreateTaskForm from './CreateTaskForm/CreateTaskForm'
import TasksList from './TasksList'
import axios from 'axios';

export class TasksPage extends Component {
    componentDidMount() : void{
        axios.post(`http://localhost:3000/users`,{
            "githuvid":"nikita",
            "roles":["student"]
        });
    }

    render() {
        return (
            <div className = "tasks-page-container">
                <Navbar/>
              {/*   <TasksList/> */}
            </div>
        )
    }
}

export default TasksPage
