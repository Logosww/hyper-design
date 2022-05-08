import { buildProps, definePropType } from '@hyper/utils';
import { 
    usePopperContentProps,
    usePopperTriggerProps
} from '@hyper/components/popper';
import { 
    POPPER_CONTAINER_SELECTOR,
    useDelayedToggleProps
} from '@hyper/hooks';

import type ToolTip from './tooltip.vue';

import type { ExtractPropTypes } from 'vue';

const triggers = ['hover', 'focus', 'click', 'contextmenu'] as const;

export type Trigger = typeof triggers[number];

export const useTooltipContentProps = buildProps({
    ...useDelayedToggleProps,
    ...usePopperContentProps,
    appendTo: {
        type: definePropType<string | HTMLElement>([String, Object]),
        default: POPPER_CONTAINER_SELECTOR
    },
    content: String,
    rawContent: {
        type: Boolean,
        default: false
    },
    persistence: Boolean,
    ariaLabel: String,
    /**
     * 因为模式切换的prop是动态生成的，
     * typescript不能正常进行类型推断：
     * [name]: { type: Boolean, default: null }
     * 所以我们需要再次声明以便类型检查。
     */
    visible: {
        type: definePropType<boolean | null>(Boolean),
        default: null
    },
    transition: {
        type: String,
        default: 'hp-fade-in-linear'
    },
    teleported: {
        type: Boolean,
        default: true
    },
    disabled: Boolean
} as const);

export const useTooltipTriggerProps = buildProps({
    ...usePopperTriggerProps,
    disabled: Boolean,
    trigger: {
        type: definePropType<Trigger | Trigger[]>([String, Array]),
        default: 'hover'
    }
} as const);

export const useTooltipProps = buildProps({
    showAfter: Number,
    // Seems like there can't be both arrowEl and transparent background.
    // Temporarily close the showArrow prop. Working on a new solution...
    // 😭😭😭
    showArrow: {
        type: Boolean,
        default: false
    },
    hideAfter: {
        type: Number,
        default: 200
    },
} as const);

export type HTooltipContentProps = ExtractPropTypes<typeof useTooltipContentProps>;

export type HTooltipTriggerProps = ExtractPropTypes<typeof useTooltipTriggerProps>;

export type HTooptipProps = ExtractPropTypes<typeof useTooltipProps>
    & HTooltipContentProps
    & HTooltipTriggerProps
;

export type TooltipInstance = InstanceType<typeof ToolTip>;