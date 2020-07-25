import React from "react";
import { useDragLayer } from "react-dnd";
import {TextType, ThreeDroppableColumns, TwoDroppableColumns} from "../CardTypes";
import TextCardPreview from "./Cards/TextCardPreview";
import TwoColumnCardPreview from "./Cards/TwoColumnCardPreview";
import ThreeColumnCardPreview from "./Cards/ThreeColumnCardPreview";

const getItemStyles = (initialOffset, currentOffset) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none"
    };
  }
  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform
  };
};

const CustomDragLayer = props => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset
  } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }));

  const renderPreview = () => {
    switch (itemType) {
      case TextType:
        return <TextCardPreview />;
      case TwoDroppableColumns:
        return <TwoColumnCardPreview/>
      case ThreeDroppableColumns:
        return <ThreeColumnCardPreview/>
      default:
        return null;
    }
  };

  React.useEffect(() => {
    if (isDragging) {
      document.body.classList.add("dragging-item")
    } else {
      document.body.classList.remove("dragging-item")
    }
  }, [isDragging])

  if (!isDragging) {
    return null;
  }

  return (
    <div
      className={"drag-layer"}
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 100,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        cursor: "grabbing"
      }}
    >
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderPreview()}
      </div>
    </div>
  );
};

export default CustomDragLayer;
