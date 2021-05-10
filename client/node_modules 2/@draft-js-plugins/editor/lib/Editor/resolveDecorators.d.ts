import { EditorState } from 'draft-js';
import { PluginEditorProps } from '.';
import MultiDecorator from './MultiDecorator';
export default function resolveDecorators(props: PluginEditorProps, getEditorState: () => EditorState, onChange: (editorState: EditorState) => void): MultiDecorator;
