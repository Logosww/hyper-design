<template>
    <div class="navbar-wrapper">
        <div class="header-container">
            <div class="logo-container">
                <a :href="currentLink">
                    <img class="logo" src="../asset/icons/logo.png" />
                </a>
            </div>
            <div class="content">
                <!-- <VPNavbarSearch class="search" /> -->
                <VPNavbarMenu class="menu" />
                <VPNavbarRepo repo="https://github.com/Logosww/HyperUI" />
                <!-- <vp-navbar-hamburger /> -->
                <VPNavbarHamburger
                  :active="fullScreen"
                  class="hamburger"
                  @click="$emit('toggle')"
                 />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { inBrowser } from 'vitepress';
import { computed } from 'vue';
import VPNavbarMenu from './navbar/vp-menu.vue';
import VPNavbarRepo from './navbar/vp-repo.vue';
import VPNavbarHamburger from './navbar/vp-hamburger.vue';

defineProps<{
    fullScreen: boolean
}>();

defineEmits(['toggle']);

const currentLink = computed(() => {
    return '/zh-CN/';
})
</script>