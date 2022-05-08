<template>
    <h-only-child
      v-if="!virtualTrigger"
      v-bind="$attrs"
      :aria-describedby="open ? id : undefined"
    >
        <slot />
    </h-only-child>
</template>

<script lang="ts">
import { useForwardRef } from "@hyper/hooks";
import { POPPER_INJECTION_KEY } from "@hyper/tokens";
import { isElement } from '@hyper/utils';
import { unrefElement } from "@vueuse/core";
import { defineComponent, inject, onMounted, watch } from "vue";
import { usePopperTriggerProps } from './trigger';
import HOnlyChild from '@hyper/components/slot';

export default defineComponent({
   name: 'HPopperTrigger',
   inheritAttrs: false,
   props: usePopperTriggerProps,
   components: { HOnlyChild },
   
   setup(props, { expose }) {

        const { triggerRef } = inject(POPPER_INJECTION_KEY, undefined)!;

        useForwardRef(triggerRef);

        onMounted(() => {
            watch(
                () => props.virtualRef,
                virtualEl => {
                    if(virtualEl) triggerRef.value = unrefElement(virtualEl as HTMLElement);
                },
                { immediate: true }
            );

            watch(
                () => triggerRef.value,
                (el, prevEl) => {
                    if(isElement(el)) {
                        [
                            'onMouseenter',
                            'onMouseleave',
                            'onClick',
                            'onKeydown',
                            'onFocus',
                            'onBlur',
                            'onContextmenu'
                        ].forEach(eventName => {
                            const handler = props[eventName];
                            if(handler) {
                                (el as HTMLElement).addEventListener(
                                    eventName.slice(2).toLowerCase(),
                                    handler
                                );
                                (prevEl as HTMLElement)?.removeEventListener(
                                    eventName.slice(2).toLowerCase(),
                                    handler
                                );
                            }
                        })
                    }
                },
                { immediate: true }
            );
        });
        
        expose({
             /**
             * @desciption 触发元素
             */
            triggerRef
        });
   }
});
</script>