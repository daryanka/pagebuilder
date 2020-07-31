import React, {useContext, useRef, useState} from "react";
import {DropDataContext, getSelectedObj, UPDATE_SECTION} from "../DropContext";
import {ImageType, TextType} from "../CardTypes";
import TextInput from "../Components/DetailComponents/TextInput";
import AllPaddings from "../Images/padding-all.png";
import IndividualPaddings from "../Images/padding-individual.png";
import { Editor } from '@tinymce/tinymce-react';
import DomPurify from "dompurify";

const DetailsPanel = () => {
  const [open, setOpen] = useState({
    margin: false,
    padding: false,
    border: false,
    borderRadius: false
  })

  // Set if padding, margin, border or border radius should be all in one or change individually
  const [multiple, setMultiple] = useState({
    margin: false,
    padding: false,
    border: false,
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

    if (e.target.name.includes("padding")) {
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

  const handleMultipleSwitch = (type, val) => {
    setMultiple(prev => ({...prev, [type]: val}))

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

      if (val) {
        // Remove the normal one like margin, padding, border and instead use multiple
        delete returnObj.style[type]
      } else {
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
    return(
      (
        <div className={"group"}>
          <h4 className={"heading"}>
            Sizing
          </h4>
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
                  <img onClick={() => handleMultipleSwitch("padding", true)} src={IndividualPaddings} alt="individual-paddings"/>
                </div>
              </div>
            </div>
            {multiple.padding && (
              <div className={"multiple"}>
                {["Top", "Right", "Bottom", "Left"].map(el => {
                  return(
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
        </div>
      )
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