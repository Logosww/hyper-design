import { buildProps } from "@hyper/utils";

import type { ExtractPropTypes } from "vue";

const SIZE_MAP = ['small', 'medium', 'large'];

export const iconProps = buildProps({
    name: {
        required: true,
        type: String
    },
    size: {
        required: false,
        type: [String, Number],
        validator: (val: unknown): boolean => {
            if(typeof val !== 'string' && typeof val !== 'number') return false;
            else if(typeof val === 'string') {
                return SIZE_MAP.includes(val);
            } else return true;
        }
    },
    color: {
        required: false,
        type: String
    }
} as const);

export type IconProps = ExtractPropTypes<typeof iconProps>;