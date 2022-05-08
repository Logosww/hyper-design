<template>
    <aside v-if="hasSidebar" :class="{ sidebar: true, open }">
        <h-scrollview>
            <div class="sidebar-groups">
            <section v-for="(item, key) of sidebars" :key="key" class="sidebar-group">
                <p class="sidebar-group__title">{{ item.text }}</p>
                <VPSidebarLink
                  v-for="(child, childKey) in item.children"
                  :key="childKey"
                  :item="child"
                  @close="$emit('close')"
                 />
            </section>
        </div>
        </h-scrollview>
    </aside>
</template>
<script setup lang="ts">
import { useSidebar } from '../composables';
import VPSidebarLink from './sidebar/vp-sidebar-link.vue';

defineProps<{ open: boolean }>();
defineEmits(['close']);

const { sidebars, hasSidebar } = useSidebar();
</script>