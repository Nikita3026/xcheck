import React, { Component } from 'react'
import {
    BrowserRouter,
    Switch,
    Route
  } from "react-router-dom"
import AuthorizationForm from '../AuthorizationComponent/AuthorizationForm'
import RegistrationForm from '../AuthorizationComponent/RegistrationForm'
import ReviewsPage from '../Reviews/ReviewsPage'
import TasksPage from '../TasksPage/TasksPage'
import VerificationRequestPage from "../VerificationRequest/VerificationRequestPage";
import CheckingAnotherPage from '../CheckingAnother/CheckingAnotherPage'
import ReviewsRequestsPage from '../ReviewsRequests/ReviewsRequestsPage'
import SelfTestPage from '../SelfTest/SelfTestPage'
import CrossCheckPage from '../CrossCheck/CrossCheckPage'
interface Props {
    history:object
}

export class Router extends Component<Props, {}> {
    render() {
        return (
            <div className = "router-container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/reviews-requests">
                            <ReviewsRequestsPage history={this.props.history}/>
                        </Route>
                        <Route path="/verification-request">
                            <VerificationRequestPage history={this.props.history} />
                        </Route>
                        <Route path="/checking-another">
                            <CheckingAnotherPage history={this.props.history}/>
                        </Route>
                        <Route path="/self-test">
                            <SelfTestPage history={this.props.history}/>
                        </Route>
                        <Route path="/reviews">
                            <ReviewsPage history={this.props.history}/>
                        </Route>
                        <Route path="/cross-check">
                            <CrossCheckPage history={this.props.history}/>
                        </Route>
                        <Route path="/registration">
                            <RegistrationForm history = {this.props.history}/>
                        </Route>
                        <Route path="/tasks">
                            <TasksPage history = {this.props.history}/>
                        </Route>
                        <Route exact path="/">
                             <AuthorizationForm history = {this.props.history}/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default Router
