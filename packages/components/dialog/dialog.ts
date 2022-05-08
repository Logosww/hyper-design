import { ExtractPropTypes } from "vue";
import { buildProps, definePropType } from "@hyper/utils";
import { UPDATE_MODEL_EVENT } from '@hyper/constants';

export const dialogEmits = {
    open: () => true,
    opened: () => true,
    close: () => true,
    closed: () => true,
    [UPDATE_MODEL_EVENT]: (value: boolean) => typeof value === 'boolean'
}

export const dialogProps = buildProps({
    width: { type: [String, Number] },
    top: { type: [String, Number]},
    zIndex: Number,
    beforeClose: {
        type: definePropType<() => void>(Function)
    },
    appendToBody: {
        type: Boolean,
        default: true
    },
    closeOnClickModal: {
        type: Boolean,
        default: true
    },
    closeOnEscapePressed: {
        type: Boolean,
        default: true
    },
    destroyOnClose: {
        type: Boolean,
        default: false
    },
    draggable: {
        type: Boolean,
        default: true
    },
    lockScroll: {
        type: Boolean,
        default: true
    },
    modelValue: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default: '提示：'
    }
} as const);

export type DialogEmits = typeof dialogEmits;
export type DialogProps = ExtractPropTypes<typeof dialogProps>;