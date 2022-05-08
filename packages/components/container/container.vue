<template>
  <section :class="['hp-container', isVertical ? 'vertical' : 'horizontal']">
     <slot></slot> 
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import type { Component, VNode } from 'vue';

export default defineComponent({
    name: 'HContainer',
    props: {
        direction: String
    },
    
    setup(props, { slots }) {
      const isVertical = computed(() => {
        if(props.direction === 'vertical') return true;
        else if(props.direction === 'horizontal') return false;
        if(slots && slots.default) {
          const vNodes: VNode[] = slots.default();
          return vNodes.some((vNode) => {
            const tagName = (vNode.type as Component).name;
            return tagName === 'HHeader' || tagName === 'HFooter';
          });
        } else return false;
      });

      return {
        isVertical
      };
    }
});
</script>

<style>

</style>