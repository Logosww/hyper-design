<template>
    <h-popper ref="popperRef">
        <h-tooltip-trigger
          :disabled="disabled"
          :trigger="trigger"
          :virtual-trigger="virtualTrigger"
          :virtual-ref="virtualRef"
        >
          <slot v-if="$slots.default" />
        </h-tooltip-trigger>
        <h-tooltip-content
          :aria-lable="ariaLabel"
          :boundaries-padding="boundariesPadding"
          :content="content"
          :disabled="disabled"
          :mode="mode"
          :enterable="enterable"
          :fallback-placements="fallbackPlacements"
          :hide-after="hideAfter"
          :gpu-acceleration="gpuAcceleration"
          :offset="offset"
          :persistence="persistence"
          :popper-class="popperClass"
          :popper-style="popperStyle"
          :placement="placement"
          :popper-options="compatedPopperOptions"
          :pure="pure"
          :raw-content="rawContent"
          :reference-el="referenceEl"
          :show-after="showAfter"
          :strategy="strategy"
          :teleported="teleported"
          :transition="transition"
          :z-index="zIndex"
          :append-to="appendTo"
        >
          <slot name="content">
            <span v-if="rawContent" v-html="content" />
            <span v-else>{{ content }}</span>
          </slot>
          <h-popper-arrow v-if="showArrow && false" :arrow-offset="arrowOffset" />
        </h-tooltip-content>
    </h-popper>
</template>

<script lang="ts">
import { 
  computed, 
  defineComponent, 
  ref, 
  unref, 
  toRef, 
  provide, 
  watch, 
  readonly 
} from "vue";
import {
  HPopper,
  HPopperArrow,
  usePopperArrowProps
} from '@hyper/components/popper';
import HTooltipTrigger from './trigger.vue';
import HTooltipContent from './content.vue';
import {
  useTooltipContentProps,
  useTooltipTriggerProps,
  useTooltipProps
} from './tooltip';
import { createModelToggleComposable, useDelayedToggle, usePopperContainer, useId } from '@hyper/hooks';
import { isBoolean } from "@hyper/utils";
import { TOOLTIP_INJECTION_KEY } from '@hyper/tokens';

const {
  useModelToggle,
  useModelToggleProps,
  useModelToggleEmits
} = createModelToggleComposable('visible' as const);

export default defineComponent({
   name: 'HTooltip',
   components: { HPopper, HTooltipTrigger, HTooltipContent, HPopperArrow },
   props: {
     ...useModelToggleProps,
     ...useTooltipContentProps,
     ...useTooltipTriggerProps,
     ...usePopperArrowProps,
     ...useTooltipProps
   },
   emits: [
     ...useModelToggleEmits,
     'before-show',
     'before-hide',
     'show',
     'hide'
   ],

   setup(props, { emit }) {
     usePopperContainer();
     const id = useId();
     const popperRef = ref<InstanceType<typeof HPopper> | null>(null);

     const updatePopper = () => {
       const popperComponent = unref(popperRef);
       if(popperComponent) popperComponent.popperInstanceRef?.update();
     };

     const open = ref(false);

     const { show, hide } = useModelToggle({ indicator: open });

     const { onOpen, onClose } = useDelayedToggle({
       showAfter: toRef(props, 'showAfter'),
       hideAfter: toRef(props, 'hideAfter'),
       open: show,
       close: hide
     });

     const controlled = computed(() => isBoolean(props.visible));

     const compatedPopperOptions = computed(() => {
        /**
         * If virtual trigger is enabled, we need to correct default popper options
         * to ensure the popper transform correctly.
         */
        if(props.virtualTrigger) {
          return {
            ...props.popperOptions,
            modifiers: [
              {
                name: 'computeStyles',
                options: {
                  adaptive: false,
                  enabled: false
                }
              }
            ]
          };
        }
        return props.popperOptions;
     })

     provide(
       TOOLTIP_INJECTION_KEY,
       {
         controlled,
         id,
         open: readonly(open),
         trigger: toRef(props, 'trigger'),
         onOpen,
         onClose,
         onToggle: () => {
           if(unref(open)) onClose();
           else onOpen();
         },
         onShow: () => { emit('show') },
         onHide: () => { emit('hide') },
         onBeforeShow: () => { emit('before-show') },
         onBeforeHide: () => { emit('before-hide') },
         updatePopper
       }
     );

     watch(
       () => props.disabled,
       disabled => {
         if(disabled && open.value) open.value = false;
       }
     );

     return {
       popperRef,
       open,
       hide,
       updatePopper,
       onOpen,
       onClose,
       compatedPopperOptions
     };
   }
});
</script>