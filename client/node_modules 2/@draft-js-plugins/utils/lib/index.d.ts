import { EditorState, EntityInstance } from 'draft-js';
export type { Store } from './createStore';
export { createStore } from './createStore';
export interface DecodedOffset {
    blockKey: string;
    decoratorKey: number;
    leafKey: number;
}
declare const _default: {
    decodeOffsetKey(offsetKey: string): DecodedOffset;
    createLinkAtSelection(editorState: EditorState, url: string): EditorState;
    removeLinkAtSelection(editorState: EditorState): EditorState;
    collapseToEnd(editorState: EditorState): EditorState;
    getCurrentEntityKey(editorState: EditorState): string;
    getCurrentEntity(editorState: EditorState): EntityInstance | null;
    hasEntity(editorState: EditorState, entityType: string): boolean;
};
export default _default;
