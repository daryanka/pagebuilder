import React, {useContext, useState} from "react";
import Card from "../../Components/Cards/Card";
import {CodeType, ImageType, TextType, ThreeDroppableColumns, TwoDroppableColumns} from "../../CardTypes";
import {AiOutlineApartment, GrNewWindow, RiSettings5Line} from "react-icons/all";
import {DropDataContext} from "../../DropContext";
import Tree from "./Tree";

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
  {
    type: CodeType,
    name: "Code Type",
  }
];

const LeftPanel = (props) => {
  // "add" - "tree" - "settings"
  const [sectionOpen, setSectionOpen] = useState("add")

  const renderRight = () => {
    switch (sectionOpen) {
      case "add":
        return (
          <>
            <h2>Components</h2>
            <div className={"components-list"}>
              {CardList.map((el, i) => (
                <Card
                  key={el.type}
                  {...el}
                />
              ))}
            </div>
          </>
        )
      case "tree":
        return (
          <Tree/>
        )
      default:
        return
    }
  }

  return (
    <div className={"left-panel"}>
      <div className="left-side">
        <div onClick={() => setSectionOpen("tree")} className={"item"}>
          <AiOutlineApartment/>
          <p>Sections</p>
        </div>
        <div className="divider" />
        <div onClick={() => setSectionOpen("add")} className={"item"}>
          <GrNewWindow/>
          <p>Add Section</p>
        </div>
        <div className="divider" />
        <div onClick={() => setSectionOpen("settings")} className="item">
          <RiSettings5Line/>
          <p>Settings</p>
        </div>
        <div className="divider" />
      </div>
      <div className="component-list-wrapper">
        {renderRight()}
      </div>
    </div>
  )
}

export default LeftPanel;