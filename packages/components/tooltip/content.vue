<template>
    <teleport :disabled="!teleported" :to="appendTo">
        <transition
         :name="transition"
         @after-leave="onTransitionLeave"
         @before-enter="onBeforeEnter"
         @after-enter="onAfterShow"
         @before-leave="onBeforeLeave"
        >
            <h-popper-content
              v-if="shouldRender"
              v-show="shouldShow"
              ref="contentRef"
              v-bind="$attrs"
              :aria-hidden="ariaHidden"
              :boundaries-padding="boundariesPadding"
              :fallback-placements="fallbackPlacements"
              :gpu-acceleration="gpuAcceleration"
              :offset="offset"
              :placement="placement"
              :popper-options="popperOptions"
              :strategy="strategy"
              :mode="mode"
              :enterable="enterable"
              :pure="pure"
              :popper-class="afterPopperClass"
              :popper-style="[popperStyle, contentStyle]"
              :reference-el="referenceEl"
              :visible="shouldShow"
              :z-index="zIndex"
              @mouseenter="onContentEnter"
              @mouseleave="onContentLeave"
            >
                <template v-if="!destroyed">
                    <slot />
                    <h-visually-hidden :id="id" role="tooltip">
                        {{ ariaLabel }}
                    </h-visually-hidden>
                </template>
            </h-popper-content>
        </transition>
    </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onBeforeUnmount, ref, unref, watch } from "vue";
import { useTooltipContentProps } from './tooltip';
import { HPopperContent } from '@hyper/components/popper';
import { HVisuallyHidden } from '@hyper/components/visual-hidden';
import { TOOLTIP_INJECTION_KEY } from '@hyper/tokens';
import { useEscapeKeydown } from '@hyper/hooks';
import { composeEventHandlers, isArray, isString } from "@hyper/utils";
import { onClickOutside } from "@vueuse/core";

export default defineComponent({
    name: 'HTooltipContent',
    components: { HPopperContent, HVisuallyHidden },
    inheritAttrs: false,
    props: useTooltipContentProps,

    setup(props) {
        
        const contentRef = ref<InstanceType<typeof HPopperContent> | null>(null);
        const intermediateOpen = ref(false);
        const entering = ref(false);
        const leaving = ref(false);
        const destroyed = ref(false);
        const {
            controlled,
            id,
            open,
            trigger,
            onClose,
            onOpen,
            onShow,
            onHide,
            onBeforeShow,
            onBeforeHide
        } = inject(TOOLTIP_INJECTION_KEY, undefined);
        const persistentRef = computed(() => props.persistence);

        onBeforeUnmount(() => destroyed.value = true);

        const shouldRender = computed(() => unref(persistentRef) ? true : unref(open));

        const shouldShow = computed(() => props.disabled ? true : unref(open));

        const contentStyle = computed(() => (props.style ?? {} as any));

        const ariaHidden = computed(() => !unref(open));

        const afterPopperClass = ref('');

        useEscapeKeydown(onClose);

        const onTransitionLeave = () => { onHide(); };

        const stopWhenControlled = () => !!unref(controlled);

        const onContentEnter = composeEventHandlers(stopWhenControlled, () => {
            if(props.enterable && unref(trigger) === 'hover') onOpen();
        });

        const onContentLeave = composeEventHandlers(stopWhenControlled, () => {
            if(unref(trigger) === 'hover') onClose();
        });

        const onBeforeEnter = () => {
            contentRef.value?.updatePopper?.();
            onBeforeShow?.();
        };

        const onBeforeLeave = () => { 
            afterPopperClass.value = props.popperClass;
            onBeforeHide?.(); 
        };
        
        const onAfterShow = () => {
            const _class = props.popperClass;
            if(isString(_class)) {
                afterPopperClass.value = ['transform', _class];
            } else if(isArray(_class)) {
                afterPopperClass.value = _class.push('transform');
            } else {
                afterPopperClass.value = {
                    ..._class,
                    transform: true
                };
            }
            onShow(); 
        };

        let stopHandle: ReturnType<typeof onClickOutside>;

        watch(
            () => unref(open),
            val => {
                if(val) {
                    stopHandle = onClickOutside(
                        computed(() => contentRef.value?.popperContentRef),
                        () => {
                            if(unref(controlled)) return;
                            const $trigger = unref(trigger);
                            if($trigger !== 'hover') onClose();
                        }
                    )
                } else stopHandle?.();
            },
            { flush: 'post' }
        );

        return {
            ariaHidden,
            afterPopperClass,
            entering,
            leaving,
            id,
            intermediateOpen,
            contentStyle,
            contentRef,
            destroyed,
            shouldRender,
            shouldShow,
            open,
            onAfterShow,
            onBeforeEnter,
            onBeforeLeave,
            onContentEnter,
            onContentLeave,
            onTransitionLeave
        }
    }
});
</script>