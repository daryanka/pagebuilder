import React, {useContext, useState} from "react";
import {DropDataContext, getSelectedObj, UPDATE_SECTION} from "../DropContext";
import _ from "lodash";
import {TextType} from "../CardTypes";

const DetailsPanel = () => {
  const [selected, setSelected] = useState([])
  const [state, dispatch] = useContext(DropDataContext)

  React.useEffect(() => {
    const result = getSelectedObj(state.data, state.selected.id)
    setSelected(result)
  }, [state.selected.id])

  const renderOptions = () => {
    switch (selected.type) {
      case TextType:
        return(
          <div className={"options"}>
            <button onClick={() => dispatch({
              type: UPDATE_SECTION,
              id: selected.id
            })}>Update Test</button>
          </div>
        )
      default:
        return null
    }
  }

  const getName = (type) => {
    switch (type) {
      case TextType:
        return "Text Card";
      default:
        return null
    }
  }

  return(
    <div>
      <h1>
        Details
      </h1>
      {selected && (
        <>
          <h3>{getName(selected.type)}</h3>
          {renderOptions()}
        </>
      )}
    </div>
  )
}

export default DetailsPanel