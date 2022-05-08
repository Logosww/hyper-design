<template>
    <a
      :class="{
          link: true,
          active: isActive(route, item.link),
          'flex items-center': item.promotion
      }"
      :href="item.link"
      @click="$emit('close')"
    >
        <p class="link-text">{{ item.text }}</p>
        <!-- <hp-tag></hp-tag> -->
    </a>
</template>
<script setup lang="ts">
import { useRoute } from 'vitepress';
import { isActive } from '../../utils';

import type { Link } from '../../types';

defineProps<{
    item: Link
}>();

const route = useRoute();
</script>
<style scoped lang="scss">
    .link:not(.flex) {
        display: block;
    }
    
    .link {
        padding: 10px 16px;
        line-height: 2;
        font-size: .9rem;
        border-radius: 10px;
        transition: background-color .3s ease;
        margin-bottom: 4px;

        .link-text {
            margin: 0;
            transition: all .25s ease;
            line-height: 24px;
            font-size: 15px;
            font-weight: 500;
            color: var(--hp-color-text);
        }

        &.active {
            background-color: rgba(129, 221, 203, .25);
            .link-text {
                font-weight: 600;
                font-size: 17px;
                color: var(--hp-color-primary);
            }
        }

        &:hover {
            background-color: rgba(129, 221, 203, .25);
            .link-text {
                color: var(--hp-color-primary);
            }
        }
    }
</style>