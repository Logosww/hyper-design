import Link from './link.vue';
import { buildProps } from '@hyper/utils';

import type { ExtractPropTypes } from 'vue';

const TYPE_MAP = [
    'default',
    'primary',
    'danger',
    'warn'
];

export const linkProps = buildProps({
    type: {
        type: String,
        default: 'default',
        values: TYPE_MAP
    },
    underline: {
        type: Boolean,
        default: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    href: String,
    icon: String,
    color: String
} as const);

export const linkEmits = {
    click: (e: MouseEvent) => e instanceof MouseEvent
};

export type LinkProps = ExtractPropTypes<typeof linkProps>;
export type LinkEmits = typeof linkEmits;
export type LinkInstance = InstanceType<typeof Link>;