<template>
    <span ref="arrowRef" class="hp-popper-arrow" data-popper-arrow="" />
</template>

<script lang="ts">
import { POPPER_CONTENT_INJECTION_KEY } from "@hyper/tokens";
import { defineComponent, inject, onBeforeUnmount, watch } from "vue";
import { usePopperArrowProps } from './arrow';

export default defineComponent({
   name: 'HPopperArrow',
   inheritAttrs: false,
   props: usePopperArrowProps,

   setup(props, { expose }) {
        const { arrowOffset, arrowRef } = inject(
           POPPER_CONTENT_INJECTION_KEY,
           undefined
        )!;

        watch(
            () => props.arrowOffset,
            val => arrowOffset.value = val
        );

        onBeforeUnmount(() => {
            arrowRef.value = undefined;
        });

        expose({
            /**
             * @description 箭头元素
             */
            arrowRef
        });

        return {
            arrowRef
        };
   }
});
</script>