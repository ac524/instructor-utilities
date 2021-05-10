import { ComponentType } from 'react';
import { Store } from '@draft-js-plugins/utils';
import { EditorState, SelectionState } from 'draft-js';
import { EditorPlugin } from '@draft-js-plugins/editor';
import { ToolbarPubProps } from './components/Toolbar';
import Separator from './components/Separator';
import { StaticToolbarPluginTheme } from './theme';
export type { StaticToolbarPluginTheme };
export interface StaticToolbarPluginConfig {
    theme?: StaticToolbarPluginTheme;
}
export declare type ToolbarProps = ToolbarPubProps;
export declare type StaticToolBarPlugin = EditorPlugin & {
    Toolbar: ComponentType<ToolbarPubProps>;
};
export interface StoreItemMap {
    getEditorState?(): EditorState;
    setEditorState?(state: EditorState): void;
    selection?: SelectionState;
}
export declare type StaticToolBarPluginStore = Store<StoreItemMap>;
declare const _default: (config?: StaticToolbarPluginConfig) => StaticToolBarPlugin;
export default _default;
export { Separator };
