import React, {useContext} from "react";
import Card from "../../Components/Cards/Card";
import {DropDataContext, SET_SELECTED, UPDATE_SECTION} from "../../DropContext";
import {ImageType, TextType, TwoDroppableColumns, ThreeDroppableColumns, DroppableArea} from "../../CardTypes";

const nameFromType = (t) => {
  switch (t) {
    case TextType:
      return "Text"
    case TwoDroppableColumns:
      return "2 Columns"
    case ThreeDroppableColumns:
      return "Three Columns"
    case DroppableArea:
      return "Empty Section"
    case ImageType:
      return "Image"
    default:
      return ""
  }
}

const Tree = (props) => {
  const [state, dispatch] = useContext(DropDataContext)

  console.log(state)

  return (
    <>
      <h2>Sections</h2>
      <div className={"tree-wrapper"}>
        {/* Render Sections Tree Recursive */}
        {state.data.map(el => RenderTreeItems(el, 0))}
      </div>
    </>
  )
}

const RenderTreeItems = (data, nestedIndex) => {
  const [state, dispatch] = useContext(DropDataContext)

  // Note dont render between
  if (data.between) {
    return
  }

  const handleClick = () => {
    // Set Selected and toggle openInTree
    dispatch({
      type: SET_SELECTED,
      payload: data.id
    })

    dispatch({
      type: UPDATE_SECTION,
      id: data.id,
      payload: {
        ...data,
        openInTree: !data.openInTree
      }
    })
  }

  return (
    <div className={`tree-item-wrapper ${data.children ? "has-children" : ""}`}>
      <p style={{marginLeft: `${nestedIndex * 20}px`}} onClick={handleClick} className={"tree-item"}>{data.children && "^"} {nameFromType(data.type)}</p>
      {data.openInTree && data.children && (
        data.children.map(child => RenderTreeItems(child, nestedIndex + 1))
      )}
    </div>
  )
}

export default Tree;