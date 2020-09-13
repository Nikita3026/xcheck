import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import TasksList from './TasksList'

export class TasksPage extends Component {
    render() {
        return (
            <div className = "tasks-page-container">
                <Navbar>
                    <TasksList/>
                </Navbar>
            </div>
        )
    }
}

export default TasksPage
