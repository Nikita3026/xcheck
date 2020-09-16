import React from 'react'
import Navbar from '../Navbar/Navbar'
import ReviewsRequests from "./ReviewsRequests"

type Props = {
  history:object
}

const ReviewsRequestsPage = (props: Props) => {
  return (
    <div className = "tasks-page-container">
      <Navbar
        history = {props.history}
        pageName = 'Reviews requests'
      >
        <ReviewsRequests />
      </Navbar>
    </div>
    )
}

export default ReviewsRequestsPage
