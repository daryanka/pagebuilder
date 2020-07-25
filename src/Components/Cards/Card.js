import React, {useContext, useState} from "react";
import {DropDataContext} from "../../DropContext";
import {useDrag} from "react-dnd";
import {getEmptyImage} from "react-dnd-html5-backend";

const Card = (props) => {
  const [a,b,c, setDragging] = useContext(DropDataContext)
  const [dragProps, dragRef, preview] = useDrag({
    item: {
      type: props.type,
      children: props.children ? props.children : null
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
    setDragging(dragProps.isDragging)
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