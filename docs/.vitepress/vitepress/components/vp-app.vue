<template>
    <div class="App">
        <VPOverlay class="overlay" :show="isSidebarOpen" @click="toggleSidebar(false)" />
        <VPNav />
        <VPSubNav v-if="hasSidebar" @open-menu="toggleSidebar(true)" />
        <VPSidebar :open="isSidebarOpen" @close="toggleSidebar(false)" />
        <VPContent :is-sidebar-open="isSidebarOpen" />
    </div>
</template>
<script setup lang="ts">
import VPNav from './vp-nav.vue';
import VPContent from './vp-content.vue';
import VPSidebar from './vp-sidebar.vue';
import VPSubNav from './vp-subnav.vue';
import VPOverlay from './vp-overlay.vue';
import { onMounted } from 'vue';
import { useLang, useSidebar, useToggleWidgets } from '../composables';
import { isClient, useToggle } from '@vueuse/core';
import nprogress from 'nprogress';
import { breakpoints } from '../constant';
// import { docRoot } from '../../utils/path';

// console.log(docRoot);

const lang = useLang();
const [isSidebarOpen, toggleSidebar] = useToggle(false);
const { hasSidebar } = useSidebar();

useToggleWidgets(isSidebarOpen, () => {
    if(!isClient) return;
    if(window.outerWidth >= breakpoints.lg) 
        toggleSidebar(false);
})

onMounted(async () => {
    if(!isClient) return;
    window.addEventListener(
        'click',
        e => {
            const link = (e.target as HTMLElement).closest('a');
            if(!link) return;

            const { protocol, hostname, pathname, target } = link;
            const currentUrl = window.location;
            const extMatch = pathname.match(/\.\w+$/);

            if(
                !e.ctrlKey &&
                !e.shiftKey &&
                !e.altKey &&
                !e.metaKey &&
                target !== '_blank' &&
                protocol === currentUrl.protocol &&
                hostname === currentUrl.hostname &&
                !(extMatch && extMatch[0] !== '.html')
            ) {
                e.preventDefault();
                if(pathname !== currentUrl.pathname) nprogress.start();
            }
        },
        { capture: true }
    );

    if(lang.value !== 'zh-CN') location.href = '/zh-CN/';
});
</script>
<style scoped>
.App {
    font-family: var(--hp-font-family);
}
</style>