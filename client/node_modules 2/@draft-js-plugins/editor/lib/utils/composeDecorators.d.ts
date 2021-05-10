import { ComponentType } from 'react';
declare type WrappedComponentType = ComponentType<any> & {
    WrappedComponent?: ComponentType<any>;
};
interface ParamFunction {
    (param: WrappedComponentType): WrappedComponentType;
}
export default function composeDecorators(...funcs: Array<ParamFunction>): ParamFunction;
export {};
