import React, { ComponentType, FC, ReactElement } from 'react';
import { EditorState } from 'draft-js';
import { DraftJsButtonTheme } from '@draft-js-plugins/buttons';
import PropTypes from 'prop-types';
import { StaticToolBarPluginStore, StaticToolbarPluginTheme } from '../../';
export interface ToolbarChildrenProps {
    theme: DraftJsButtonTheme;
    getEditorState: () => EditorState;
    setEditorState: (editorState: EditorState) => void;
    onOverrideContent: (content: ComponentType<ToolbarChildrenProps> | undefined) => void;
}
export interface ToolbarPubProps {
    children?: FC<ToolbarChildrenProps>;
}
interface ToolbarProps extends ToolbarPubProps {
    store: StaticToolBarPluginStore;
    theme: StaticToolbarPluginTheme;
    overrideContent?: ComponentType<ToolbarChildrenProps>;
}
export default class Toolbar extends React.Component<ToolbarProps> {
    static propTypes: {
        children: PropTypes.Requireable<(...args: any[]) => any>;
    };
    state: ToolbarProps;
    /**
     * This can be called by a child in order to render custom content instead
     * of the regular structure. It's the responsibility of the callee to call
     * this function again with `undefined` in order to reset `overrideContent`.
     * @param {Component} overrideContent
     */
    onOverrideContent: (overrideContent: ComponentType<ToolbarChildrenProps> | undefined) => void;
    renderDefaultButtons: (externalProps: ToolbarChildrenProps) => ReactElement;
    render(): ReactElement;
}
export {};
