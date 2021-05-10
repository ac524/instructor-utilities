import { DraftEditorCommand, DraftHandleValue, EditorState } from 'draft-js';
export declare function handleKeyCommand(command: DraftEditorCommand | string, editorState: EditorState, eventTimeStamp: unknown, { setEditorState }: {
    setEditorState(state: EditorState): void;
}): DraftHandleValue;
