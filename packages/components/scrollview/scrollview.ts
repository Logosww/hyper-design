import { isNumber } from '@vueuse/core';
import { buildProps, definePropType } from "@hyper/utils";

import type { StyleValue, ExtractPropTypes } from 'vue';

export const scrollviewProps = buildProps({
    height: {
        type: [String, Number],
        default: ''
    },
    maxHeight: {
        type: [String, Number],
        default: ''
    },
    native: {
        type: Boolean,
        default: false
    },
    wrapperStyle: {
        type: definePropType<StyleValue>([String, Object, Array]),
        default: ''
    },
    wrapperClass: {
        type: [String, Array],
        default: ''
    },
    viewStyle: {
        type: definePropType<StyleValue>([String, Object, Array]),
        default: ''
    },
    viewClass: {
        type: [String, Array],
        default: ''
    },
    notResize: Boolean,
    tag: {
        type: String,
        default: 'div'
    },
    always: {
        type: Boolean,
        default: false
    },
    minSize: {
        type: Number,
        default: 20
    }
} as const);

export type ScrollViewProps = ExtractPropTypes<typeof scrollviewProps>;

export const scrollviewEmits = {
    scroll: ({ scrollTop, scrollLeft }: 
            { scrollTop: number, scrollLeft: number}) => 
        isNumber(scrollTop) && isNumber(scrollLeft)
};

export type ScollViewEmits = typeof scrollviewEmits;