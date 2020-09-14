import React, { Component } from 'react'
import {
    BrowserRouter,
    Switch,
    Route
  } from "react-router-dom"
import AuthorizationForm from '../AuthorizationComponent/AuthorizationForm'
import RegistrationForm from '../AuthorizationComponent/RegistrationForm'
import Navbar from '../Navbar/Navbar'
import Reviews from '../Reviews/Reviews'
interface Props {
    history:object
}

export class Router extends Component<Props, {}> {
    render() {
        return (
            <div className = "router-container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/reviews-requests"></Route>
                        <Route path="/verification-request"></Route>
                        <Route path="/checking-another"></Route>
                        <Route path="/self-test"></Route>
                        <Route path="/reviews">
                            <Reviews history={this.props.history}></Reviews>
                        </Route>
                        <Route path="/cross-check"></Route>
                        <Route path="/registration">
                            <RegistrationForm history = {this.props.history}
                         />
                        </Route>
                        <Route path="/tasks">
                            <Navbar history = {this.props.history}/>
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
