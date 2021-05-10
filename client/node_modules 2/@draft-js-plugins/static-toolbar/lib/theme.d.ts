import { DraftJsButtonTheme } from '@draft-js-plugins/buttons';
export interface StaticToolbarPluginTheme {
    buttonStyles: DraftJsButtonTheme;
    toolbarStyles: {
        toolbar?: string;
    };
}
export declare const defaultTheme: StaticToolbarPluginTheme;
