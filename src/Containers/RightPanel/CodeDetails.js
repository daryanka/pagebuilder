import React from "react";
import Select from "react-select";

const CodeDetails = ({selected, setSelected}) => {
  const handleCodeLanguageChange = (newLanguage) => {
    setSelected(prev => ({
      ...prev,
      language: newLanguage
    }))
  }

  const handleCodeChange = (e) => {
    e.persist()
    setSelected(prev => ({
      ...prev,
      data: e.target.value
    }))
  }

  const options = [
    {
      value: "html",
      label: "HTML"
    },
    {
      value: "jsx",
      label: "Javascript"
    },
    {
      value: "tsx",
      label: "Typescript"
    },
    {
      value: "go",
      label: "Golang"
    },
  ];

  return(
    <>
      <div className="group">
        <h4 className={"heading"}>
          Code
        </h4>
      </div>
      <div className={"code-lang-option"}>
        <p className={"label-d"}>Language:</p>
        <Select
          value={options.find(el => el.value === selected.language)}
          onChange={(e) => handleCodeLanguageChange(e.value)}
          options={options}
        />
      </div>
      <div className={"code-textarea"}>
        <p className={"label-d"}>Code Snippet:</p>
        <textarea value={selected.data} onChange={handleCodeChange} />
      </div>
    </>
  );
}

export default CodeDetails