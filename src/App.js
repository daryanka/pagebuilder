import React, {useContext} from "react";
import "./App.css";
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
  ImageType
} from "./CardTypes";

// Section Imports
import SectionWrapper from "./Components/Sections/SectionWrapper";
import DetailsPanel from "./Containers/DetailPanel";
import TextSection from "./Components/Sections/TextSection";
import ImageSection from "./Components/Sections/ImageSection";

const CardList = [
  {
    type: TwoDroppableColumns,
    name: "Two Columns",
  },
  {
    type: ThreeDroppableColumns,
    name: "Three Columns",
  },
  {
    type: TextType,
    name: "Text",
  },
  {
    type: ImageType,
    name: "Image",
  },
];

function App() {
  const [state] = useContext(DropDataContext)

  return (
    <DndProvider backend={HTML5Backend}>
      <div id={"empty"}/>
      <CustomDragLayer/>
      <div className="App">
        <div className={"left-panel"}>
          <h1>Components</h1>
          <div className={"components-list"}>
            {CardList.map((el, i) => (
              <Card
                key={el.type}
                {...el}
              />
            ))}
          </div>
        </div>

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

        <div className={"right-panel"}>
          <DetailsPanel/>
        </div>
      </div>
    </DndProvider>
  );
}

const renderListWithChildren = (runningIndex, currentElement) => {
  if (currentElement.children) {
    return (
      <div key={runningIndex.join("")} className={currentElement.wrapperClassName}>
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
    case DroppableArea:
      return(
        <SectionWrapper droppable={true} key={runningIndex.join("")}>
          <DroppableSection between={obj.between} runningIndex={runningIndex} />
        </SectionWrapper>
      )
    default:
      return null
  }
}

export default App;
