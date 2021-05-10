import { Component, KeyboardEvent, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { EditorState, Editor, EditorProps, DraftEditorCommand, DraftStyleMap, DraftBlockRenderMap, CompositeDecorator, DraftDecorator } from 'draft-js';
import { AriaProps, EditorPlugin, PluginFunctions, EditorRef } from '..';
export interface PluginEditorProps extends Omit<EditorProps, 'keyBindingFn'> {
    plugins?: EditorPlugin[];
    defaultKeyBindings?: boolean;
    defaultKeyCommands?: boolean;
    defaultBlockRenderMap?: boolean;
    keyBindingFn?(event: KeyboardEvent): DraftEditorCommand | string | null | undefined;
    decorators?: Array<CompositeDecorator | DraftDecorator>;
}
/**
 * The main editor component
 */
declare class PluginEditor extends Component<PluginEditorProps> {
    static propTypes: {
        editorState: PropTypes.Validator<object>;
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        plugins: PropTypes.Requireable<any[]>;
        defaultKeyBindings: PropTypes.Requireable<boolean>;
        defaultKeyCommands: PropTypes.Requireable<boolean>;
        defaultBlockRenderMap: PropTypes.Requireable<boolean>;
        customStyleMap: PropTypes.Requireable<object>;
        decorators: PropTypes.Requireable<any[]>;
    };
    static defaultProps: Partial<PluginEditorProps>;
    editor: Editor | null;
    state: {
        readOnly: boolean;
    };
    constructor(props: PluginEditorProps);
    focus(): void;
    blur(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: PluginEditorProps): void;
    componentWillUnmount(): void;
    onChange: (editorState: EditorState) => void;
    getPlugins: () => EditorPlugin[];
    getProps: () => PluginEditorProps;
    getReadOnly: () => boolean;
    setReadOnly: (readOnly: boolean) => void;
    getEditorRef: () => EditorRef;
    getEditorState: () => EditorState;
    getPluginMethods: () => PluginFunctions;
    createPluginHooks: () => Partial<EditorProps>;
    resolvePlugins: () => EditorPlugin[];
    resolveCustomStyleMap: () => DraftStyleMap;
    resolveblockRenderMap: () => DraftBlockRenderMap;
    resolveAccessibilityProps: () => AriaProps;
    render(): ReactElement;
}
export default PluginEditor;
