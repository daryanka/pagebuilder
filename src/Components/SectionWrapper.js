import React from "react";

const SectionWrapper = (props) => {
  return(
    <div className={`section`}>
      {props.children}
    </div>
  )
}

export default SectionWrapper