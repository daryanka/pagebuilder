import React, {useContext, useState} from "react";
import Card from "../../Components/Cards/Card";
import {CodeType, ImageType, TextType, ThreeDroppableColumns, TwoDroppableColumns} from "../../CardTypes";
import {AiOutlineApartment, GrNewWindow, RiSettings5Line, GrTemplate} from "react-icons/all";
import {DropDataContext, USE_TEMPLATE} from "../../DropContext";
import Tree from "./Tree";
import t1 from "../../Templates/t1.json"
import Settings from "./Settings";

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

const templatesList = ["Blog Post", "Landing Page"];

const LeftPanel = () => {
  const [state, dispatch] = useContext(DropDataContext)
  const [sectionOpen, setSectionOpen] = useState("add")

  const handleSetTemplate = (template) => {
    let templateData
    switch (template) {
      case "Blog Post":
        templateData = t1.template
        break;
      case "Landing Page":
        templateData = t1.template
        break;
      default:
        return
    }
    dispatch({
      type: USE_TEMPLATE,
      payload: templateData
    })
  }

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
      case "templates":
        return(
          <div>
            <h2>Templates</h2>
            <div className={"templates-list"}>
              {templatesList.map(el => (
                <p key={`${el}-template`} onClick={() => handleSetTemplate(el)}>{el}</p>
              ))}
            </div>
          </div>
        )
      case "settings":
        return <Settings />
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
        <div onClick={() => setSectionOpen("templates")} className="item">
          <GrTemplate/>
          <p>Templates</p>
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