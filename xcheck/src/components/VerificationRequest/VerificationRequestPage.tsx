import React from "react"
import Navbar from "../Navbar/Navbar"
import VerificationRequest from "./VerificationRequest"

type Props = {
  history:object
}

const VerificationRequestPage = (props: Props) => {
  localStorage.getItem('role') === 'student' ? localStorage.pageKey = '1':localStorage.pageKey = '3';
  return (
    <Navbar
      history = {props.history}
      pageName = 'Verification request'
    >
      <VerificationRequest />
    </Navbar>
  )
}

export default VerificationRequestPage
