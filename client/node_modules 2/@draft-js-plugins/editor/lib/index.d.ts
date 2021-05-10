import { CompositeDecorator, ContentBlock, DraftBlockRenderMap, DraftDecorator, DraftDragType, DraftEditorCommand, DraftHandleValue, DraftInlineStyle, DraftStyleMap, EditorState, SelectionState } from 'draft-js';
import { CSSProperties, KeyboardEvent, SyntheticEvent } from 'react';
import createEditorStateWithTextFn from './utils/createEditorStateWithText';
import composeDecoratorsFn from './utils/composeDecorators';
export { default } from './Editor';
export declare const createEditorStateWithText: typeof createEditorStateWithTextFn;
export declare const composeDecorators: typeof composeDecoratorsFn;
export type { PluginEditorProps } from './Editor';
export declare type EditorCommand = DraftEditorCommand | string;
export interface GetSetEditorState {
    setEditorState(editorState: EditorState): void;
    getEditorState(): EditorState;
}
export interface EditorRef {
    refs?: {
        editor: HTMLElement;
    };
    editor: HTMLElement;
}
export interface PluginFunctions extends GetSetEditorState {
    getPlugins(): EditorPlugin[];
    getProps(): unknown;
    getReadOnly(): boolean;
    setReadOnly(readOnly: boolean): void;
    getEditorRef(): EditorRef;
}
export interface AriaProps {
    ariaHasPopup?: string;
    ariaExpanded?: boolean;
    ariaOwneeID?: string;
    ariaActiveDescendantID?: string;
}
export interface EditorPlugin {
    decorators?: Array<DraftDecorator | CompositeDecorator>;
    getAccessibilityProps?(): AriaProps;
    initialize?: (pluginFunctions: PluginFunctions) => void;
    onChange?: (editorState: EditorState, pluginFunctions: PluginFunctions) => EditorState;
    willUnmount?: (pluginFunctions: GetSetEditorState) => void;
    blockRenderMap?: DraftBlockRenderMap;
    blockRendererFn?(block: ContentBlock, pluginFunctions: PluginFunctions): any;
    blockStyleFn?(block: ContentBlock, pluginFunctions: PluginFunctions): string | undefined | null;
    customStyleFn?: (style: DraftInlineStyle, block: ContentBlock, pluginFunctions: PluginFunctions) => CSSProperties;
    customStyleMap?: DraftStyleMap;
    keyBindingFn?(event: KeyboardEvent, pluginFunctions: PluginFunctions): EditorCommand | null | undefined;
    handleReturn?(event: KeyboardEvent, editorState: EditorState, pluginFunctions: PluginFunctions): DraftHandleValue | undefined;
    handleKeyCommand?(command: EditorCommand, editorState: EditorState, eventTimeStamp: number, pluginFunctions: PluginFunctions): DraftHandleValue;
    handleBeforeInput?(chars: string, editorState: EditorState, eventTimeStamp: number, pluginFunctions: PluginFunctions): DraftHandleValue;
    handlePastedText?(text: string, html: string | undefined, editorState: EditorState, pluginFunctions: PluginFunctions): DraftHandleValue;
    handlePastedFiles?(files: Array<Blob>, pluginFunctions: PluginFunctions): DraftHandleValue;
    handleDroppedFiles?(selection: SelectionState, files: Array<Blob>, pluginFunctions: PluginFunctions): DraftHandleValue;
    handleDrop?(selection: SelectionState, dataTransfer: Record<string, unknown>, isInternal: DraftDragType, pluginFunctions: PluginFunctions): DraftHandleValue;
    onEscape?(event: KeyboardEvent, pluginFunctions: PluginFunctions): void | true;
    onTab?(event: KeyboardEvent, pluginFunctions: PluginFunctions): void | true;
    onUpArrow?(event: KeyboardEvent, pluginFunctions: PluginFunctions): void | true;
    onDownArrow?(event: KeyboardEvent, pluginFunctions: PluginFunctions): void | true;
    onRightArrow?(event: KeyboardEvent, pluginFunctions: PluginFunctions): void | true;
    onLeftArrow?(event: KeyboardEvent, pluginFunctions: PluginFunctions): void | true;
    onBlur?(event: SyntheticEvent, pluginFunctions: PluginFunctions): void | true;
    onFocus?(event: SyntheticEvent, pluginFunctions: PluginFunctions): void | true;
}
