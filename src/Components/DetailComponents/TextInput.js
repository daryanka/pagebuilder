import React from "react";

const TextInput = ({label,...props}) => {
  return(
    <>
      {props.label && props.label}
      <input
        type={props.type ? props.type : "text"}
        {...props}
      />
    </>
  )
}

export default TextInput