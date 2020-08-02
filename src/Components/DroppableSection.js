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
        ...item,
        id: id,

        style: {
          // Default padding
          "padding": "0px",

          // Default Margin
          "margin": "0px",

          // Default border
          "borderWidth": "0px",
          "borderColor": "#000000",
          "borderStyle": "solid",

          // Default border radius
          "borderRadius": "0px",
        },

        // Hold border color for component

        border: {
          color: "#000000"
        }
      }

      switch (item.type) {
        case TextType:
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
            ...payload.style,
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
    Lorem ipsum dolor sit amet.
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