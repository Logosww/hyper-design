import { buildProps } from '@hyper/utils';

import type { ExtractPropTypes } from 'vue';

const modes = ['light', 'dark'] as const;
const triggers = ['click', 'contextmenu', 'hover', 'focus'] as const;

export const Mode = {
    LIGHT: 'light',
    DARK: 'dark'
};

export type PopperMode = typeof modes[number];
export type PopperTrigger = typeof triggers[number];

export const usePopperProps = buildProps({
    autoClose: {
        type: Number,
        default: 0
    },
    cutoff: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
} as const);

export type UsePopperProps = ExtractPropTypes<typeof usePopperProps>;