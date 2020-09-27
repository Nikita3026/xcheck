import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import TasksList from './TasksList'
import axios from "axios"
import Requests from '../../utils/requests/requests'
import {githubAuthConst} from '../AuthorizationComponent/AuthConstants'
interface Props {
    history:object
}

export class TasksPage extends Component<Props,{}> {
    state ={
        accessToken: ''
    }
    request = new Requests();
     componentDidMount = async () : Promise<any> => {
        const code :any = window.location.href.match(/\?code=(.*)/);
        if(code){
          const accessToken = await this.request.addOAuthToken(code[1]);
          console.log(accessToken)
          const user = await this.request.getOAuthToken(accessToken)
          if(await this.isAccountUnic(user.login) === 0) {
            await this.request.addData('users', {
              'githubId': user.login,
              'roles': [localStorage.role],
              'password': ''
            })
          } else {
            await this.request.getDataByParameter('users', 'githubId', user.login)
            localStorage.login = user.login;
          }
        }
      }
      isAccountUnic = async (login: string) : Promise<any>=> {
        const data = await this.request.getDataByParameter('users', 'githubId', login);
        return data.length;
      }
    render() {
        localStorage.pageKey = '1';
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
