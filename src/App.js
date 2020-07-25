import React, {useContext} from "react";
import "./App.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Card from "./Components/Cards/Card";
import DroppableSection from "./Components/DroppableSection";
import CustomDragLayer from "./Components/CustomDragLayer";
import {DropDataContext} from "./DropContext";
import {TwoDroppableColumns, TextType, DroppableArea, ThreeDroppableColumns} from "./CardTypes";
import SectionWrapper from "./Components/SectionWrapper";

const CardList = [
  {
    type: TextType,
    name: "Text Card"
  },
  {
    type: TwoDroppableColumns,
    name: "Two Columns",
    wrapperClassName: "droppable-col-2",
    children: [
      {
        type: DroppableArea
      },
      {
        type: DroppableArea
      }
    ]
  },
  {
    type: ThreeDroppableColumns,
    name: "Three Columns",
    wrapperClassName: "droppable-col-3",
    children: [
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
  },
];

function App() {
  const [state] = useContext(DropDataContext)

  return (
    <DndProvider backend={HTML5Backend}>
      <div id={"empty"} />
      <CustomDragLayer/>
      <div className="App">
        <div className={"left-panel"}>
          <h1>Components</h1>
          <div className={"components-list"}>
            {CardList.map((el, i) => (
              <Card
                key={el.type}
                name={el.name}
                type={el.type}
              />
            ))}
          </div>
        </div>

        <div className={"right-panel"}>
          <h1>Preview</h1>
          <div className={"preview-section"}>
            {/*{state.length === 0 ? (*/}
            {/*  <DroppableSection/>*/}
            {/*) : (*/}
            {/*  state.map((el, index) => {*/}
            {/*    return(*/}
            {/*      <React.Fragment key={`list-${index}`}>*/}
            {/*        {index === 0 && <DroppableSection index={index} above={true}/>}*/}
            {/*        {el.type}*/}
            {/*        <DroppableSection index={index} above={false}/>*/}
            {/*      </React.Fragment>*/}
            {/*    )*/}
            {/*  })*/}
            {/*)}*/}

            {state.length === 0 ? (
              <DroppableSection/>
            ) : (
              state.map((el, index) => {
                return renderListWithChildren([index], el)
              })
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

const renderListWithChildren = (runningIndex, currentElement) => {
  if (currentElement.children) {
    return(
      <div className={currentElement.wrapperClassName}>
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
        <SectionWrapper>
          <p>Testing 123</p>
        </SectionWrapper>
      )
    case DroppableArea:
      return(
        <SectionWrapper>
            <DroppableSection runningIndex={runningIndex} />
        </SectionWrapper>
      )
    default:
      return null
  }
}

//index={[1,3,5,1]}

export default App;
