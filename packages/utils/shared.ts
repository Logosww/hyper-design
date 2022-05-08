export const NOOP = () => {};

export const isObject = (val: unknown): val is object => val !== null && typeof val === 'object';

export const isElement = (el: unknown): el is Element => {
    if(typeof Element === 'undefined') return false;
    return el instanceof Element;
};

export const isArray = (val: unknown): val is any[] => Array.isArray(val); 

export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean';

export const isString = (val: unknown): val is string => typeof val === 'string';

export const isFunction = (val: unknown): val is Function => typeof val === 'function';