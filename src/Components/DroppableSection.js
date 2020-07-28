import React, {useContext} from "react";
import {CHANGE_TYPE, DropDataContext, SET_SELECTED} from "../DropContext";
import {useDrop} from "react-dnd";
import {TextType, TwoDroppableColumns, ThreeDroppableColumns, DroppableArea, ImageType} from "../CardTypes";
import {v4} from "uuid";
import ImageTypeBackground from "../Images/placeholder-img.jpg";

const DroppableSection = ({runningIndex, between}) => {
  const [state, dispatch] = useContext(DropDataContext)
  const [{isOver, canDrop, cardType}, dropRef] = useDrop({
    accept: [
      TextType,
      TwoDroppableColumns,
      ThreeDroppableColumns,
      DroppableArea,
      ImageType
    ],
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      cardType: monitor.getItemType()
    }),
    drop: item => {
      const id = v4()

      const payload = {
        ...item, id: id,
      }

      switch (item.type) {
        case TextType:
          payload.style = {}
          payload.data = "Add some text..."
          break;
        case TwoDroppableColumns:
          payload.children = [
            {
              type: DroppableArea
            },
            {
              type: DroppableArea
            }
          ]
          payload.wrapperClassName = "droppable-col-2"
          break;
        case ThreeDroppableColumns:
          payload.children = [
            {
              type: DroppableArea
            },
            {
              type: DroppableArea
            },
            {
              type: DroppableArea
            }
          ]
          payload.wrapperClassName = "droppable-col-3"
          break;
        case ImageType:
          payload.style = {
            height: "200px"
          }
          payload.data = null
          break;
        default:
          break;
      }
      dispatch({
        type: CHANGE_TYPE,
        runningIndex: runningIndex,
        payload: payload
      })

      dispatch({
        type: SET_SELECTED,
        payload: id
      })
    }
  })

  const renderPreview = () => {
    if (isOver && canDrop) {
      // Get type and show preview
      switch (cardType) {
        case TextType:
          return textTypePreviewJSX
        case TwoDroppableColumns:
          return twoColTypePreviewJSX
        case ThreeDroppableColumns:
          return threeColTypePreviewJSX
        case ImageType:
          return imageTypePreviewJSX
        default:
          return null
      }
    }

    return null
  }

  return (
    <div
      className={`droppable ${(isOver && canDrop) ? "is-over" : ""} ${between ? "between" : ""} ${state.isDragging ? "show" : ""}`}
      ref={dropRef}
    >
      {renderPreview()}
    </div>
  )
}

export default DroppableSection;


const textTypePreviewJSX = (
  <p className={"text-type-preview"}>
    Lorem ipsum dolor sit amet, consectetur adipisicing
    elit. Ab autem, beatae dolor doloribus error
    fuga fugit incidunt libero maiores officia quis.
  </p>
)

const twoColTypePreviewJSX = (
  <div className={"two-col-preview"}>
    <div className={"box"}/>
    <div className={"box"}/>
  </div>
)

const threeColTypePreviewJSX = (
  <div className={"three-col-preview"}>
    <div className={"box"}/>
    <div className={"box"}/>
    <div className={"box"}/>
  </div>
)

const imageTypePreviewJSX = (
  <div className={"image-type-preview"}>
    <img src={ImageTypeBackground} alt="Image"/>
  </div>
)