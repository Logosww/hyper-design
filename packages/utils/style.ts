import { isString, isNumber } from '@vueuse/core';
import { debugWarn } from './error';

const SCOPE = 'utils/style';

export function addUnit(value: string | number, defaultUnit = 'px') {
    if(!value) return '';
    if(isString(value)) return value;
    else if(isNumber(value)) return `${value}${defaultUnit}`;
    debugWarn(SCOPE, 'incoming value must be a string or number');
}