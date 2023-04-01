import React from 'react'
import {Alert} from 'react-bootstrap'
function MessageBox(props) {
  console.log('Here at the Message box due to some error occured while performing the process!!');
  console.log('Props of the variant are: ',props.variant);
  console.log('Props children are: ',props.children);
    return (
      <Alert variant="danger" style={{ width: "42rem" }}>
      <Alert.Heading>
        Your Request Failed due to below reasons
      </Alert.Heading>
      {props.children}
    </Alert>
    
  )
}

export default MessageBox
