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
       /*  const code :any = window.location.href.match(/\?code=(.*)/);
        const link = `https://github.com/login/oauth/access_token?client_id=cea86e6977b22536af83&client_secret=f911434b84bd6cee8a60180bdd989806e1d29a72&code=${code[1]}`;
        axios.defaults.headers.common = {
          "Content-Type":"application/json"
        }
        const res = await axios.post(link); */
        /* const response = await axios.post(link,{
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*'
          }
      }); */
       /*  const token = await axios.post(link, {
          headers: {
            'Content-Type':"application/json"
          }
        }).then((response) => {
          const accessToken = response.data.access_token
          console.log(response.data, 'accessToken: ', accessToken)
      }) *//* ,
         jsonData, {
            headers: {
               'Accept': 'text/html'
                'Content-Type': 'application/json',
            }}
        ) */
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
