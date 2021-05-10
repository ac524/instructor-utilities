import { ReactNode } from 'react';
import { DraftJsBlockAlignmentButtonType } from '..';
interface CreateBlockAlignmentButtonProps {
    alignment: string;
    children: ReactNode;
}
export default function createBlockAlignmentButton({ alignment, children, }: CreateBlockAlignmentButtonProps): DraftJsBlockAlignmentButtonType;
export {};
