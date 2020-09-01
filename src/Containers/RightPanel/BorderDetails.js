import React, {useState} from "react";
import {SketchPicker} from "react-color";
import TextInput from "../../Components/DetailComponents/TextInput";
import AllPaddings from "../../Images/padding-all.png";
import IndividualPaddings from "../../Images/padding-individual.png";

const BorderDetails = ({selected, setSelected}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false)

  const handleBorderColor = (val) => {
    const rgba = `rgba(${val.rgb.r},${val.rgb.g},${val.rgb.b},${val.rgb.a})`

    setSelected(prev => ({
      ...prev,
      style: {
        ...prev.style,
        borderColor: rgba
      },
      border: {
        ...prev.border,
        color: val.rgb
      }
    }))
  }

  const handleChangeStyle = (e) => {
    e.persist()
    let val = e.target.value

    val = `${e.target.value}px`

    setSelected(prev => ({
      ...prev,
      style: {
        ...prev.style,
        [e.target.name]: val
      }
    }))
  }

  const handleBorderWidthSwitch = (multiple) => {
    setSelected(prev => {
      const returnObj = {
        ...prev,
        style: {
          ...prev.style
        },
        borderWidthOptions: {
          ...prev.borderWidthOptions,
          single: !multiple
        },
      }

      if (multiple) {
        // Delete single and add multiple from borderWidthOptions
        delete returnObj.style.padding
        returnObj.style.borderTopWidth = returnObj.borderWidthOptions.borderTopWidth
        returnObj.style.borderBottomWidth = returnObj.borderWidthOptions.borderBottomWidth
        returnObj.style.borderRightWidth = returnObj.borderWidthOptions.borderRightWidth
        returnObj.style.borderLeftWidth = returnObj.borderWidthOptions.borderLeftWidth
      } else {
        // Delete all multiple and add single from borderWidthOptions
        returnObj.style.borderWidth = returnObj.borderWidthOptions.borderWidth
        delete returnObj.style.borderTopWidth
        delete returnObj.style.borderBottomWidth
        delete returnObj.style.borderRightWidth
        delete returnObj.style.borderLeftWidth
      }
      return returnObj
    })
  }

  const handleBorderRadiusSwitch = (multiple) => {
    setSelected(prev => {
      const returnObj = {
        ...prev,
        style: {
          ...prev.style
        },
        borderWidthOptions: {
          ...prev.borderWidthOptions,
          single: !multiple
        },
      }

      if (multiple) {
        // Delete single and add multiple from borderWidthOptions
        delete returnObj.style.padding
        returnObj.style.borderTopWidth = returnObj.borderWidthOptions.borderTopWidth
        returnObj.style.borderBottomWidth = returnObj.borderWidthOptions.borderBottomWidth
        returnObj.style.borderRightWidth = returnObj.borderWidthOptions.borderRightWidth
        returnObj.style.borderLeftWidth = returnObj.borderWidthOptions.borderLeftWidth
      } else {
        // Delete all multiple and add single from borderWidthOptions
        returnObj.style.borderWidth = returnObj.borderWidthOptions.borderWidth
        delete returnObj.style.borderTopWidth
        delete returnObj.style.borderBottomWidth
        delete returnObj.style.borderRightWidth
        delete returnObj.style.borderLeftWidth
      }
      return returnObj
    })
  }

  return (
    <div className={"group"}>
      <h4 className={"heading"}>
        Border
      </h4>
      <div className={"border-col"}>
        <p>
          Color:
        </p>
        {displayColorPicker && <div className={`cover`} onClick={() => setDisplayColorPicker(false)}/>}
        {displayColorPicker &&
        <div className={"picker-pos"}><SketchPicker color={selected.border.color} onChange={handleBorderColor}/>
        </div>}
        <div className={"border"} style={{
          backgroundColor: selected.style.borderColor
        }} onClick={() => setDisplayColorPicker(true)}>
        </div>
      </div>
      <div className={"styling-4"}>
        <div className={"box"}>
          <p className={"p"}>
            Border Style:
          </p>
          <div className="select">
            <select name="borderStyle" onChange={handleChangeStyle}>
              <option value="solid">Solid</option>
              <option value="dotted">Dotted</option>
              <option value="dashed">Dashed</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className={"box"}>
          <p className={"p"}>Border:</p>
          <div className={"four-div"}>
            <div className={"all-style"}>
              <TextInput
                name={"borderWidth"}
                value={parseInt(selected.style.borderWidth) ? parseInt(selected.style.borderWidth) : 0}
                disabled={!selected.borderWidthOptions.single}
                onChange={handleChangeStyle}
                type={"number"}
              />
              <p className={"px"}>px</p>
            </div>
            <div className={"settings"}>
              <img onClick={() => handleBorderWidthSwitch(false)} src={AllPaddings} alt="all-paddings"/>
              <img onClick={() => handleBorderWidthSwitch(true)} src={IndividualPaddings}
                   alt="individual-paddings"/>
            </div>
          </div>
        </div>
        {!selected.borderWidthOptions.single && (
          <div className={"multiple"}>
            {["Top", "Right", "Bottom", "Left"].map(el => {
              return (
                <div key={`border-${el}`} className={"all-style"}>
                  <p className="label">{el}</p>
                  <div className={"with-px"}>
                    <TextInput
                      name={`border${el}Width`}
                      type={"number"}
                      value={parseInt(selected.style[`border${el}Width`]) ? parseInt(selected.style[`border${el}Width`]) : 0}
                      onChange={handleChangeStyle}
                    />
                    <p className={"px"}>px</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        <div className={"box"}>
          <p className={"p"}>Border Radius:</p>
          <div className={"four-div"}>
            <div className={"all-style"}>
              <TextInput
                name={"borderRadius"}
                value={parseInt(selected.style.borderRadius) ? parseInt(selected.style.borderRadius) : 0}
                disabled={multiple.borderRadius}
                onChange={handleChangeStyle}
                type={"number"}
              />
              <p className={"px"}>px</p>
            </div>
            <div className={"settings"}>
              <img onClick={() => handleMultipleSwitch("borderRadius", false)} src={AllPaddings} alt="all-paddings"/>
              <img onClick={() => handleMultipleSwitch("borderRadius", true)} src={IndividualPaddings}
                   alt="individual-paddings"/>
            </div>
          </div>
        </div>
        {multiple.borderRadius && (
          <div className={"multiple"}>
            {["TopRight", "TopLeft", "BottomLeft", "BottomRight"].map(el => {
              return (
                <div key={`border-${el}`} className={"all-style"}>
                  <p className="label">{el}</p>
                  <div className={"with-px"}>
                    <TextInput
                      name={`border${el}Radius`}
                      type={"number"}
                      value={parseInt(selected.style[`border${el}Radius`]) ? parseInt(selected.style[`border${el}Radius`]) : 0}
                      onChange={handleChangeStyle}
                    />
                    <p className={"px"}>px</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default BorderDetails