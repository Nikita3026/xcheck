import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import TasksList from './TasksList'
import axios from "axios"
import {githubAuthConst} from '../AuthorizationComponent/AuthConstants'
interface Props {
    history:object
}

export class TasksPage extends Component<Props,{}> {
    state ={
        accessToken: ''
    }
    async componentDidMount() {
        const code :any = window.location.href.match(/\?code=(.*)/);
        console.log(code[1]);
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = `https://github.com/login/oauth/access_token?client_id=${githubAuthConst.client_id}&client_secret=${githubAuthConst.client_secret}&code=${code[1]}`;
         if(code){
          axios({
            method: 'post',
            url: proxyurl + url,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            }
          }).then((response) => {
            const accessToken = response.data.access_token;
            console.log(response.data)
            this.setState({
                accessToken: accessToken
            })
          }).then(() => {
            console.log(this.state.accessToken);
            axios({
              method: 'get',
              url: `https://api.github.com/user?access_token=${this.state.accessToken}&client_id=${githubAuthConst.client_id}&client_secret=${githubAuthConst.client_secret}`,
              headers: {
                  'accept': 'application/json',
                  /* 'Content-Type': 'application/json', */
                  'Connection': 'close',
                  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64)'
              }
            }).then((response) => {
              const user = response
              console.log(user)
              })
          }) 
        }
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
