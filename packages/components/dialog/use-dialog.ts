import { ref, computed, watch,  nextTick, onMounted } from 'vue';
import {  useModal, useZIndex, useLockScreen, useDraggable } from '@hyper/hooks';
import { UPDATE_MODEL_EVENT } from '@hyper/constants';

import type { CSSProperties, Ref, SetupContext } from 'vue';
import type { DialogEmits, DialogProps } from './dialog';

export const useDialog = (
    props: DialogProps,
    { emit }: SetupContext<DialogEmits>,
    targetRef: Ref<HTMLElement | undefined>,
    dragRef: Ref<HTMLElement | undefined>,
    draggable: Ref<boolean>
) => {

    const visible = ref(false);
    const closed = ref(false);
    const rendered = ref(false);
    const { nextZIndex, currentZIndex } = useZIndex();
    const zIndex = ref(props.zIndex || nextZIndex());

    const resetPos = useDraggable(targetRef, dragRef, draggable);

    const top = computed(() => {
        return typeof props.top === 'number' ? `${props.top}px` : props.top;
    });

    const width = computed(() => {
        return typeof props.width === 'number' ? `${props.width}px` : props.width;
    });

    const style = <CSSProperties>computed(() => {
        const style: CSSProperties = {};
        if(props.top) style['top'] = top.value;
        if(props.width) style['width'] = width.value;
        return style;
    });

    const afterEnter = (): void => emit('opened');

    const beforeLeave = (): void => emit('close');

    const afterLeave = (): void => {
        emit('closed');
        emit(UPDATE_MODEL_EVENT, false);
        if(props.destroyOnClose) rendered.value = false;
    };

    const open = (): void => {
        // if(props.openDelay && props.openDelay > 0)
        doOpen();
    };

    const doOpen = (): void => {
        visible.value = true;
        setTimeout(() => {
            const parentRect = targetRef.value.parentElement.getBoundingClientRect();
            targetRef.value.style.transform = '';
            targetRef.value.style.left = `${parentRect.x}px`; 
            targetRef.value.style.top = `${parentRect.y}px`; 
        }, 0);
    };

    const close = (): void => {
        // if(props.closeDelay && props.closeDelay > 0) 
        doClose();
    };

    const doClose = (): void => {
        visible.value = false;
        resetPos();
    };

    const handleClose = (): void => {
        function hide(cancel: boolean) {
            if(cancel) return;
        closed.value = true;
        visible.value = false;
        }
        if(props.beforeClose) props.beforeClose(hide);
        else close();
    };

    const onModalClick = (): void => {
        console.log(123)
        if(props.closeOnClickModal) handleClose();
    };

    if(props.closeOnEscapePressed) {
        useModal({ handleClose }, visible);
    }

    if(props.lockScroll) useLockScreen(visible);

    watch(
        () => props.modelValue,
        (val): void => {
            if(val) {
                closed.value = true;
                open();
                rendered.value = true;
                emit('open');
                zIndex.value = props.zIndex ? zIndex.value++ : nextZIndex();
                nextTick((): void => {
                    if(targetRef.value) targetRef.value.scrollTop = 0;
                });
            } else {
                if(visible.value) close();
            }
        }
    );

    onMounted((): void => {
        if(props.modelValue) {
            visible.value = true;
            rendered.value = true;
            // open();
        }
    });

    return {
        visible,
        closed,
        rendered,
        zIndex,
        style,
        afterEnter,
        afterLeave,
        beforeLeave,
        doOpen,
        doClose,
        handleClose,
        onModalClick
    };
}
