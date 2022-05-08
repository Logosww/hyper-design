import { onBeforeUnmount, onMounted, watchEffect } from "vue";
// import { addUnit } from 'utils';
import type { Ref } from 'vue';

export const useDraggable = (
    targetRef: Ref<HTMLElement | undefined>,
    dragRef: Ref<HTMLElement | undefined>,
    draggable: Ref<boolean>
): Function => {
    let transform = {
        offsetX: 0,
        offsetY: 0
    };

    const onMousedown = (e: MouseEvent): void => {
        const downX = e.clientX;
        const downY = e.clientY;
        const { offsetX, offsetY } = transform;

        const targetRect = targetRef.value.getBoundingClientRect();
        const targetLeft = targetRect.left;
        const targetTop = targetRect.top;
        const targetWidth = targetRect.width;
        const targetHeight = targetRect.height;

        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;

        const minLeft = offsetX - targetLeft;
        const minTop = offsetY - targetTop;
        const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
        const maxTop = clientHeight - targetTop - targetHeight + offsetY;

        const onMousemove = (e: MouseEvent): void => {
            const moveX = Math.min(
                Math.max(offsetX + e.clientX - downX, minLeft),
                maxLeft
            );
            const moveY = Math.min(
                Math.max(offsetY + e.clientY - downY, minTop),
                maxTop
            );

            transform = {
                offsetX: moveX,
                offsetY: moveY
            };
            targetRef.value.style.transform = `translate(${moveX}px, ${moveY}px)`
        };

        const onMouseup = (): void => {
            document.removeEventListener('mousemove', onMousemove);
            document.removeEventListener('mouseup', onMouseup);
        };

        document.addEventListener('mousemove', onMousemove);
        document.addEventListener('mouseup', onMouseup);
    };

    const onDraggable = (): void => {
        if(dragRef.value && targetRef.value) dragRef.value.addEventListener('mousedown', onMousedown);
    };

    const offDraggable = (): void => {
        if(dragRef.value && targetRef.value) dragRef.value.removeEventListener('mousedown', onMousedown);
    };

    onMounted((): void => {
        watchEffect((): void => {
            if(draggable.value) onDraggable();
            else offDraggable();
        });
    });

    onBeforeUnmount((): void => {
        offDraggable();
    });

    return function resetTransform() {
        transform.offsetX = 0;
        transform.offsetY = 0;
    }
}