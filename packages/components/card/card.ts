import { buildProps, definePropType } from '@hyper/utils';
import type Card from './card.vue';
import type { ExtractPropTypes, StyleValue } from 'vue';

const SHADOW_MAP = ['always', 'hover', 'never'];

export const cardProps = buildProps({
    header: String,
    customStyle: {
        type: definePropType<StyleValue>([String, Object, Array]),
        default: ''
    },
    shadow: {
        type: String,
        default: 'always',
        values: SHADOW_MAP
    }
} as const);

export type CardProps = ExtractPropTypes<typeof cardProps>;
export type CardInstance = InstanceType<typeof Card>;
