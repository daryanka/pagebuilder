import React from "react";
import Card from "../../Components/Cards/Card";
import {ImageType, TextType, ThreeDroppableColumns, TwoDroppableColumns} from "../../CardTypes";

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
  )
}

export default LeftPanel;