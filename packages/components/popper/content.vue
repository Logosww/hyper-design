<template>
    <div
      ref="popperContentRef"
      :style="contentStyle"
      :class="contentClass"
      role="tooltip"
      @mouseenter="e => $emit('mouseenter', e)"
      @mouseleave="e => $emit('mouseleave', e)"
    >
        <slot />
    </div>
</template>

<script lang="ts">
import { useZIndex } from "@hyper/hooks";
import { createPopper } from '@popperjs/core';
import { POPPER_CONTENT_INJECTION_KEY, POPPER_INJECTION_KEY } from "@hyper/tokens";
import { computed, defineComponent, inject, onMounted, provide, ref, unref, watch, WatchStopHandle } from "vue";
import { buildPopperOptions, unwrapMeasurableEl } from "./utils";
import { usePopperContentProps } from './content';

export default defineComponent({
    name: 'HPopperContent',
    props: usePopperContentProps,
    emits: ['mouseenter', 'mouseleave'],

    setup(props, { expose }) {
        
        const { popperInstanceRef, contentRef, triggerRef } = inject(
            POPPER_INJECTION_KEY,
            undefined
        )!;
        const { nextZIndex } = useZIndex();
        const popperContentRef = ref<HTMLElement>();
        const arrowRef = ref<HTMLElement>();
        const arrowOffset = ref<number>();
        provide(
            POPPER_CONTENT_INJECTION_KEY,
            { arrowRef, arrowOffset }
        );
        const contentZIndex = ref(props.zIndex || nextZIndex());

        const computedReference = computed(
            () => unwrapMeasurableEl(props.referenceEl) || unref(triggerRef)
        );
        
        const contentStyle = computed(
            () => [{ zIndex: unref(contentZIndex) }, props.popperStyle ] as any
        );

        const contentClass = computed(() => [
            'hp-popper',
            props.pure ? 'pure' : '',
            `${props.mode}`,
            props.popperClass
        ]);

        const createPopperInstance = ({ referenceEl, popperContentEl, arrowEl }) => {
            const options = buildPopperOptions(props, {
                arrowEl,
                arrowOffset: unref(arrowOffset)
            });

            return createPopper(referenceEl, popperContentEl, options);
        };

        const updatePopper = (shouldUpdateZIndex: boolean = true) => {
            unref(popperInstanceRef)?.update();
            shouldUpdateZIndex && (contentZIndex.value = props.zIndex || nextZIndex());
        };

        const togglePopperAlive = () => {
            const monitorable = { name: 'eventListeners', enabled: props.visible };
            unref(popperInstanceRef)?.setOptions?.(options => ({
                ...options,
                modifiers: [...(options.modifiers || []), monitorable]
            }));
            updatePopper(false);
        };

        onMounted(() => {
            let updateHandle: WatchStopHandle;
            watch(
                computedReference,
                referenceEl => {
                    updateHandle?.();
                    const popperInstance = unref(popperInstanceRef);
                    popperInstance?.destroy?.();
                    if(referenceEl) {
                        const popperContentEl = unref(popperContentRef);
                        contentRef.value = popperContentEl;

                        popperInstanceRef.value = createPopperInstance({
                            referenceEl,
                            popperContentEl,
                            arrowEl: unref(arrowRef)
                        });

                        updateHandle = watch(
                            () => referenceEl.getBoundingClientRect(),
                            () => updatePopper(),
                            { immediate: true }
                        );
                    } else popperInstanceRef.value = undefined;
                },
                { immediate: true }
            );

            watch(() => props.visible, togglePopperAlive, { immediate: true });

            watch(
                () => buildPopperOptions(props, {
                    arrowEl: unref(arrowRef),
                    arrowOffset: unref(arrowOffset)
                }),
                option => popperInstanceRef.value?.setOptions(option)
            );
        });

        expose({
            /**
             * @description popper内容元素
             */
            popperContentRef,
            /**
             * @description popperjs实例
             */
            popperInstanceRef,
            /**
             * @description 更新popper的方法
             */
            updatePopper,
            /**
             * @description popper内容样式
             */
            contentStyle
        });

        return {
            popperContentRef,
            contentStyle,
            contentClass
        };
    }
})
</script>