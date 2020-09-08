import React from "react";

const DroppableDetails = ({selected, setSelected, three}) => {
  const handleUpdateDirection = (direction, type = "direction") => {
    setSelected(prev => ({
      ...prev,
      [type]: direction
    }))
  }

  return (
    <>
      <div className={"group"}>
        <h4 className={"heading"}>
          Type
        </h4>
        <div className={"section-directions"}>
          <div className={"row-wrap"}>
            <div onClick={() => handleUpdateDirection("row")}
                 className={`circle ${selected.direction === "row" ? "selected" : ""}`}/>
            <div onClick={() => handleUpdateDirection("row")} className={"preview"}>
              <div className={"sec"}/>
              <div className={"sec"}/>
              {three && <div className={"sec"}/>}
            </div>
          </div>
          <div className={"col-wrap"}>
            <div onClick={() => handleUpdateDirection("column")}
                 className={`circle ${selected.direction === "column" ? "selected" : ""}`}/>
            <div onClick={() => handleUpdateDirection("column")} className={"preview"}>
              <div className={"sec"}/>
              <div className={"sec"}/>
              {three && <div className={"sec"}/>}
            </div>
          </div>
        </div>
      </div>
      <div className={"group"}>
        <h4 className={"heading"}>
          Small Screen Type
        </h4>
        <p>The section type if the screen size is smaller than 900px.</p>
        <div>
          <div className={"section-directions"}>
            <div className={"row-wrap"}>
              <div onClick={() => handleUpdateDirection("row", "mobileDirection")}
                   className={`circle ${selected.mobileDirection === "row" ? "selected" : ""}`}/>
              <div onClick={() => handleUpdateDirection("row", "mobileDirection")} className={"preview"}>
                <div className={"sec"}/>
                <div className={"sec"}/>
                {three && <div className={"sec"}/>}
              </div>
            </div>
            <div className={"col-wrap"}>
              <div onClick={() => handleUpdateDirection("column", "mobileDirection")}
                   className={`circle ${selected.mobileDirection === "column" ? "selected" : ""}`}/>
              <div onClick={() => handleUpdateDirection("column", "mobileDirection")} className={"preview"}>
                <div className={"sec"}/>
                <div className={"sec"}/>
                {three && <div className={"sec"}/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DroppableDetails