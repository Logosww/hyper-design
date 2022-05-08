<template>
    <component 
      :is="href ? 'a' : 'span'"
      class="link-item"
      :href="href"
      :target="isExternal ? '_blank' : undefined"
      :rel="isExternal ? 'noopener noreference' : undefined" 
    >
        <slot />
        <h-icon v-if="isExternal && !noIcon" name="">
        </h-icon>
    </component>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    href?: string,
    noIcon?: boolean
}>();

const isExternal = computed(() => props.href && /^[a-z]+:/i.test(props.href));
</script>

<style scoped>
.link-item {
    display: flex;
    align-items: center;
    text-decoration: none;
}

[class*="hp-icon-"],
[class^="hp-icon-"] {
    margin-left: 4px;
}
</style>