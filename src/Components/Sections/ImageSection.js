import React, {useCallback, useState, useContext, useRef} from "react";
import {DropDataContext, SET_SELECTED, UPDATE_SECTION} from "../../DropContext";
import {useDropzone} from 'react-dropzone'

const ImageSection = (props) => {
  const [state, dispatch] = useContext(DropDataContext)
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

        dispatch({
          type: SET_SELECTED,
          payload: props.id
        })
      }

      reader.readAsDataURL(file)
    })
  }, [])

  const {getRootProps, getInputProps, isDragActive, isDragAccept} = useDropzone({
    multiple: false,
    onDrop: onDrop,
    accept: ["image/jpeg", "image/png", "image/svg+xml"],
  })


  if (props.data) {
    return (
      <div className={`img-section ${props.imgPosition}`} style={props.style ? props.style : {}}>
        <img style={props.imgStyle ? props.imgStyle : {}} src={props.data} alt={props.imgAlt ? props.imgAlt : null} />
      </div>
    )
  }

  return (
    <div>
      <div className={`image-section ${isDragActive} empty ${isDragAccept && "accept"}`} {...getRootProps()}>
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