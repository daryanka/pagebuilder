import React from "react";

const TextInput = (props) => {
  return(
    <div>
      {props.label && <p className={"label"}>{props.label}</p>}
      <input
        type={props.type ? props.type : "text"}
        onChange={props.handleChange}
        name={props.name}
        value={props.value}
      />
    </div>
  )
}

export default TextInput