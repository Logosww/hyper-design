<template>
    <nav v-if="navs" class="navbar-menu">
        <VPMenuLink v-for="(item, key) in navs" :key="key" :item="item" />
    </nav>
</template>
<script setup lang="ts">
import { useNav } from '../../composables';
import VPMenuLink from './vp-menu-link.vue';

const navs = useNav();
</script>