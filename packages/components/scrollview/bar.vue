<template>
  <thumb :move="moveX" :ratio="ratioX" :size="width" :always="always" />
  <thumb :move="moveY" :ratio="ratioY" :size="height" :always="always" vertical />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { barProps } from './bar';
import Thumb from './thumb.vue';

export default defineComponent({
  props: barProps,
  components: { Thumb },
  setup(props) {
    const moveX = ref(0);
    const moveY = ref(0);
    const GAP = 4;

    const handleScroll = (wrapper: HTMLDivElement) => {
      if(wrapper) {
        const offsetHeight = wrapper.offsetHeight - GAP;
        const offsetWidth = wrapper.offsetWidth - GAP;

        moveX.value = ((wrapper.scrollLeft * 100) / offsetWidth) * props.ratioX;
        moveY.value = ((wrapper.scrollTop * 100) / offsetHeight) * props.ratioY;
      }
    }

    return {
      handleScroll,
      moveX,
      moveY
    }
  }
})
</script>