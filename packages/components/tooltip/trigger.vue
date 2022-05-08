<template>
    <h-popper-trigger
      :id="id"
      :open="open"
      class="hp-tooltip__trigger"
      :virtual-trigger="virtualTrigger"
      :virtual-ref="virtualRef"
      @blur="onBlur"
      @focus="onFocus"
      @click="onClick"
      @contextmenu="onContextMenu"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave"
      @keydown="onKeydown"
    >
        <slot />
    </h-popper-trigger>
</template>

<script lang="ts">
import { defineComponent, inject, ref, toRef, unref } from "vue";
import { HPopperTrigger } from '@hyper/components/popper';
import { useTooltipTriggerProps } from './tooltip';
import { whenTrigger } from "./utils";
import { composeEventHandlers } from '@hyper/utils';
import { TOOLTIP_INJECTION_KEY } from '@hyper/tokens';
import { EVENT_CODE } from "@hyper/constants";

import type { OnlyChildExpose } from '@hyper/components/slot';

export default defineComponent({
   name: 'HToolTipTrigger',
   components: { HPopperTrigger },
   props: useTooltipTriggerProps,
   
   setup(props) {

       const {
           controlled,
           id,
           open,
           onOpen,
           onClose,
           onToggle
       } = inject(
           TOOLTIP_INJECTION_KEY,
           undefined
       );
       const triggerRef = ref<OnlyChildExpose | null>(null);

       const stopWhenControlledOrDisabled = () => unref(controlled) || props.disabled;
       const trigger = toRef(props, 'trigger');
       const onMouseenter = composeEventHandlers(
           stopWhenControlledOrDisabled,
           whenTrigger(trigger, 'hover', onOpen)
       );
       const onMouseleave = composeEventHandlers(
           stopWhenControlledOrDisabled,
           whenTrigger(trigger, 'hover', onClose)
       );
       const onClick = composeEventHandlers(
           stopWhenControlledOrDisabled,
           whenTrigger(trigger, 'click', e => {
               if((e as MouseEvent).button === 0) onToggle(e);
           })
       );
       const onFocus = composeEventHandlers(
           stopWhenControlledOrDisabled,
           whenTrigger(trigger, 'focus', onOpen)
       );
       const onBlur = composeEventHandlers(
           stopWhenControlledOrDisabled,
           whenTrigger(trigger, 'focus', onClose)
       );
       const onContextMenu = composeEventHandlers(
           stopWhenControlledOrDisabled,
           whenTrigger(trigger, 'contextmenu', (e: Event) => {
               e.preventDefault();
               onToggle(e);
           })
       );
       const onKeydown = composeEventHandlers(
           stopWhenControlledOrDisabled,
           (e: KeyboardEvent) => {
               const { code } = e;
               if(code === EVENT_CODE.enter || code === EVENT_CODE.space) onToggle(e);
           }
       );

       return {
           onBlur,
           onClick,
           onContextMenu,
           onFocus,
           onKeydown,
           onMouseenter,
           onMouseleave,
           open,
           id,
           triggerRef
       };
   }
});
</script>