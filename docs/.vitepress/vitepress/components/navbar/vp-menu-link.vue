<template>
    <VPLink 
      :class="{ 
        'menu-link': true,
        active: isActiveLink(
          route,
          item.activeMatch || item.link,
          !!item.activeMatch
        ),
      }"
      :href="`/zh-CN${item.link}`"
      @click="onNavClick(item)"
      :no-icon="true"
    >
        {{ item.title }}
    </VPLink>
</template>

<script setup lang="ts">
import { useRoute } from 'vitepress';
import { useStorage } from '@vueuse/core';
import VPLink from '../common/vp-link.vue';
import { isActiveLink } from '../../utils';
import type { Link } from '../../types';
defineProps<{
    item: Link
}>();

const USER_VISITED_NEW_RESOURCE_PAGE = 'USER_VISITED_NEW_RESCOURCE_PAGE';

const route = useRoute();
const isVisited = useStorage<boolean | string>(
    USER_VISITED_NEW_RESOURCE_PAGE,
    false
);
const isNewPage = (item: Link) => item.activeMatch === '/some_fake_path/';

const onNavClick = (item: Link) => {
    if(isNewPage(item) && isVisited.value) isVisited.value = Date.now().toString(); 
};
</script>

<style lang="scss" scoped>
    .menu-link {
        display: block;
        padding: 0 12px;
        line-height: 52px;
        font-size: 15px;
        font-weight: 500;
        color: #122;
        transition: border-color .3s ease;
        border-bottom: 4px solid transparent;

        &:hover, &.active {
            color: var(--hp-color-primary);
            border-bottom-color: var(--hp-color-primary);
        }
    }
</style>