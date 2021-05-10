/**
 * Creates a composite decorator based on the provided plugins
 */
import { CompositeDecorator, DraftDecorator, EditorState } from 'draft-js';
export default function createCompositeDecorator(decorators: Immutable.List<DraftDecorator>, getEditorState: () => EditorState, setEditorState: (state: EditorState) => void): CompositeDecorator;
