import React, {useContext, useState} from "react";
import {DropDataContext, getSelectedObj, UPDATE_SECTION} from "../DropContext";
import _ from "lodash";
import {TextType} from "../CardTypes";
import TextInput from "../Components/DetailComponents/TextInput";
import TextArea from "../Components/DetailComponents/TextArea";

const DetailsPanel = () => {
  const [selected, setSelected] = useState()
  const [state, dispatch] = useContext(DropDataContext)

  React.useEffect(() => {
    const result = getSelectedObj(state.data, state.selected.id)
    setSelected({...result})
  }, [state.selected.id])

  const handleChangeStyle = (e) => {
    e.persist()
    setSelected(prev => ({
      ...prev,
      style: {
        ...prev.style,
        [e.target.name]: e.target.value
      }
    }))
  }

  const handleDataChange = (e) => {
    e.persist()
    setSelected(prev => ({
      ...prev,
      data: e.target.value
    }))
  }

  React.useEffect(() => {
    if (selected && selected.id) {
      dispatch({
        type: UPDATE_SECTION,
        id: selected.id,
        payload: selected
      })
    }
  }, [selected])


  const renderOptions = () => {
    switch (selected.type) {
      case TextType:
        return(
          <div className={"options"}>
            <TextArea
              name={"data"}
              onChange={handleDataChange}
              value={selected.data}
            />
          </div>
        )
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


const getName = (type) => {
  switch (type) {
    case TextType:
      return "Text Card";
    default:
      return null
  }
}