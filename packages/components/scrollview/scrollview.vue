<template>
  <div ref="scrollview$" class="hp-scrollview">
    <div 
      ref="wrapper$"
      :class="['hp-scrollview-wrapper', !native ? 'hidden-default' : '', wrapperClass]"
      :style="style"
      @scroll="handleScroll"
    >
      <component
        :is="tag" 
        ref="resize$"
        :class="['hp-scrollview-content', viewClass]"
        :style="viewStyle"
      >
        <slot></slot>
      </component>
    </div>
    <template v-if="!native">
      <bar
        ref="barRef"
        :height="barHeight"
        :width="barWidth"
        :always="always"
        :ratio-x="ratioX"
        :ratio-y="ratioY"
      ></bar>
    </template>
  </div>
</template>
<script lang="ts">
import { 
    computed,
    defineComponent,
    ref,
    reactive,
    onMounted,
    watch,
    provide,
    nextTick
} from 'vue';
import { scrollviewProps, scrollviewEmits } from './scrollview';
import { scrollbarContextKey } from '@hyper/tokens';
import { useEventListener, useResizeObserver, isNumber } from '@vueuse/core';
import { addUnit, debugWarn } from '@hyper/utils';
import Bar from './bar.vue';

import type { CSSProperties, StyleValue } from 'vue';

export default defineComponent({
  name: 'HScrollview',
  components: { Bar },
  props: scrollviewProps,
  emits: scrollviewEmits,

  setup(props, { emit }) {
      let stopResizeObserver: (() => void) | undefined = undefined;
      let stopResizeListener: (() => void) | undefined = undefined;

      const scrollview$ = ref<HTMLDivElement>();
      const wrapper$ = ref<HTMLDivElement>();
      const resize$ = ref<HTMLDivElement>();

      const barWidth = ref('0');
      const barHeight = ref('0');
      const barRef = ref();
      const moveX = ref(0)
      const moveY = ref(0)
      const ratioX = ref(1);
      const ratioY = ref(1);
      const SCOPE = 'HScrollView';
      const GAP = 4;

      const style = <StyleValue>computed(() => {
        const style: CSSProperties = {};
        if(props.height) style.height = addUnit(props.height);
        if(props.maxHeight) style.maxHeight = addUnit(props.maxHeight);
        return [props.wrapperStyle, style];
      });

      const handleScroll = () => {
        if(wrapper$.value) {
          barRef.value?.handleScroll(wrapper$.value);
          emit('scroll', {
            scrollTop: wrapper$.value.scrollTop,
            scrollLeft: wrapper$.value.scrollLeft
          });
        }
      };

      // TODO: const scrollTo = 

      const setScrollTop = (val: number) => {
        if(!isNumber(val)) {
          debugWarn(SCOPE, 'value must be a number');
          return;
        } 
        wrapper$.value!.scrollTop = val;
      };

      const setScrollLeft = (val: number) => {
        if(!isNumber(val)) {
          debugWarn(SCOPE, 'value must be a number');
          return;
        } 
        wrapper$.value!.scrollLeft = val;
      };

      const update = () => {
        if(!wrapper$.value) return;
        const offsetHeight = wrapper$.value.offsetHeight - GAP;
        const offsetWidth = wrapper$.value.offsetWidth - GAP;

        const originalHeight = offsetHeight ** 2 / wrapper$.value.scrollHeight;
        const originalWidth = offsetWidth ** 2 / wrapper$.value.scrollWidth;
        const height = Math.max(originalHeight, props.minSize);
        const width = Math.max(originalWidth, props.minSize);

        ratioY.value =
          originalHeight /
          (offsetHeight - originalHeight) /
          (height / (offsetHeight - height));
        ratioX.value =
          originalWidth /
          (offsetWidth - originalWidth) /
          (width / (offsetWidth - width));

        barHeight.value = height + GAP < offsetHeight ? `${height}px` : '';
        barWidth.value = width + GAP < offsetWidth ? `${width}px` : '';
      };

      watch(
        () => props.notResize,
        (notResize) => {
          if(notResize) {
            stopResizeObserver?.();
            stopResizeListener?.();
          } else {
            ({ stop: stopResizeObserver} = useResizeObserver(resize$, update));
            stopResizeListener = useEventListener('resize', update);
          }
        },
        { immediate: true }
      );

      watch(
        () => [props.maxHeight, props.height],
        () => {
          if(!props.native) {
            nextTick(() => {
              update();
              if(wrapper$.value) barRef.value?.handleScroll(wrapper$.value);
            })
          }
        }
      );

      provide(
        scrollbarContextKey,
        reactive({
          scrollviewElement: scrollview$,
          wrapperElement: wrapper$
        })
      );

      onMounted(() => {
        if(!props.native) nextTick(() => update());
      });

      return {
        scrollview$,
        wrapper$,
        resize$,
        barRef,
        moveX,
        moveY,
        ratioX,
        ratioY,
        barWidth,
        barHeight,
        style,
        update,
        handleScroll,
        setScrollTop,
        setScrollLeft
      };
  }
});
</script>

<style>
</style>