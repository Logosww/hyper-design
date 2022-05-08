<template>
    <h-button type="primary" @click="dialogVisible = true">打开 Dialog</h-button>
    <h-dialog v-model="dialogVisible" :width="350">
        你确定这样做吗？
        <template #footer>
            <h-button type="primary" @click="dialogVisible = false">确定</h-button>
            <h-button @click="dialogVisible = false">取消</h-button>
        </template>
    </h-dialog>
</template>
<script setup>
import { ref } from 'vue';
const dialogVisible = ref(false);
</script>