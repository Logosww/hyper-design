<template>
    <h-button type="primary" @click="dialogVis0 = true">打开 Dialog</h-button>
    <h-dialog v-model="dialogVis0">
        这是一个 Dialog 窗口。
        <template #footer>
            <h-button @click="dialogVis1 = true">打开嵌套 Dialog</h-button>
        </template>
        
        <h-dialog v-model="dialogVis1">
            这是另一个 Dialog 窗口。
            <template #footer>
                <h-button type="primary" @click="dialogVis1 = false">确定</h-button>
            </template>
        </h-dialog>
    </h-dialog>
</template>
<script setup>
import { ref } from 'vue';
const dialogVis0 = ref(false);
const dialogVis1 = ref(false);
</script>