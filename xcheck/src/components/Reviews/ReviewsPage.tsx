import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import Reviews from './Reviews'
interface Props {
    history:object
}

export class ReviewsPage extends Component<Props,{}> {
    render() {
        localStorage.getItem('role') === 'student' ? localStorage.pageKey = '4':localStorage.pageKey = '6';
        return (
            <div className = "reviews-page-container">
                <Navbar
                history = {this.props.history}
                pageName = 'reviews'
                >
                    <Reviews/>
                </Navbar>
            </div>
        )
    }
}

export default ReviewsPage
