<template>
    <transition name="hp-fade-in">
        <div v-if="show" />
    </transition>
</template>
<script setup lang="ts">
defineProps<{
    show: boolean
}>();
</script>