<template>
    <transition :name="`hp-scrollbar-${vertical ? 'vertical' : 'horizontal'}-fade`">
        <div
          v-show="always || visible"
          ref="instance"
          :class="['hp-scrollview-bar', vertical ? 'vertical' : 'horizontal']"
          @mousedown="clickTrackHandler"
        >
            <div
              ref="thumb"
              class="hp-scrollview-thumb"
              :style="thumbStyle"
              @mousedown="clickThumbHandler"
            >
            </div>
        </div>
    </transition>
</template>
<script lang="ts">
import { 
  defineComponent,
  computed,
  ref,
  inject,
  toRef,
  onBeforeUnmount
} from 'vue';
import { useEventListener, isClient } from '@vueuse/core';
import { scrollbarContextKey } from '@hyper/tokens';
import { throwError } from '@hyper/utils';
import { BAR_MAP, renderThumbStyle } from './util';

import { thumbProps } from './thumb';

const COMPONENT_NAME = 'Thumb';

export default defineComponent({
  name: COMPONENT_NAME,
  props: thumbProps,

  setup(props) {
    const scrollbar = inject(scrollbarContextKey) as any;
    
    if(!scrollbar) throwError(COMPONENT_NAME, 'can not inject scrollbar context');

    const instance = ref<HTMLDivElement>();
    const thumb = ref<HTMLDivElement>();

    const thumbState = ref({});
    const visible = ref(false);

    let cursorDown = false;
    let cursorLeave = false;
    let originalOnSelectStart: 
      | ((this: GlobalEventHandlers, e: Event) => any)
      | null = isClient ? document.onselectstart : null;
    
    const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal']);
    const thumbStyle = computed(() => 
        renderThumbStyle({
            size: props.size,
            move: props.move,
            bar: bar.value
        })
    );

    const offsetRatio = computed(() => 
        instance.value![bar.value.offset] ** 2 /
        scrollbar.wrapperElement![bar.value.scrollSize] /
        props.ratio /
        thumb.value![bar.value.offset]
    );

    const clickThumbHandler = (e: MouseEvent) => {
        e.stopPropagation();
        if(e.ctrlKey || [1, 2].includes(e.button)) return;

        window.getSelection()?.removeAllRanges();
        startDrag(e);

        const el = e.currentTarget as HTMLDivElement;
        if(!el) return;
        thumbState.value[bar.value.axis] =
          el[bar.value.offset] -
          (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction]); 
    };

    const clickTrackHandler = (e: MouseEvent) => {
        if(!thumb.value || !instance.value || !scrollbar.wrapperElement) return;

        const offset = Math.abs(
            (e.target as HTMLElement).getBoundingClientRect()[bar.value.direction] - 
              e[bar.value.client]
        );
        const thumbHalf = thumb.value[bar.value.offset] / 2;
        const thumbPositionPercentage = 
          ((offset - thumbHalf) * 100 * offsetRatio.value) /
          instance.value[bar.value.offset];

        scrollbar.wrapperElement[bar.value.scroll] = 
          (thumbPositionPercentage * scrollbar.wrapperElement[bar.value.scrollSize]) /
          100;
    };

    const startDrag = (e: MouseEvent) => {
        e.stopImmediatePropagation();
        cursorDown = true;
        document.addEventListener('mousemove', mouseMoveDocumentHandler);
        document.addEventListener('mouseup', mouseUpDocumentHandler);
        originalOnSelectStart = document.onselectstart;
        document.onselectstart = () => false;
    };

    const mouseMoveDocumentHandler = (e: MouseEvent) => {
        if(!instance.value || !thumb.value) return;
        if(cursorDown === false) return;

        const prevPage = thumbState.value[bar.value.axis];
        if(!prevPage) return;

        const offset = 
          (instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) *
          -1;
        const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
        const thumbPositionPercentage = 
          ((offset - thumbClickPosition) * 100 * offsetRatio.value) / 
          instance.value[bar.value.offset];
        scrollbar.wrapperElement[bar.value.scroll] = 
          (thumbPositionPercentage * scrollbar.wrapperElement[bar.value.scrollSize]) /
          100;
    };

    const mouseUpDocumentHandler = () => {
        cursorDown = false;
        thumbState.value[bar.value.axis] = 0;
        document.removeEventListener('mousemove', mouseMoveDocumentHandler);
        document.removeEventListener('mouseup', mouseUpDocumentHandler);
        restoreOnselectstart();
        if(cursorLeave) visible.value = false;
    };

    const mouseMoveBarHandler = () => {
        cursorLeave = false;
        visible.value = !!props.size;
    };

    const mouseLeaveBarHandler = () => {
        cursorLeave = true;
        visible.value = cursorDown;
    };

    onBeforeUnmount(() => {
        restoreOnselectstart();
        document.removeEventListener('mouseup', mouseUpDocumentHandler);
    });

    const restoreOnselectstart = () => {
        if(document.onselectstart !== originalOnSelectStart)
          document.onselectstart = originalOnSelectStart;
    };

    useEventListener(
        toRef(scrollbar, 'scrollviewElement'),
        'mousemove',
        mouseMoveBarHandler
    );
    useEventListener(
        toRef(scrollbar, 'scrollviewElement'),
        'mouseleave',
        mouseLeaveBarHandler
    );

    return {
        instance,
        thumb,
        bar,
        thumbStyle,
        visible,
        clickTrackHandler,
        clickThumbHandler
    };
  }
});
</script>