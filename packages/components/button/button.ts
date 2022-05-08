import { buildProps } from "@hyper/utils";
import type { ExtractPropTypes } from "vue";

const TYPE_MAP = [
    'default',
    'primary',
    'danger',
    'success',
    'warn',
    'text'
], SIZE_MAP = [
    'small',
    'medium',
    'large'
];


export const buttonProps = buildProps({
    color: String,
    plain: Boolean,
    disabled: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'default',
        values: TYPE_MAP
    },
    size: {
        type: String,
        default: 'medium',
        validator: (val: unknown): boolean => {
            if(typeof val !== 'string') return false;
            else return SIZE_MAP.includes(val);
        }
    },
    round: {
        type: Boolean,
        default: false
    },
    circle: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String,
        default: ''
    }
} as const);

export interface ButtonConfigContext {
    autoAddSpace?: boolean
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export const buttonEmits = {
    click: (evt: MouseEvent) => evt instanceof MouseEvent
};