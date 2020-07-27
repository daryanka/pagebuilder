import React, {useContext, useState} from "react";
import {DropDataContext, SET_DRAGGING} from "../../DropContext";
import {useDrag} from "react-dnd";
import {getEmptyImage} from "react-dnd-html5-backend";

const Card = (props) => {
  const [state, dispatch] = useContext(DropDataContext)
  const [dragProps, dragRef, preview] = useDrag({
    item: {
      type: props.type,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      opacity: 1
    })
  })

  React.useEffect(() => {
    preview(getEmptyImage(), {captureDraggingState: true})
  }, [])

  React.useEffect(() => {
    dispatch({
      type: SET_DRAGGING,
      payload: dragProps.isDragging
    })
  }, [dragProps.isDragging])

  return (
    <div
      className={"card"}
    >
      <p ref={dragRef}>{props.name}</p>
    </div>
  )
}

export default Card;