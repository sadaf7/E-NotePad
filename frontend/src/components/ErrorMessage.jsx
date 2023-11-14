import { Alert } from "react-bootstrap";

import React from 'react'

const ErrorMessage = ({varient='info',children}) => {
  return (
    <div>
      <Alert variant={varient} style={{fontSize:'20px'}}>
        <strong>{children}</strong>
      </Alert>
    </div>
  )
}

export default ErrorMessage
