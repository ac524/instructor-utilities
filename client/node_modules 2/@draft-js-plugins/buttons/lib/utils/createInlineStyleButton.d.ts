import { ReactNode } from 'react';
import { DraftJsStyleButtonType } from '..';
interface CreateInlineStyleButtonProp {
    style: string;
    children: ReactNode;
}
export default function createInlineStyleButton({ style, children, }: CreateInlineStyleButtonProp): DraftJsStyleButtonType;
export {};
