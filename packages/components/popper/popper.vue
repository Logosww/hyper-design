<template>
    <slot />
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue';
import { POPPER_INJECTION_KEY } from '@hyper/tokens';

import type { Instance as PopperInstance } from '@popperjs/core';
import type { HPopperInjectionContext } from '@hyper/tokens';

export default defineComponent({
    name: 'HPopperRoot',
    inheritAttrs: false,

    setup(_, { expose }) {
        
        const triggerRef = ref<HTMLElement>();
        const popperInstanceRef = ref<PopperInstance>();
        const contentRef = ref<HTMLElement>();
        const referenceRef = ref<HTMLElement>();

        const popperProvides = {
            /**
             * @description 触发元素
             */
            triggerRef,
            /**
             * @description popperjs实例
             */
            popperInstanceRef,
            /**
             * @description popper内容元素
             */
            contentRef,
            /**
             * @description popper内容关联元素
             */
            referenceRef
        } as HPopperInjectionContext;

        expose(popperProvides);

        provide(POPPER_INJECTION_KEY, popperProvides);
    }
})

</script>