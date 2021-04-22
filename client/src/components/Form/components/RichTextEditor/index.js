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
    html: "",
  }));

  // Attempt 1
  //So the first thing I did was comment out the parts converting the state to HTML. I then tried these lines of code. I thought I could use the richTextState as my parameter. I got an odd error that prompted me to try something else. The error said: "The type cast expression is expected to be wrapped with parenthesis (18:28)"

  // convertToRaw(richTextState: RichTextState): RawTextContentState;

  // convertFromRaw(rawState: RawTextContentState): ContentState;

  //==========================================

  // Attempt 2
  //I knew I was doing the previous attempt wrong but I wanted to see if I could learn something from the errors. I decided to go with this syntax. However, I got the error "convertToRaw is not defined". Do I need to get both of these function calls working together? I

  // const textToRaw = convertToRaw(richTextState);

  // const textFromRaw = convertFromRaw(richTextState);

  // Can't get this working, just get told "Unexpected reserved word 'static' (34:2)"
  // static createFromText(
  //   text: string,
  //   delimiter?: string
  //   ): richTextState

  //============================================

  // const [convertedContent, setConvertedContent] = useState(null);

  // const handleEditorChange = (state) => {
  //   setRichTextState({
  //     editor: state,
  //     html: convertToHTML(state.getCurrentContent())
  //   });
  // };

  // const createMarkup = (html) => {
  //   return {
  //     __html: DOMPurify.sanitize(html),
  //   };
  // };

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
