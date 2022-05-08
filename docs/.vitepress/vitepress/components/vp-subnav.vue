<template>
    <div class="sub-nav">
        <div class="sidebar-button">
            <!-- <h-icon name="hamburger" /> -->
            <h-button type="text" size="large" @click="$emit('open-menu')">Menu</h-button>
        </div>
        <!-- Back to top -->
    </div>
</template>

<script setup lang="ts">
import { useSidebar } from '../composables';

defineEmits(['open-menu']);

const { hasSidebar } = useSidebar();
</script>