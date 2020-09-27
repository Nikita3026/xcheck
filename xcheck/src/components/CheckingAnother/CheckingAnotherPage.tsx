import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
interface Props {
    history:object
}

export class CheckingAnotherPage extends Component<Props,{}> {
    render() {
        localStorage.getItem('role') === 'student' ? localStorage.pageKey = '2':localStorage.pageKey = '4';
        return (
            <div className = "reviews-page-container">
                <Navbar
                history = {this.props.history}
                pageName = 'Checking Another'
                />
            </div>
        )
    }
}

export default CheckingAnotherPage
