<template>
    <ClientOnly>
        <p text="sm" v-html="decodedDescription" />

        <div class="example">
            <Example :file="path" :demo="formatPathDemos[path]" />
            <div class="op-btns">
                <h-icon 
                    class="op-btn" 
                    name="copy" 
                    :size="20" 
                    @click="copyCode(decodeURIComponent(rawSource))"
                    @mouseover="e => triggerTip(e, '复制代码')" />
                <h-icon 
                    class="op-btn" 
                    name="code" 
                    :color="sourceVisible ? 'var(--hp-color-primary)' : ''"
                    :size="20" 
                    @click="toggleSourceVisible"
                    @mouseover="e => triggerTip(e, sourceVisible ? '收起代码' : '显示代码')" />
                <h-tooltip :content="tipContent" :virtual-ref="tipTriggerRef" virtual-trigger />
            </div>
            <h-collapse-transition>
                <SourceCode v-show="sourceVisible" :source="source" />
            </h-collapse-transition>
        </div>
    </ClientOnly>
</template>
<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import { computed, ref } from 'vue';
import { useCopy } from '../composables';
// import { useSourceCode } from '../composables';

import Example from './demo/vp-example.vue';
import SourceCode from './demo/vp-source-code.vue';

const props = defineProps<{
    demos: object,
    source: string,
    path: string,
    rawSource: string,
    description?: string
}>();

const [sourceVisible, toggleSourceVisible] = useToggle();
const lang = 'zh-CN';
// const demoSourceUrl = useSourceCode(toRef(props, 'path'));

const tipTriggerRef = ref<HTMLElement>();
const tipContent = ref<string>('');

const triggerTip = (e: Event, content: string) => {
    tipTriggerRef.value = e.currentTarget;
    tipContent.value = content;
}

const formatPathDemos = computed(() => {
    const demos = {};
                                 
    Object.keys(props.demos).forEach(key => {
        demos[key.replace('../../examples/', '').replace('.vue', '')] = 
          props.demos[key].default;
    });

    return demos;
});

const decodedDescription = computed(() => decodeURIComponent(props.description!));

const copyCode = (code: string) => useCopy(code);
</script>