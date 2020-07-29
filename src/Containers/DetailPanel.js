import React, {useContext, useRef, useState} from "react";
import {DropDataContext, getSelectedObj, UPDATE_SECTION} from "../DropContext";
import _ from "lodash";
import {ImageType, TextType} from "../CardTypes";
import TextInput from "../Components/DetailComponents/TextInput";
import TextArea from "../Components/DetailComponents/TextArea";
import AllPaddings from "../Images/padding-all.png";
import IndividualPaddings from "../Images/padding-individual.png"

const DetailsPanel = () => {
  const [open, setOpen] = useState({
    margin: false,
    padding: false,
    border: false,
    borderRadius: false
  })

  const [individual, setIndividual] = useState({
    margin: false,
    padding: false,
    border: false,
    borderRadius: false
  })

  const [selected, setSelected] = useState()
  const [state, dispatch] = useContext(DropDataContext)

  React.useEffect(() => {
    const result = getSelectedObj(state.data, state.selected.id)
    setSelected({...result})
  }, [state.selected])

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

  const handleDataChange = (e) => {
    e.persist()
    setSelected(prev => ({
      ...prev,
      data: e.target.value
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
              <div className="styling">
                <p>Text</p>
                <TextArea
                  name={"data"}
                  onChange={handleDataChange}
                  value={selected.data}
                />
              </div>
            </div>
            {SizePaddingJSX()}
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
            {SizePaddingJSX()}
          </div>
        )
      default:
        return null
    }
  }

  const handleSwitchIndividual = (type, val) => {
    setIndividual(prev => ({...prev, [type]: val}))

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
      }

      return returnObj
    })
  }

  const SizePaddingJSX = () => {
    console.log("parsed value = ", parseInt(selected.style.padding))
    console.log("normal value = ", selected.style.padding)
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
                    disabled={individual.padding}
                    onChange={handleChangeStyle}
                    type={"number"}
                  />
                  <p className={"px"}>px</p>
                </div>
                <div className={"settings"}>
                  <img onClick={() => handleSwitchIndividual("padding", false)} src={AllPaddings} alt="all-paddings"/>
                  <img onClick={() => handleSwitchIndividual("padding", true)} src={IndividualPaddings} alt="individual-paddings"/>
                </div>
              </div>
            </div>
            {individual.padding && (
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