import type { ExtractPropTypes } from "vue";

const typeMap = [
    'default',
    'primary',
    'danger',
    'success',
    'warn',
    'text'
], sizeMap = [
    'small',
    'medium',
    'large'
];


export const buttonProps = {
    color: String,
    plain: Boolean,
    type: {
        type: String,
        default: 'default',
        validator: (val: unknown): boolean => {
            if(typeof val !== 'string') return false;
            else return typeMap.includes(val);
        }
    },
    size: {
        type: String,
        default: 'large',
        validator: (val: unknown): boolean => {
            if(typeof val !== 'string') return false;
            else return sizeMap.includes(val);
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
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export const buttonEmits = {
    click: (evt: MouseEvent) => evt instanceof MouseEvent
};