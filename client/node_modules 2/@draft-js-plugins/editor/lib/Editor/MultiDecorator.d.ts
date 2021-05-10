import { CompositeDecorator, ContentBlock, ContentState } from 'draft-js';
import Immutable from 'immutable';
export default class MultiDecorator {
    decorators: Immutable.List<CompositeDecorator>;
    constructor(decorators: Immutable.List<CompositeDecorator> | CompositeDecorator[]);
    /**
     * Return list of decoration IDs per character
     */
    getDecorations(block: ContentBlock, contentState: ContentState): Immutable.List<string>;
    /**
     * Return component to render a decoration
     */
    getComponentForKey(key: string): Function;
    /**
     * Return props to render a decoration
     */
    getPropsForKey(key: string): object;
    /**
     * Return a decorator for a specific key
     */
    getDecoratorForKey(key: string): CompositeDecorator;
    /**
     * Return inner key for a decorator
     */
    static getInnerKey(key: string): string;
}
