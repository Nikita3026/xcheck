import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import Reviews from './Reviews'
interface Props {
    history:object
}

export class ReviewsPage extends Component<Props,{}> {
    render() {
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