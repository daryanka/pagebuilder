import React from "react";
import Card from "../../Components/Cards/Card";
import {ImageType, TextType, ThreeDroppableColumns, TwoDroppableColumns} from "../../CardTypes";
import {AiOutlineApartment, GrNewWindow, RiSettings5Line} from "react-icons/all";

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

const LeftPanel = (props) => {
  return (
    <div className={"left-panel"}>
      <div className="left-side">
        <div className={"item"}>
          <AiOutlineApartment/>
          <p>Sections</p>
        </div>
        <div className={"item"}>
          <GrNewWindow/>
          <p>Add Section</p>
        </div>
        <div className="item">
          <RiSettings5Line/>
          <p>Settings</p>
        </div>
      </div>
      <div className="component-list-wrapper">
        <h2>Components</h2>
        <div className={"components-list"}>
          {CardList.map((el, i) => (
            <Card
              key={el.type}
              {...el}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeftPanel;