import { onBeforeMount } from 'vue';
import { isClient } from '@vueuse/core';
import { generateId } from '@hyper/utils';

let cachedContainer: HTMLElement;

export const POPPER_CONTAINER_ID = `hp-popper-container-${generateId()}`;

export const POPPER_CONTAINER_SELECTOR = `#${POPPER_CONTAINER_ID}`;

const createContainer = () => {
    const contaienr = document.createElement('div');
    contaienr.id = POPPER_CONTAINER_ID;
    document.body.appendChild(contaienr);
    
    return contaienr;
};

export const usePopperContainer = () => {
    onBeforeMount(() => {
        if(!isClient) return;
        if(!cachedContainer ||
            !document.body.querySelector(POPPER_CONTAINER_SELECTOR)
        ) cachedContainer = createContainer();
    })
}