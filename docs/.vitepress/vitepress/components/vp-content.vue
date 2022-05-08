<template>
    <main :class="{ 'page-content': true, 'has-sidebar': hasSidebar }">
        <!-- <VPNotFound v-if="isNotFound" /> -->
        <Home v-if="isHeroPost" />
        <VPDocContent v-else>
            <template #content-top><slot name="content-top" /></template>
            <template #content-bottom><slot name="content-bottom" /></template>
        </VPDocContent>   
    </main>
</template>
<script setup lang="ts">
import { computed, watch, nextTick, onUpdated, ref } from 'vue';
import { useData } from 'vitepress';
import { useSidebar } from '../composables';
import Home from './globals/home.vue';
import VPDocContent from './vp-doc-content.vue';
import nprogress from 'nprogress';
// import VPNotFound from './vp-not-found.vue';

const props = defineProps<{
    isSidebarOpen: boolean
}>();

const { frontmatter } = useData();
const { hasSidebar } = useSidebar();

const shouldUpdateProgress = ref(true);

const isHeroPost = computed(() => frontmatter.value.page === true);

watch(
    () => props.isSidebarOpen,
    val => {
        nextTick(() => shouldUpdateProgress.value = !val)
    }
);

onUpdated(() => {
    if(shouldUpdateProgress.value) nprogress.done();
})
</script>