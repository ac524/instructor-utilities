import  { useEffect, useState } from "react";

import { EditorState, ContentState, convertFromRaw, convertToRaw } from "draft-js";
import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';

import "./styles.sass";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";

// @see https://www.draft-js-plugins.com/plugin/static-toolbar
const toolbarPlugin = createToolbarPlugin();

const { Toolbar } = toolbarPlugin;

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

const applyRawValue = (onChange, editorState) => {
  // The provided `onChange` expects a regular `event` object where we can
  // get the value from `event.target.value`. So, here we are recreating that
  // object structure so we can provide the `value` in the way it's expected
  // to the partent component
  onChange({
    target:{
      value: convertToRaw(editorState.getCurrentContent())
    }
  });
}

export const RichTextEditor = ({
  // Extract props we need to work with
  value,
  onChange,
  // Collect other default props provided that should be applied to the input
  ...props
}) => {

  const [editorState, setEditorState] = useEditorState(value);

  // Watch the editor 
  useEffect(() => {

    // Send the interal editor value back to the parent form throu the provided `onChange` from the props
    applyRawValue(onChange, editorState);

  },[editorState])

  return (
    <div>
      <Toolbar />
      <Editor
        {...props}
        editorState={editorState}
        onChange={setEditorState}
        plugins={[toolbarPlugin]}
      />
    </div>
  );
};
