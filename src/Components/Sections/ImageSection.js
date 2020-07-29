import React, {useCallback, useState, useContext, useRef} from "react";
import {DropDataContext, UPDATE_SECTION} from "../../DropContext";
import {useDropzone} from 'react-dropzone'
import ReactFitText from "react-fittext";

const ImageSection = (props) => {
  const [fontSize, setFontSize] = useState(16)
  const divRef = useRef();
  const [state, dispatch] = useContext(DropDataContext)

  const handleResize = useCallback((e) => {
    const calc = 0.05079365079 * divRef.current.clientWidth;
    if (calc <= 16) {
      setFontSize(calc)
    }
  }, [])

  const onDrop = useCallback((files) => {
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading aborted")
      reader.onerror = () => console.log("error reading file")

      reader.onload = (e) => {
        dispatch({
          type: UPDATE_SECTION,
          id: props.id,
          payload: {
            ...props,
            data: reader.result,
            fileName: file.name
          }
        })
      }

      reader.readAsDataURL(file)
    })
  }, [])

  React.useEffect(() => {
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])


  const {getRootProps, getInputProps, isDragActive, isDragAccept} = useDropzone({
    multiple: false,
    onDrop: onDrop,
    accept: ["image/jpeg", "image/png", "image/svg+xml"],
  })

  if (props.data) {
    return (
      <img src={props.data} alt="image" style={props.style ? props.style : {}}/>
    )
  }

  return (
    <div ref={divRef}>
      <div style={{
        fontSize: `${fontSize}px`
      }} className={`image-section ${isDragActive} empty ${isDragAccept && "accept"}`} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          isDragAccept ? (
            <p>Drop the image here...</p>
          ) : (
            <p>Invalid file type</p>
          )
        ) : (
          <p>
            <span>Drop image here, or click to select image</span>
            <span>(png, jpeg, svg)</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default ImageSection