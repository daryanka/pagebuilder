import React, {useContext, useRef, useCallback} from "react";
import "./Styles/App.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Card from "./Components/Cards/Card";
import DroppableSection from "./Components/DroppableSection";
import CustomDragLayer from "./Components/CustomDragLayer";
import {DropDataContext} from "./DropContext";
import {
  TwoDroppableColumns,
  TextType,
  DroppableArea,
  ThreeDroppableColumns,
  ImageType, CodeType
} from "./CardTypes";

// Section Imports
import SectionWrapper from "./Components/Sections/SectionWrapper";
import DetailsPanel from "./Containers/RightPanel/DetailPanel";
import TextSection from "./Components/Sections/TextSection";
import ImageSection from "./Components/Sections/ImageSection";
import LeftPanel from "./Containers/LeftPanel/LeftPanel";
import CodeSection from "./Components/Sections/CodeSection";



function App() {
  const detailsHandleRef = useRef();
  const detailsRef = useRef();

  const [state] = useContext(DropDataContext)

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer/>
      <div className="App">
        <LeftPanel/>

        <div className={"center-panel"}>
          <h1 className={"title"}>Preview</h1>
          <div className={"preview-section"}>
            {state.data.length === 0 ? (
              <DroppableSection/>
            ) : (
              state.data.map((el, index) => {
                return renderListWithChildren([index], el)
              })
            )}
          </div>
        </div>

        <div ref={detailsRef} className={"right-panel"}>
          <div ref={detailsHandleRef} className={"resize-handle resizing"}/>
          <DetailsPanel/>
        </div>
      </div>
    </DndProvider>
  );
}

const renderListWithChildren = (runningIndex, currentElement) => {
  if (currentElement.children) {
    return (
      <div key={runningIndex.join("")} className={`${currentElement.wrapperClassName} ${currentElement.direction} ${currentElement.mobileDirection}-mobile`}>
        {currentElement.children.map((el, index) => {
          return renderListWithChildren([...runningIndex, index], el)
        })}
      </div>
    )
  }

  return renderItemFromObj(currentElement, [...runningIndex])
}

const renderItemFromObj = (obj, runningIndex) => {
  switch (obj.type) {
    case TextType:
      return(
        <SectionWrapper id={obj.id} key={obj.id}>
          <TextSection {...obj} />
        </SectionWrapper>
      )
    case ImageType:
      return(
        <SectionWrapper id={obj.id} key={obj.id}>
          <ImageSection {...obj}/>
        </SectionWrapper>
      )
    case CodeType:
      return(
        <SectionWrapper id={obj.id} key={obj.id}>
          <CodeSection {...obj}/>
        </SectionWrapper>
      )
    case DroppableArea:
      return(
        <SectionWrapper droppable={true} key={obj.id}>
          <DroppableSection between={obj.between} runningIndex={runningIndex} />
        </SectionWrapper>
      )
    default:
      return null
  }
}

export default App;
