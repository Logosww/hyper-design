<template>
    <header :class="{ navbar: true }">
        <VPNavBar :full-screen="isFullScreen" @toggle="toggleFullScreen" />
        <VPNavBarFull :full-screen="isFullScreen" class="full-screen" @close="close" />
    </header>
</template>
<script setup lang="ts">
import VPNavBar from './vp-navbar.vue';
import VPNavBarFull from './vp-nav-full.vue';
import { useFullScreen, useToggleWidgets } from '../composables';
import { isClient } from '@vueuse/core';
import { breakpoints } from '../constant';

const { toggleFullScreen, isFullScreen } = useFullScreen();
const close = () => toggleFullScreen(false);

useToggleWidgets(isFullScreen, () => {
    if(!isClient) return;
    if(window.outerWidth >= breakpoints.md) close();
});

</script>