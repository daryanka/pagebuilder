import React from "react";
import {Editor} from '@tinymce/tinymce-react';
import DomPurify from "dompurify";

const TextDetails = ({selected, setSelected}) => {
  const handleTextDataChange = (data) => {
    setSelected(prev => ({
      ...prev,
      data: DomPurify.sanitize(data)
    }))
  }

  return(
    <>
      <div className="group">
        <h4 className="heading">
          Text
        </h4>
        <div>
          <Editor
            initialValue={selected.data}
            value={selected.data}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime table paste code help wordcount'
              ],
              toolbar:
                'fullscreen | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={handleTextDataChange}
            setOptions={{
              plugins: []
            }}
          />
        </div>
      </div>
    </>
  )
}

export default TextDetails