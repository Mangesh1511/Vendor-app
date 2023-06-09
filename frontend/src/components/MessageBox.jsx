import React from 'react'
import {Alert} from 'react-bootstrap'
function MessageBox(props) {
  console.log('Here at the Message box due to some error occured while performing the process!!');
  console.log('Props of the variant are: ',props.variant);
  console.log('Props children are: ',props.children);
  if(props.variant==="danger")
    return (
      <Alert variant={props.variant} style={{ width: "42rem" }}>
      <Alert.Heading>
        {props.message}
      </Alert.Heading>
      {props.children}
    </Alert>
    
  )
  else
  {
    return(
      <Alert variant={props.variant} style={{width:"42rem"}}>
        <Alert.Heading>
        
        </Alert.Heading>
        {props.children}
      </Alert>
    )
  }
}

export default MessageBox
