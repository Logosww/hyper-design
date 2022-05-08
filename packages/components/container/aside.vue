<template>
  <aside class="hp-aside" :style="style">
      <slot></slot>
  </aside>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import type { CSSProperties } from 'vue';

export default defineComponent({
    name: 'HAside',
    props: {
        width: String
    },

    setup(props) {
        const style = computed(() => {
            return (props.width ? {
                '--hp-aside-width': props.width
            } : {}) as CSSProperties;
        });

        return {
            style
        };
    }
});
</script>

<style>

</style>