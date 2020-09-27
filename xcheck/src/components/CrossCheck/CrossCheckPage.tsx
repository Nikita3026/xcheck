import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
interface Props {
    history:object
}

export class CrossCheckPage extends Component<Props,{}> {
    render() {
        localStorage.getItem('role') === 'student' ? localStorage.pageKey = '5':localStorage.pageKey = '7';
        return (
            <div className = "cross-check-request-page-container">
                <Navbar
                history = {this.props.history}
                pageName = 'Cross Check'
                />
            </div>
        )
    }
}

export default CrossCheckPage
