import { definePropType } from 'utils';
import type Card from './card.vue';
import type { ExtractPropTypes, StyleValue } from 'vue';

export const cardProps = {
    header: String,
    customStyle: {
        type: definePropType<StyleValue>([String, Object, Array]),
        default: ''
    },
    shadow: {
        type: String,
        default: 'always'
    }
};

export type CardProps = ExtractPropTypes<typeof cardProps>;
export type CardInstance = InstanceType<typeof Card>;
