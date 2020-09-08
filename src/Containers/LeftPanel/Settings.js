import React, {useContext} from "react";
import {DropDataContext} from "../../DropContext";
import {CodeType, ImageType, TextType} from "../../CardTypes";
import beautify from "js-beautify";

const getHTMLBoilerPlate = (content) => {
  const str = `
<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title>Page Builder</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<style>
  .col-2, .col-3 {
    display: flex;
  }
  
  body, pre {
    margin: 0;
  }
  
  .col-2.column, .col-3.column {
    flex-direction: column;
  }
  
  @media only screen and (max-width: 900px) {
    .col-2.column-mobile, .col-3.column-mobile {
      flex-direction: column !important;
    }
  }
  
  .section {
    width: 100%;
  }
  
  .img-section {
    width: 100%;
    display: flex;
  }
  
  .img-section.left {
    justify-content: flex-start;
  }
  
  .img-section.right {
    justify-content: flex-end;
  }
  
  .img-section.center {
    justify-content: center;
  }
</style>
<body>
  ${content}
</body>
</html>`

  return beautify.html(str, { indent_size: 2, space_in_empty_paren: true })
}

const Settings = () => {
  const [state] = useContext(DropDataContext)

  const generateHTML = () => {
    let htmlstr = `<div class='app-wrapper'>${state.data.map(el => generateSectionHTML(el)).join("")}</div>`
    const htmlFile = getHTMLBoilerPlate(htmlstr)
    const dataStr = "data:text/html;charset=utf-8," + encodeURIComponent(htmlFile)
    const dlAnchorElem = document.createElement("a")
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "page.html");
    dlAnchorElem.click();
    dlAnchorElem.remove()
  }

  const generateSectionHTML = (el) => {
    if (el.children) {
      return `<div class="${el.renderClassName} ${el.direction} ${el.mobileDirection}-mobile">${el.children.map(child => generateSectionHTML(child)).join("")}</div>`
    }

    return generateSectionDetails(el)
  }

  const generateSectionDetails = (el) => {
    const stylingStr = getStylingString(el.style)

    switch (el.type) {
      case TextType:
        return `<div class="section" style="${stylingStr}">${el.data}</div>`
      case ImageType:
        if (!el.data) {
          return ""
        }
        const imgStylingStr = getStylingString(el.imgStyle)
        return (
          `
<div class="section" style="${stylingStr}">
  <div class="img-section ${el.imgPosition}"><img src="${el.data}" style="${imgStylingStr}" alt="${el.imgAlt}" src="${el.data}" />  </div>
</div>`
        )
      case CodeType:
        const domNode = document.getElementById(el.id)
        return `<div class="section" style="${stylingStr}">${domNode.innerHTML}</div>`
      default:
        return ""
    }
  }

  const getStylingString = (stylingObj) => {
    let stylingStr = "";
    for (let key in stylingObj) {
      if (!stylingObj.hasOwnProperty(key)) {
        continue
      }
      switch (key) {
        case "paddingTop":
          stylingStr += `padding-top: ${stylingObj[key]};`
          break;
        case "paddingRight":
          stylingStr += `padding-right: ${stylingObj[key]};`
          break;
        case "paddingLeft":
          stylingStr += `padding-left: ${stylingObj[key]};`
          break;
        case "paddingBottom":
          stylingStr += `padding-bottom: ${stylingObj[key]};`
          break;
        case "marginTop":
          stylingStr += `margin-top: ${stylingObj[key]};`
          break;
        case "marginRight":
          stylingStr += `margin-right: ${stylingObj[key]};`
          break;
        case "marginLeft":
          stylingStr += `margin-left: ${stylingObj[key]};`
          break;
        case "marginBottom":
          stylingStr += `margin-bottom: ${stylingObj[key]};`
          break;
        case "borderTopWidth":
          stylingStr += `border-top-width: ${stylingObj[key]};`
          break;
        case "borderRightWidth":
          stylingStr += `border-right-width: ${stylingObj[key]};`
          break;
        case "borderLeftWidth":
          stylingStr += `border-left-width: ${stylingObj[key]};`
          break;
        case "borderBottomWidth":
          stylingStr += `margin-bottom-width: ${stylingObj[key]};`
          break;
        case "borderTopRightRadius":
          stylingStr += `border-top-right-radius: ${stylingObj[key]};`
          break;
        case "borderBottomRightRadius":
          stylingStr += `border-bottom-right-radius: ${stylingObj[key]};`
          break;
        case "borderTopLeftRadius":
          stylingStr += `border-top-left-radius: ${stylingObj[key]};`
          break;
        case "borderBottomLeftRadius":
          stylingStr += `border-bottom-left-radius: ${stylingObj[key]};`
          break;
        case "borderWidth":
          stylingStr += `border-width: ${stylingObj[key]};`
          break;
        case "borderStyle":
          stylingStr += `border-style: ${stylingObj[key]};`
          break;
        case "borderRadius":
          stylingStr += `border-radius: ${stylingObj[key]};`
          break;
        case "borderColor":
          stylingStr += `border-color: ${stylingObj[key]};`
          break;
        default:
          stylingStr += `${key}: ${stylingObj[key]};`
          break;
      }
    }
    return stylingStr
  }

  return (
    <div>
      <h2>Settings</h2>
      <button onClick={generateHTML}>Generate HTML</button>
    </div>
  )
}

export default Settings