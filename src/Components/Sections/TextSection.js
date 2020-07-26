import React from "react";

const TextSection = (props) => {
  return (
    <p
      style={props.style ? props.style : {}}
    >
      {props.data}
    </p>
  )
}

export default TextSection;