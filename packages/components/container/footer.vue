<template>
    <footer class="hp-footer" :style="style">
        <slot></slot>
    </footer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import type { CSSProperties } from 'vue';

export default defineComponent({
    name: 'HFooter',
    props: {
        height: String
    },

    setup(props) {
        const style = computed(() => {
            return (props.height ? {
                '--hp-footer-height': props.height
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