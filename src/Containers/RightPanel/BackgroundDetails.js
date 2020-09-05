import React, {useState} from "react";
import TextInput from "../../Components/DetailComponents/TextInput";
import AllPaddings from "../../Images/padding-all.png";
import IndividualPaddings from "../../Images/padding-individual.png";
import {BsChevronRight} from "react-icons/bs"

const BackgroundDetails = ({selected, setSelected}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false)

  const handleBackgroundColor = (val) => {
    const rgba = `rgba(${val.rgb.r},${val.rgb.g},${val.rgb.b},${val.rgb.a})`

    setSelected(prev => ({
      ...prev,
      style: {
        ...prev.style,
        backgroundColor: rgba
      },
      backgroundColor: {
        color: val.rgb
      }
    }))
  }

  const handleToggleBackgroundAccordion = () => {
    setSelected((prev) => {
      return {
        ...prev,
        options: {
          ...prev.options,
          backgroundOpen: !prev.options.backgroundOpen
        }
      }
    })
  }

  return (
    <div className={"group"}>
      <h4 onClick={handleToggleBackgroundAccordion} className={"heading"}>
        Background
        <BsChevronRight className={selected.options.backgroundOpen ? "open" : "closed"}/>
      </h4>
      <div className={`wrap-section ${selected.options.backgroundOpen ? "open" : "closed"}`}>
        <div>

        </div>
      </div>
    </div>
  )
}

export default SizingDetails