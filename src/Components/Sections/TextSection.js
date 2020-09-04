import React, {useContext} from "react";
import { Editor } from '@tinymce/tinymce-react';
import {DropDataContext, SET_SELECTED, UPDATE_SECTION} from "../../DropContext";
import DomPurify from "dompurify";


const TextSection = (props) => {
  const [state, dispatch] = useContext(DropDataContext)
  if (props.export) {
    return (
      <div
        style={props.style ? props.style : {}}
        dangerouslySetInnerHTML={{
          __html: props.data
        }}
      />
    )
  }

  const handleTextDataChange = (data) => {
    dispatch({
      type: UPDATE_SECTION,
      id: props.id,
      payload: {
        ...props,
        data: DomPurify.sanitize(data)
      }
    })

    dispatch({
      type: SET_SELECTED,
      payload: props.id
    })
  }

  return (
    <div
      style={props.style ? props.style : {}}
    >
      <Editor
        inline
        initialValue={props.data}
        value={props.data}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime table paste code help wordcount'
          ],
          toolbar:
            'fullscreen | formatselect | bold italic backcolor | link | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }}
        onClick={() => dispatch({
          type: SET_SELECTED,
          payload: props.id
        })}
        onEditorChange={handleTextDataChange}
        setOptions={{
          plugins: []
        }}
      />
    </div>
  )

}

export default TextSection;