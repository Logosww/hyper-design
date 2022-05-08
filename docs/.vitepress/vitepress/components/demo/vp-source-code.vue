<template>
    <div class="example-source-wrappper">
        <div class="expamle-source language-vue" v-html="decoded"></div>
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    source: string
}>();

const decoded = computed(() => decodeURIComponent(props.source));
</script>