import  { useEffect, useState } from "react";

import { EditorState, ContentState, convertFromRaw, convertToRaw } from "draft-js";
import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';

import "./styles.sass";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";

const toolbarPlugin = createToolbarPlugin();

// A helper function to assist with converting initial values to ContentState
const createContentState = value => {

  return typeof value === "string"

    // Handle text based values
    ? ContentState.createFromText(value)

    // Otherwise expect the value to be a raw object
    : convertFromRaw( value );

}

// A hook to simplify the code inside the component.
const useEditorState = value => useState(() => EditorState.createWithContent(createContentState(value)));

export const RichTextEditor = ({
  // Extract props we need to work with
  value,
  onChange,
  // Collect other default props provided that should be applied to the input
  ...props
}) => {

  const [editorState, setEditorState] = useEditorState(value);

  // useEffect(() => {

  //   console.log(convertToRaw(editorState.getCurrentContent()));

  // },[editorState])

  return (
    <Editor
      {...props}
      editorState={editorState}
      onChange={setEditorState}
      plugins={[toolbarPlugin]}
    />
  );
};
