import { ExtractPropTypes } from "vue";
import { UPDATE_MODEL_EVENT } from 'constants';

export const dialogEmits = {
    open: () => true,
    opened: () => true,
    close: () => true,
    closed: () => true,
    [UPDATE_MODEL_EVENT]: (value: boolean) => typeof value === 'boolean'
}

export const dialogProps = {
    width: String,
    top: [String, Number],
    visible: Boolean,
    zIndex: Number,
    beforeClose: Function,
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
    modal: {
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
};

export type DialogEmits = typeof dialogEmits;
export type DialogProps = ExtractPropTypes<typeof dialogProps>;