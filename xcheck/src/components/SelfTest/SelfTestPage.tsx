import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
interface Props {
    history:object
}

export class SelfTestPage extends Component<Props,{}> {
    render() {
        localStorage.getItem('role') === 'student' ? localStorage.pageKey = '3':localStorage.pageKey = '5';
        return (
            <div className = "self-test-request-page-container">
                <Navbar
                history = {this.props.history}
                pageName = 'Self Test'
                />
            </div>
        )
    }
}

export default SelfTestPage
