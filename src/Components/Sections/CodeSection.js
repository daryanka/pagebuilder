import React from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);

const CodeSection = ({ data, language, ...props }) => {

  return (
    <div className={"code-section"} style={props.style ? props.style : {}}>
      <SyntaxHighlighter
        language={language}
        style={dracula}
      >
        {data}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSection;
