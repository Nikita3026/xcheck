import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
interface Props {
    history:object
}

export class ReviewsRequestsPage extends Component<Props,{}> {
    render() {
        localStorage.pageKey = '2';
        return (
            <div className = "reviews-request-page-container">
                <Navbar
                history = {this.props.history}
                pageName = 'Reviews Request'
                />
            </div>
        )
    }
}

export default ReviewsRequestsPage
