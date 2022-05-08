<template>
  <header class="hp-header" :style="style">
      <slot></slot>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import type { CSSProperties } from 'vue';

export default defineComponent({
    name: 'HHeader',
    props: {
        height: String
    },

    setup(props) {
        const style = computed(() => {
            return (props.height ? {
                '--hp-header-height': props.height
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