import { watch } from 'vue';
import { useEventListener } from '@vueuse/core';
import { EVENT_CODE } from 'constants';
import type { Ref } from 'vue';

type ModalInstance = {
    handleClose: () => void
};

const modalStack: ModalInstance[] = [];

const closeModal = (e: KeyboardEvent): void => {
    if(modalStack.length === 0) return;
    if(e.code === EVENT_CODE.esc) {
        e.stopPropagation();
        const topModal = modalStack[modalStack.length - 1];
        topModal.handleClose();
    }
};

export const useModal = (instance: ModalInstance, visibleRef: Ref<boolean>) => {
    watch(visibleRef, (val: boolean) => {
        if(val) modalStack.push(instance);
        else modalStack.splice(
            modalStack.findIndex(
                (modal: ModalInstance): boolean => modal === instance
            ), 
        1);
    });
}


/**
 * isClient? 验证为客户端后注册事件监听
 */
useEventListener(document, 'keydown', closeModal);