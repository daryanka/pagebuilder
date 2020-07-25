import React, {useContext} from "react";
import {CHANGE_TYPE, DropDataContext} from "../DropContext";
import {useDrop} from "react-dnd";
import {TextType, TwoDroppableColumns, ThreeDroppableColumns, DroppableArea} from "../CardTypes";

const DroppableSection = ({runningIndex, above}) => {
  const [state, dispatch] = useContext(DropDataContext)
  const [{isOver, canDrop, cardType}, dropRef] = useDrop({
    accept: [TextType,TwoDroppableColumns, ThreeDroppableColumns, DroppableArea],
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      cardType: monitor.getItemType()
    }),
    drop: item => {
      console.log(runningIndex)
      dispatch({
        type: CHANGE_TYPE,
        runningIndex: runningIndex,
        payload: item
      })
    }
  })

  const renderPreview = () => {
    if (isOver && canDrop) {
      // Get type and show preview
      switch (cardType) {
        case TextType:
          return textTypePreviewJSX
        default:
          return null
      }
    }

    return null
  }

  return (
    <div
      className={`droppable ${isOver && canDrop && "is-over"}`}
      ref={dropRef}
    >
      {renderPreview()}
    </div>
  )
}

export default DroppableSection;


const textTypePreviewJSX = (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing
    elit. Ab autem, beatae dolor doloribus error
    fuga fugit incidunt libero maiores officia quis.
  </p>
)