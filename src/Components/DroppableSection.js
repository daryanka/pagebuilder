import React, {useContext} from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {CHANGE_TYPE, DropDataContext, SET_SELECTED} from "../DropContext";
import {useDrop} from "react-dnd";
import {TextType, TwoDroppableColumns, ThreeDroppableColumns, DroppableArea, ImageType, CodeType} from "../CardTypes";
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
      ImageType,
      CodeType
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
          padding: "0px",

          // Default Margin
          margin: "0px",

          // Default border
          borderWidth: "0px",
          borderColor: "#000000",
          borderStyle: "solid",

          // Default border radius
          borderRadius: "0px",
        },

        // Border color, for color picker
        border: {
          color: "#000000"
        },

        paddingOptions: {
          single: true,
          padding: "0px",
          paddingRight: "0px",
          paddingLeft: "0px",
          paddingTop: "0px",
          paddingBottom: "0px",
        },

        marginOptions: {
          single: true,
          margin: "0px",
          marginRight: "0px",
          marginLeft: "0px",
          marginTop: "0px",
          marginBottom: "0px",
        },

        borderWidthOptions: {
          single: true,
          borderWidth: "0px",
          borderRightWidth: "0px",
          borderLeftWidth: "0px",
          borderTopWidth: "0px",
          borderBottomWidth: "0px",
        },

        borderRadiusOptions: {
          single: true,
          borderRadius: "0px",
          borderTopRightRadius: "0px",
          borderBottomRightRadius: "0px",
          borderTopLeftRadius: "0px",
          borderBottomLeftRadius: "0px",
        },

        options: {
          sizingOpen: false,
          borderOpen: false
        },

        backgroundColor: {
          color: "#ffffff",
          transparent: true
        },

        // Left panel tree, open state, closed by initially
        openInTree: false
      }

      switch (item.type) {
        case TextType:
          payload.data = "Add some text..."
          break;
        case TwoDroppableColumns:
          payload.children = [
            {
              type: DroppableArea,
              id: v4()
            },
            {
              type: DroppableArea,
              id: v4()
            }
          ]
          delete payload.style
          delete payload.border
          delete payload.paddingOptions
          delete payload.marginOptions
          delete payload.borderWidthOptions
          delete payload.borderRadiusOptions
          delete payload.options
          payload.wrapperClassName = "droppable-col-2"
          payload.renderClassName = "col-2"
          payload.direction = "row"
          payload.mobileDirection = "column"
          break;
        case ThreeDroppableColumns:
          payload.children = [
            {
              type: DroppableArea,
              id: v4()
            },
            {
              type: DroppableArea,
              id: v4()
            },
            {
              type: DroppableArea,
              id: v4()
            }
          ]
          delete payload.style
          delete payload.border
          delete payload.paddingOptions
          delete payload.marginOptions
          delete payload.borderWidthOptions
          delete payload.borderRadiusOptions
          delete payload.options
          payload.wrapperClassName = "droppable-col-3"
          payload.renderClassName = "col-3"
          payload.mobileDirection = "column"
          payload.direction = "row"
          break;
        case ImageType:
          payload.imgAlt = ""
          payload.imgStyle = {
            height: "100px",
            width: "auto"
          }
          payload.imgPosition = "left"
          payload.data = null
          break;
        case CodeType:
          payload.language = "jsx"
          payload.data = `function PrintName(name) {
  console.log(name)
}`
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
        case CodeType:
          return codeTypePreviewJSX
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
    <img src={ImageTypeBackground} />
  </div>
)

const codePreviewContent = `function PrintName(name) {
  console.log(name)
}`

const codeTypePreviewJSX = (
  <div className={"code-type-preview-jsx"}>
    <SyntaxHighlighter language={"javascript"} style={dracula}>
      {codePreviewContent}
    </SyntaxHighlighter>
  </div>
)