import React from "react";
import img from "../../Images/placeholder-img.jpg";

const ImageCardPreview = (props) => {
  return (
    <div
      className={"card-preview image-preview"}
    >
      <img src={img} />
    </div>
  )
}

export default ImageCardPreview;