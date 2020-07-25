import React, {createContext, useReducer, useState} from "react";
import {DroppableArea, TextType, ThreeDroppableColumns} from "./CardTypes";
import _ from "lodash";

export const DropDataContext = createContext();

export const SET_STATE = "SET_STATE";
export const CHANGE_TYPE = "CHANGE_TYPE"

const reducer = (state, action) => {
  const {runningIndex, payload} = action


  switch (action.type) {
    case SET_STATE:
      return action.payload
    case CHANGE_TYPE:
      const DeepStateCopy = _.cloneDeep(state.data);

      let str = ""
      _.forEach(runningIndex, (el,index) => {
        // First index will be done manually, so can be skipped
        if (index === 0) {return}
        if (index !== 1) {
          str += "."
        }
        str += `children[${el}]`
      })


      if (str !== ""){
        _.set(DeepStateCopy[runningIndex[0]], str, {...payload})
      } else {
        DeepStateCopy[runningIndex[0]] = {...payload}
      }

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
      },
      {
        type: TextType
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
        ]
      },
    ]
  })

  const [isDragging, setIsDragging] = useState(false)

  return(
    <DropDataContext.Provider value={[state, dispatch, isDragging, setIsDragging]}>
      {props.children}
    </DropDataContext.Provider>
  )
}