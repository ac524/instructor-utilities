import { EditorProps } from 'draft-js';
import { EditorPlugin, PluginFunctions } from '..';
export declare function createPluginHooks(plugins: EditorPlugin[], pluginFunction: PluginFunctions): Partial<EditorProps>;
