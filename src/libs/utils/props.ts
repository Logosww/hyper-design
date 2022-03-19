const wrapperKey = Symbol();
export type PropWrapper<T> = { [wrapperKey]: T };
export const definePropType = <T>(val: any) => {
    ({[wrapperKey]: val} as PropWrapper<T>);
};