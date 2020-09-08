import React, {useContext, useState} from "react";
import {DELETE_SECTION, DropDataContext, getSelectedObj, UPDATE_SECTION} from "../../DropContext";
import {CodeType, ImageType, TextType, ThreeDroppableColumns, TwoDroppableColumns} from "../../CardTypes";
import CodeDetails from "./CodeDetails";
import ImageDetails from "./ImageDetails";
import TextDetails from "./TextDetails";
import SizingDetails from "./SizingDetails";
import BorderDetails from "./BorderDetails";
import DroppableDetails from "./DroppableDetails";

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
  }, [state.selected, state.selected.update])

  const handleChangeStyle = (e) => {
    e.persist()
    let val = e.target.value

    if (e.target.name.includes("padding") || e.target.name.includes("margin") || e.target.name.includes("border")) {
      if (e.target.name !== "borderStyle") {
        val = `${e.target.value}px`
      }
    }

    setSelected(prev => ({
      ...prev,
      style: {
        ...prev.style,
        [e.target.name]: val
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
    let option
    switch (selected.type) {
      case TextType:
        option = (
          <TextDetails selected={selected} setSelected={setSelected}/>
        )
        break;
      case ImageType:
        option = (
          <ImageDetails selected={selected} setSelected={setSelected}/>
        )
        break;
      case CodeType:
        option = (
          <CodeDetails selected={selected} setSelected={setSelected}/>
        )
        break;
      case TwoDroppableColumns:
        return(
          <div className="options">
            <DroppableDetails selected={selected} setSelected={setSelected} />
          </div>
        )
      case ThreeDroppableColumns:
        return(
          <div className="options">
            <DroppableDetails selected={selected} setSelected={setSelected} three />
          </div>
        )
      default:
        return null
    }
    return (
      <div className={"options"}>
        {option}
        <SizingDetails selected={selected} setSelected={setSelected}/>
        <BorderDetails selected={selected} setSelected={setSelected}/>
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
      return "Text";
    case CodeType:
      return "Code";
    case ImageType:
      return "Image"
    case TwoDroppableColumns:
      return "Two Columns"
    default:
      return null
  }
}