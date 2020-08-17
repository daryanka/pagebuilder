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

  const handleClick = (data) => {
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
    <>
      <h2>Sections</h2>
      <div className={"tree-wrapper"}>
        {/* Render Sections Tree Recursive */}
        {state.data.map(el => RenderTreeItems(el, 0, handleClick))}
      </div>
    </>
  )
}

const RenderTreeItems = (data, nestedIndex, handleClick) => {
  // Note dont render between
  if (data.between) {
    return
  }

  return (
    <React.Fragment key={data.id}>
      <p style={{paddingLeft: `${nestedIndex * 20}px`}} onClick={() => handleClick(data)} className={"tree-item"}>{data.children && "^"} {nameFromType(data.type)}</p>
      {data.openInTree && data.children && (
        data.children.map(child => RenderTreeItems(child, nestedIndex + 1, handleClick))
      )}
    </React.Fragment>
  )
}

export default Tree;