import React from "react";

const TextInput = ({label,...props}) => {
  return(
    <>
      {props.label && <p className={"label"}>{props.label}</p>}
      <input
        {...props}
      />
    </>
  )
}

export default TextInput