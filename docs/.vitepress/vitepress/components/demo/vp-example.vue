<template>
    <div class="example-showcase">
        <ClientOnly>
            <component :is="demo" v-if="demo" v-bind="$attrs" />
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    file: string,
    demo: object
}>();
</script>