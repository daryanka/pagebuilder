import React, {createContext, useReducer, useState} from "react";
import {DroppableArea, TextType, ThreeDroppableColumns} from "./CardTypes";
import _ from "lodash";

export const DropDataContext = createContext();

export const SET_DRAGGING = "SET_DRAGGING";
export const CHANGE_TYPE = "CHANGE_TYPE";
export const SET_SELECTED = "SET_SELECTED";
export const UPDATE_SECTION = "UPDATE_SECTION";
export const DELETE_SECTION = "DELETE_SECTION";


export const getSelectedObj = (data, id) => {
  for (let i = 0; i < data.length; i++) {
    const curr = data[i]
    if (curr.id === id && curr.type !== DroppableArea) {
      return {...curr}
    }
    if (curr.children) {
      const res = getSelectedObj(curr.children, id)
      if (res) {
        return res
      }
    }
  }
  return null
}

const deleteByID = (data, id) => {
  for (let i = 0; i < data.length; i++) {
    const curr = data[i]
    if (curr.id === id) {
      data.splice(i, 1)
    } else if (curr.children) {
      deleteByID(curr.children, id)
    }
  }
}

const updateInBetweens = (data) => {
  for (let i = 0; i < data.length; i++) {
    const curr = data[i]
    // if current element is droppable area then skip
    if (curr.type === DroppableArea) {
      continue
    }

    // check if below is a droppable area
    // if not then add droppable area to below

    if (i === 0) {
      // if first index then always add a hidden above
      data.splice(0, 0, {
        type: DroppableArea,
        between: true
      })

      i++;
    }

    if (i === data.length - 1) {
      // if last index then always add a hidden below
      data.push({
        type: DroppableArea,
        between: true
      })

      continue
    }

    // Check if below needs a hidden
    if (data[i + 1].type !== DroppableArea) {
      data.splice(i + 1, 0, {
        type: DroppableArea,
        between: true
      })

      i++;
    }
  }
}

const getRunningIndex = (data, id, arr) => {
  for (let i = 0; i < data.length; i++) {
    const curr = data[i]
    if (curr.id === id) {
      return [...arr, i]
    }

    if (curr.children) {
      const result = getRunningIndex(data[i].children, id, [...arr, i])
      if (result) {
        return result
      }
    }
  }

  return null
}

const reducer = (state, action) => {
  const {runningIndex, payload, id} = action

  switch (action.type) {
    case DELETE_SECTION:
      const newStateCopy = _.cloneDeep(state.data);

      deleteByID(newStateCopy, id)

      return {
        ...state,
        data: newStateCopy
      };
    case UPDATE_SECTION:
      // Get running index by id

      // Set that index to updated payload

      const runningIndexArray = getRunningIndex(state.data, id, [])

      const stateCopy = _.cloneDeep(state.data);
      let objStr = ""

      _.forEach(runningIndexArray, (el, index) => {
        // First index will be done manually, so can be skipped
        if (index === 0) {
          return
        }
        if (index !== 1) {
          objStr += "."
        }
        objStr += `children[${el}]`
      })


      if (objStr !== "") {
        _.set(stateCopy[runningIndexArray[0]], objStr, {...payload})
      } else {
        stateCopy[runningIndexArray[0]] = {...payload}
      }

      return {
        ...state,
        data: stateCopy
      };
    case SET_SELECTED:
      return {
        ...state,
        selected: {
          id: action.payload,
          update: state.selected.update ? state.selected.update + 1 : 1
        }
      }
    case SET_DRAGGING:
      return {
        ...state,
        isDragging: action.payload
      }
    case CHANGE_TYPE:
      const DeepStateCopy = _.cloneDeep(state.data);
      let str = ""
      _.forEach(runningIndex, (el, index) => {
        // First index will be done manually, so can be skipped
        if (index === 0) {
          return
        }
        if (index !== 1) {
          str += "."
        }
        str += `children[${el}]`
      })


      if (str !== "") {
        _.set(DeepStateCopy[runningIndex[0]], str, {...payload})
      } else {
        DeepStateCopy[runningIndex[0]] = {...payload}
      }

      updateInBetweens(DeepStateCopy)

      return {...state, data: DeepStateCopy}
    default:
      return state
  }
}

export const DropDataProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    data: [
      {
        type: DroppableArea
      }
    ],
    isDragging: false,
    selected: {
    }
  })

  return (
    <DropDataContext.Provider value={[state, dispatch]}>
      {props.children}
    </DropDataContext.Provider>
  )
}