<template>
    <transition name="hp-fade-in" @enter="lock" @after-leave="cleanup">
        <div v-if="fullScreen" ref="fullscreen">
            <div class="full-screen-container">
                <nav class="full-screen-menu" v-if="navs">
                    <div class="full-screen-menu__item" v-for="(item, key) in navs" :key="key">
                        <VPLink
                          class="is-menu-link"
                          :href="`/zh-CN${item.link}`"
                          :no-icon="true"
                          @click="$emit('close')"
                        >
                            {{ item.title }}
                        </VPLink>
                    </div>
                </nav>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLockScreen, useNav } from '../composables';
import VPLink from './common/vp-link.vue';

defineProps<{
    fullScreen: boolean
}>();

defineEmits(['close']);

const { lock, cleanup } = useLockScreen();
const fullscreen = ref();
const navs = useNav();
// const themeEnabled
</script>