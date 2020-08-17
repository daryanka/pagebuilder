import React from "react";
import Highlight from "react-highlight.js";

const CodeSection = ({data, language}) => {
  console.log("language", language)
  const t = `function PrintName(name) {
  console.log(name)
}
`

  console.log(data)
  return(
    <div>
      <Highlight lang={language}>
        {data}
      </Highlight>
    </div>
  )
};

export default CodeSection;