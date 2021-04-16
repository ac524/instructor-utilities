import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.sass";

export const RichTextEditor = () => {

  const [richTextState, setRichTextState] = useState(() => ({
    editor: EditorState.createEmpty(),
    html: ""
  }));
  
  // const [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setRichTextState({
      editor: state,
      html: convertToHTML(state.getCurrentContent())
    });
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <div className="App">
      <header className="App-header">Rich Text Editor Example</header>
      <Editor
        editorState={richTextState.editor}
        onEditorStateChange={handleEditorChange}
      />
      <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(richTextState.html)}
      ></div>
    </div>
  );
};