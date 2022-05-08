<template>
    <h-row>
        <h-button type="primary" @click="CompositionMsg">Vue 3 Composition API</h-button>
        <h-button @click="OptionsMsg">Vue 2 Options API</h-button>
    </h-row>
</template>
<script>
import { defineComponent } from 'vue';
import { HMessage } from 'hyperui';
export default defineComponent({
    setup() {
        const CompositionMsg = () => HMessage('这是一条消息');

        return { CompositionMsg };
    },
    methods: {
        OptionsMsg() {
            // 我们假设你已经全局完整引入了 Hyper UI
            this.$message('这是另一条消息');
        }
    }
});
</script>