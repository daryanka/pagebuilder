import React, {useContext, useRef, useState} from "react";
import {DELETE_SECTION, DropDataContext, getSelectedObj, UPDATE_SECTION} from "../DropContext";
import {ImageType, TextType} from "../CardTypes";
import TextInput from "../Components/DetailComponents/TextInput";
import AllPaddings from "../Images/padding-all.png";
import IndividualPaddings from "../Images/padding-individual.png";
import {Editor} from '@tinymce/tinymce-react';
import DomPurify from "dompurify";
import {SketchPicker} from 'react-color';

const DetailsPanel = () => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false)

  // Set if padding, margin, border or border radius should be all in one or change individually
  const [multiple, setMultiple] = useState({
    margin: false,
    padding: false,
    borderWidth: false,
    borderRadius: false
  })

  const [selected, setSelected] = useState()
  const [state, dispatch] = useContext(DropDataContext)

  // Get data from state
  React.useEffect(() => {
    const result = getSelectedObj(state.data, state.selected.id)
    setSelected({...result})
    // Check margin, padding, border, borderRadius to see if they should be multiple or not
    const types = ["margin", "padding", "border"];
    if (result) {
      types.forEach(el => {
        if (result.style[el]) {
          setMultiple((prev) => ({...prev, [el]: false}))
        } else {
          setMultiple((prev) => ({...prev, [el]: true}))
        }
      })
    }
  }, [state.selected, state.selected.update])

  const handleChangeStyle = (e) => {
    e.persist()
    let val = e.target.value

    if (e.target.name.includes("padding") || e.target.name.includes("margin") || e.target.name.includes("border")) {
      val = `${e.target.value}px`
    }

    setSelected(prev => ({
      ...prev,
      style: {
        ...prev.style,
        [e.target.name]: val
      }
    }))
  }

  const handleBorderColor = (val) => {
    const rgba = `rgba(${val.rgb.r},${val.rgb.g},${val.rgb.b},${val.rgb.a})`

    console.log(rgba)

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

  const handleDel = () => {
    dispatch({
      type: DELETE_SECTION,
      id: selected.id
    })
    setSelected(null)
  }

  const clearImage = () => {
    setSelected(prev => ({
      ...prev,
      data: null
    }))
  }

  const handleTextDataChange = (data) => {
    setSelected(prev => ({
      ...prev,
      data: DomPurify.sanitize(data)
    }))
  }

  // Everytime selected is update then also update state
  React.useEffect(() => {
    if (selected && selected.id) {
      dispatch({
        type: UPDATE_SECTION,
        id: selected.id,
        payload: selected
      })
    }
  }, [selected])

  const renderOptions = () => {
    switch (selected.type) {
      case TextType:
        return (
          <div className={"options"}>
            <div className="group">
              <h4 className="heading">
                Text
              </h4>
              <div>
                <Editor
                  initialValue={selected.data}
                  value={selected.data}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime table paste code help wordcount'
                    ],
                    toolbar:
                      'fullscreen | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help'
                  }}
                  onEditorChange={handleTextDataChange}
                  setOptions={{
                    plugins: []
                  }}
                />
              </div>
            </div>
            {SizingJSX()}
            {BorderJSX()}
          </div>
        )
      case ImageType:
        if (!selected.data) {
          return null
        }
        return (
          <div className={"options"}>
            <div className="group">
              <h4 className={"heading"}>
                Image
              </h4>
              <p>Image: {selected.fileName}</p>
              <button onClick={clearImage}>Clear Image</button>
            </div>
            {SizingJSX()}
          </div>
        )
      default:
        return null
    }
  }

  const handleMultipleSwitch = (type, multiple) => {
    setMultiple(prev => ({...prev, [type]: multiple}))

    if (type === "borderRadius") {
      return
    }

    setSelected(prev => {
      const returnObj = {
        ...prev,
        style: {
          ...prev.style
        }
      }

      if (type === "borderWidth") {
        if (multiple) {
          delete returnObj.style[type]
          returnObj.style[`borderTopWidth`] = `0px`
          returnObj.style[`borderBottomWidth`] = `0px`
          returnObj.style[`borderLeftWidth`] = `0px`
          returnObj.style[`borderRightWidth`] = `0px`
        } else {
          delete returnObj.style[`borderTopWidth`]
          delete returnObj.style[`borderBottomWidth`]
          delete returnObj.style[`borderLeftWidth`]
          delete returnObj.style[`borderRightWidth`]

          returnObj.style[`${type}`] = "0px"
        }
        return returnObj
      }

      if (multiple) {
        // Remove the normal one like margin, padding, border and instead use multiple
        delete returnObj.style[type]
      }  else {
        // Remove individuals
        delete returnObj.style[`${type}Top`]
        delete returnObj.style[`${type}Bottom`]
        delete returnObj.style[`${type}Left`]
        delete returnObj.style[`${type}Right`]

        returnObj.style[`${type}`] = "0px"
      }

      return returnObj
    })
  }

  const SizingJSX = () => {
    return (
      (
        <div className={"group"}>
          <h4 className={"heading"}>
            Sizing
          </h4>
          {/* Padding*/}
          <div className={"styling-4"}>
            <div className={"box"}>
              <p className={"p"}>Padding:</p>
              <div className={"four-div"}>
                <div className={"all-style"}>
                  <TextInput
                    name={"padding"}
                    value={parseInt(selected.style.padding) ? parseInt(selected.style.padding) : 0}
                    disabled={multiple.padding}
                    onChange={handleChangeStyle}
                    type={"number"}
                  />
                  <p className={"px"}>px</p>
                </div>
                <div className={"settings"}>
                  <img onClick={() => handleMultipleSwitch("padding", false)} src={AllPaddings} alt="all-paddings"/>
                  <img onClick={() => handleMultipleSwitch("padding", true)} src={IndividualPaddings}
                       alt="individual-paddings"/>
                </div>
              </div>
            </div>
            {multiple.padding && (
              <div className={"multiple"}>
                {["Top", "Right", "Bottom", "Left"].map(el => {
                  return (
                    <div key={`padding-${el}`} className={"all-style"}>
                      <p className="label">{el}</p>
                      <div className={"with-px"}>
                        <TextInput
                          name={`padding${el}`}
                          type={"number"}
                          value={parseInt(selected.style[`padding${el}`]) ? parseInt(selected.style[`padding${el}`]) : 0}
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

          {/* Margin*/}
          <div className={"styling-4"}>
            <div className={"box"}>
              <p className={"p"}>Margin:</p>
              <div className={"four-div"}>
                <div className={"all-style"}>
                  <TextInput
                    name={"margin"}
                    value={parseInt(selected.style.margin) ? parseInt(selected.style.margin) : 0}
                    disabled={multiple.margin}
                    onChange={handleChangeStyle}
                    type={"number"}
                  />
                  <p className={"px"}>px</p>
                </div>
                <div className={"settings"}>
                  <img onClick={() => handleMultipleSwitch("margin", false)} src={AllPaddings} alt="all-paddings"/>
                  <img onClick={() => handleMultipleSwitch("margin", true)} src={IndividualPaddings}
                       alt="individual-paddings"/>
                </div>
              </div>
            </div>
            {multiple.margin && (
              <div className={"multiple"}>
                {["Top", "Right", "Bottom", "Left"].map(el => {
                  return (
                    <div key={`margin-${el}`} className={"all-style"}>
                      <p className="label">{el}</p>
                      <div className={"with-px"}>
                        <TextInput
                          name={`margin${el}`}
                          type={"number"}
                          value={parseInt(selected.style[`margin${el}`]) ? parseInt(selected.style[`margin${el}`]) : 0}
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
    )
  }

  const BorderJSX = () => {
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
            <p className={"p"}>Border:</p>
            <div className={"four-div"}>
              <div className={"all-style"}>
                <TextInput
                  name={"borderWidth"}
                  value={parseInt(selected.style.borderWidth) ? parseInt(selected.style.borderWidth) : 0}
                  disabled={multiple.borderWidth}
                  onChange={handleChangeStyle}
                  type={"number"}
                />
                <p className={"px"}>px</p>
              </div>
              <div className={"settings"}>
                <img onClick={() => handleMultipleSwitch("borderWidth", false)} src={AllPaddings} alt="all-paddings"/>
                <img onClick={() => handleMultipleSwitch("borderWidth", true)} src={IndividualPaddings}
                     alt="individual-paddings"/>
              </div>
            </div>
          </div>
          {multiple.borderWidth && (
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
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>
        Details
      </h1>
      {selected && (
        <>
          <h3>{getName(selected.type)}</h3>
          {renderOptions()}
        </>
      )}
    </div>
  )
}

export default DetailsPanel


const getName = (type) => {
  switch (type) {
    case TextType:
      return "Text Card";
    default:
      return null
  }
}