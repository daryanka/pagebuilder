import React, {useState} from "react";
import TextInput from "../../Components/DetailComponents/TextInput";
import AllPaddings from "../../Images/padding-all.png";
import IndividualPaddings from "../../Images/padding-individual.png";
import {BsChevronRight} from "react-icons/bs"
import {SketchPicker} from "react-color";

const SizingDetails = ({selected, setSelected}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false)

  const handleChangeStyle = (e) => {
    e.persist()
    let val = e.target.value

    if (e.target.name.includes("padding")) {
      val = `${val}px`
      return setSelected(prev => ({
        ...prev,
        style: {
          ...prev.style,
          [e.target.name]: val
        },
        paddingOptions: {
          ...prev.paddingOptions,
          [e.target.name]: val
        }
      }))
    }

    if (e.target.name.includes("margin")) {
      val = `${val}px`
      return setSelected(prev => ({
        ...prev,
        style: {
          ...prev.style,
          [e.target.name]: val
        },
        marginOptions: {
          ...prev.marginOptions,
          [e.target.name]: val
        }
      }))
    }

    setSelected(prev => ({
      ...prev,
      style: {
        ...prev.style,
        [e.target.name]: e.target.value
      }
    }))
  }

  const handleSwitchPadding = (multiple) => {
    setSelected(prev => {
      const returnObj = {
        ...prev,
        style: {
          ...prev.style
        },
        paddingOptions: {
          ...prev.paddingOptions,
          single: !multiple
        },
      }

      if (multiple) {
        // Delete single and add multiple from paddingOptions
        delete returnObj.style.padding
        returnObj.style.paddingTop = returnObj.paddingOptions.paddingTop
        returnObj.style.paddingBottom = returnObj.paddingOptions.paddingBottom
        returnObj.style.paddingRight = returnObj.paddingOptions.paddingRight
        returnObj.style.paddingLeft = returnObj.paddingOptions.paddingLeft
      } else {
        // Delete all multiple and add single from paddingOptions
        returnObj.style.padding = returnObj.paddingOptions.padding
        delete returnObj.style.paddingTop
        delete returnObj.style.paddingBottom
        delete returnObj.style.paddingRight
        delete returnObj.style.paddingLeft
      }
      return returnObj
    })
  }

  const handleSwitchMargin = (multiple) => {
    setSelected(prev => {
      const returnObj = {
        ...prev,
        style: {
          ...prev.style
        },
        marginOptions: {
          ...prev.marginOptions,
          single: !multiple
        }
      }

      if (multiple) {
        // Delete single and add multiple from paddingOptions
        delete returnObj.style.margin
        returnObj.style.marginTop = returnObj.marginOptions.marginTop
        returnObj.style.marginBottom = returnObj.marginOptions.marginBottom
        returnObj.style.marginRight = returnObj.marginOptions.marginRight
        returnObj.style.marginLeft = returnObj.marginOptions.marginLeft
      } else {
        // Delete all multiple and add single from marginOptions
        returnObj.style.margin = returnObj.marginOptions.margin
        delete returnObj.style.marginTop
        delete returnObj.style.marginBottom
        delete returnObj.style.marginRight
        delete returnObj.style.marginLeft
      }
      return returnObj
    })
  }

  const handleToggleSizingAccordion = () => {
    setSelected((prev) => {
      return {
        ...prev,
        options: {
          ...prev.options,
          sizingOpen: !prev.options.sizingOpen
        }
      }
    })
  }

  const handleBackgroundChange = (val) => {
    const rgba = `rgba(${val.rgb.r},${val.rgb.g},${val.rgb.b},${val.rgb.a})`

    console.log("selected", selected)
    if (selected.backgroundColor.transparent) {
      return setSelected(prev => ({
        ...prev,
        style: {
          ...prev.style,
          backgroundColor: "transparent"
        },
        backgroundColor: {
          ...prev.backgroundColor,
          color: val.rgb
        }
      }))
    }

    setSelected(prev => ({
      ...prev,
      style: {
        ...prev.style,
        backgroundColor: rgba
      },
      backgroundColor: {
        ...prev.backgroundColor,
        color: val.rgb
      }
    }))
  }

  const handleBackgroundTransparentChange = (e) => {
    e.persist()
    setSelected(prev => ({
      ...prev,
      style: {
        ...prev.style,
        backgroundColor: e.target.checked ? "transparent" : `rgba(${prev.backgroundColor.color.r},${prev.backgroundColor.color.g},${prev.backgroundColor.color.b},${prev.backgroundColor.color.a})`
      },
      backgroundColor: {
        ...prev.backgroundColor,
        transparent: e.target.checked
      }
    }))
  }

  return (
    <div className={"group"}>
      <h4 onClick={handleToggleSizingAccordion} className={"heading"}>
        Sizing + Background
        <BsChevronRight className={selected.options.sizingOpen ? "open" : "closed"}/>
      </h4>
      <div className={`wrap-section ${selected.options.sizingOpen ? "open" : "closed"}`}>
        <div>
          <div className={"styling-4"}>
            <div className={"border-col"}>
              <p>
                Background Color:
              </p>
              {displayColorPicker && <div className={`cover`} onClick={() => setDisplayColorPicker(false)}/>}
              {displayColorPicker &&
              <div className={"picker-pos"}><SketchPicker color={selected.backgroundColor.color} onChange={handleBackgroundChange}/>
              </div>}
              <div className={"bg-color"}>
                <div className={"border"} style={{
                  backgroundColor: selected.backgroundColor.transparent ? "#ffffff" : selected.style.backgroundColor
                }} onClick={() => setDisplayColorPicker(true)}>
                </div>
                <div className={"radio-wrapper"}>
                  <label htmlFor={"transparent"}>Transparent</label>
                  <input checked={selected.backgroundColor.transparent} type={"checkbox"} name={"transparent"} onChange={handleBackgroundTransparentChange} />
                </div>
              </div>
            </div>
            <div className="box">
              <p className="p">
                Width
              </p>
              <div className={"input-wrap"}>
                <TextInput
                  type="text"
                  name={"width"}
                  value={selected.style.width}
                  placeholder={"100px"}
                  onChange={handleChangeStyle}
                />
              </div>
            </div>
            <div className="box">
              <p className="p">
                Height
              </p>
              <div className={"input-wrap"}>
                <TextInput
                  type="text"
                  name={"height"}
                  value={selected.style.height ? selected.style.height : ""}
                  placeholder={"100px"}
                  onChange={handleChangeStyle}
                />
              </div>
            </div>

            <div className={"box"}>
              <p className={"p"}>Padding:</p>
              <div className={"four-div"}>
                <div className={"all-style"}>
                  <TextInput
                    name={"padding"}
                    value={parseInt(selected.style.padding) ? parseInt(selected.style.padding) : parseInt(selected.paddingOptions.padding)}
                    disabled={!selected.paddingOptions.single}
                    onChange={handleChangeStyle}
                    type={"number"}
                  />
                  <p className={"px"}>px</p>
                </div>
                <div className={"settings"}>
                  <img onClick={() => handleSwitchPadding(false)} src={AllPaddings} alt="all-paddings"/>
                  <img onClick={() => handleSwitchPadding(true)} src={IndividualPaddings}
                       alt="individual-paddings"/>
                </div>
              </div>
            </div>
            {!selected.paddingOptions.single && (
              <div className={"multiple"}>
                {["Top", "Right", "Bottom", "Left"].map(el => {
                  return (
                    <div key={`padding-${el}`} className={"all-style"}>
                      <p className="label">{el}</p>
                      <div className={"with-px"}>
                        <TextInput
                          name={`padding${el}`}
                          type={"number"}
                          value={parseInt(selected.style[`padding${el}`]) ? parseInt(selected.style[`padding${el}`]) : 0}
                          onChange={handleChangeStyle}
                        />
                        <p className={"px"}>px</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          <div className={"styling-4"}>
            <div className={"box"}>
              <p className={"p"}>Margin:</p>
              <div className={"four-div"}>
                <div className={"all-style"}>
                  <TextInput
                    name={"margin"}
                    value={parseInt(selected.style.margin) ? parseInt(selected.style.margin) : parseInt(selected.marginOptions.margin)}
                    disabled={!selected.marginOptions.single}
                    onChange={handleChangeStyle}
                    type={"number"}
                  />
                  <p className={"px"}>px</p>
                </div>
                <div className={"settings"}>
                  <img onClick={() => handleSwitchMargin(false)} src={AllPaddings} alt="all-paddings"/>
                  <img onClick={() => handleSwitchMargin(true)} src={IndividualPaddings}
                       alt="individual-paddings"/>
                </div>
              </div>
            </div>
            {!selected.marginOptions.single && (
              <div className={"multiple"}>
                {["Top", "Right", "Bottom", "Left"].map(el => {
                  return (
                    <div key={`margin-${el}`} className={"all-style"}>
                      <p className="label">{el}</p>
                      <div className={"with-px"}>
                        <TextInput
                          name={`margin${el}`}
                          type={"number"}
                          value={parseInt(selected.style[`margin${el}`]) ? parseInt(selected.style[`margin${el}`]) : 0}
                          onChange={handleChangeStyle}
                        />
                        <p className={"px"}>px</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SizingDetails