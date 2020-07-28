import React from "react";

const TextArea = ({label,...props}) => {
  return(
    <>
      {props.label && <p className={"label"}>{props.label}</p>}
      <textarea
        {...props}
      />
    </>
  )
}

export default TextArea