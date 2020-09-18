import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import TasksList from './TasksList'
import AuthAPI from '../AuthorizationComponent/AuthAPI'
import axios from "axios"
import {githubAuthConst} from '../AuthorizationComponent/AuthConstants'
interface Props {
    history:object
}

export class TasksPage extends Component<Props,{}> {
    async componentDidMount() {
        const code :any = window.location.href.match(/\?code=(.*)/);
        console.log(code[1]);
        const jsonData = JSON.stringify(code);
        const token = await axios.post(`https://github.com/login/oauth/access_token?client_id=${githubAuthConst.client_id}&client_sercret=${githubAuthConst.client_sercret}&code=${code[1]}`,
            code[1], {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }}
        ).then((response) => {
    
            const accessToken = response.data.access_token
            console.log(response.data, 'accessToken: ', accessToken)
            
        })
        console.log(token)
        /* try {
          const response = await axios.post(`https://github.com/login/oauth/access_token?client_id=${githubAuthConst.client_id}&code=${code}&client_sercret=${githubAuthConst.client_sercret}&redirect_uri=http://localhost:3000/tasks`);
          console.log(response);
        } catch (error) {   
          console.error(error);
        } */
        /* if (code) {
          fetch(`https://gitstar.herokuapp.com/authenticate/${code}`)
            .then(response => response.json())
            .then(({ token }) => {
              this.setState({
                token
              });
            });
        } */
      }
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
