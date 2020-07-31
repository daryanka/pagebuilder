import React from "react";

const TextSection = (props) => {
  return (
    <div
      style={props.style ? props.style : {}}
      dangerouslySetInnerHTML={{
        __html: props.data
      }}
    />
  )
}

export default TextSection;