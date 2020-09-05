import React from "react";
import TextInput from "../../Components/DetailComponents/TextInput";

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

  const handleImgStyleChange = (e) => {
    e.persist()

    setSelected(prev => {
      return {
        ...prev,
        imgStyle: {
          ...prev.imgStyle,
          [e.target.name]: e.target.value
        }
      }
    })
  }

  const handleChangeImgPosition = (position) => {
    setSelected(prev => {
      return {
        ...prev,
        imgPosition: position
      }
    })
  }

  return(
    <div className="group">
      <h4 className={"heading"}>
        Image
      </h4>
      <div className={"styling-4"}>
        <div className="box">
          <p className="p">
            Image: {selected.fileName}
          </p>
          <div className={"clear-btn-wrap"}>
            <button onClick={clearImage}>Clear Image</button>
          </div>
        </div>
        <div className="box">
          <p className="p">
            Width:
          </p>
          <div className={"input-wrap"}>
            <TextInput
              type="text"
              name={"width"}
              value={selected.imgStyle.width}
              placeholder={"100px"}
              onChange={handleImgStyleChange}
            />
          </div>
        </div>
        <div className="box">
          <p className="p">
            Height:
          </p>
          <div className={"input-wrap"}>
            <TextInput
              type="text"
              name={"height"}
              value={selected.imgStyle.height}
              placeholder={"100px"}
              onChange={handleImgStyleChange}
            />
          </div>
        </div>
        <div className="box">
          <p className="p">
            Position:
          </p>
          <div className={"position-btn-wrap"}>
            <button className={selected.imgPosition === "left" && "selected"} onClick={() => handleChangeImgPosition("left")}>Left</button>
            <button className={selected.imgPosition === "center" && "selected"} onClick={() => handleChangeImgPosition("center")}>Center</button>
            <button className={selected.imgPosition === "right" && "selected"} onClick={() => handleChangeImgPosition("right")}>Right</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageDetails