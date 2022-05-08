import { buildProps, definePropType } from "@hyper/utils";
import type { Measurable } from '@hyper/tokens';

export const usePopperTriggerProps = buildProps({
    virtualRef: {
        type: definePropType<Measurable>(Object)
    },
    virtualTrigger: Boolean,
    onMouseenter: Function,
    onMouseleave: Function,
    onClick: Function,
    onKeydown: Function,
    onFocus: Function,
    onBlur: Function,
    onContextmenu: Function,
    id: String,
    open: Boolean
} as const);

export type PopperTriggerProps = typeof usePopperTriggerProps;