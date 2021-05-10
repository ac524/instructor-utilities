import { ReactNode } from 'react';
import { DraftJsStyleButtonType } from '..';
interface CreateBlockStyleButtonProps {
    blockType: string;
    children: ReactNode;
}
export default function createBlockStyleButton({ blockType, children, }: CreateBlockStyleButtonProps): DraftJsStyleButtonType;
export {};
