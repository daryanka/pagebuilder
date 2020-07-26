import React, {useContext} from "react";
import {DropDataContext, SET_SELECTED} from "../../DropContext";

const SectionWrapper = (props) => {
  const [state, dispatch] = useContext(DropDataContext)

  return(
    <div onClick={() => dispatch({
      type: SET_SELECTED,
      payload: props.id
    })} className={`section`}>
      {props.children}
    </div>
  )
}

export default SectionWrapper