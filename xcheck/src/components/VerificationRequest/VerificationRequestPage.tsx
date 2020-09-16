import React from "react"
import Navbar from "../Navbar/Navbar"
import VerificationRequest from "./VerificationRequest"

type Props = {
  history:object
}

const VerificationRequestPage = (props: Props) => {
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
