import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import TasksList from './TasksList'

interface Props {
    history:object
}

export class TasksPage extends Component<Props,{}> {
    render() {
        return (
            <div className = "tasks-page-container">
                <Navbar 
                history = {this.props.history}
                pageName = 'tasks'
                >
                    <TasksList/>
                </Navbar>
            </div>
        )
    }
}

export default TasksPage
