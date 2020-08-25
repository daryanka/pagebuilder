import React from "react";

const ImageDetails = ({selected, setSelected}) => {
  const clearImage = () => {
    setSelected(prev => ({
      ...prev,
      data: null
    }))
  }

  if (selected.data === null) {
    return null
  }

  return(
    <div className="group">
      <h4 className={"heading"}>
        Image
      </h4>
      <p>Image: {selected.fileName}</p>
      <button onClick={clearImage}>Clear Image</button>
    </div>
  )
}

export default ImageDetails