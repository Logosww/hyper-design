<template>
    <h-row>
        <h-button @click="show">显示 Message</h-button>
        <h-button type="primary" @click="close">关闭当前 Message</h-button>
        <h-button type="danger" @click="closeAll">关闭所有 Message</h-button>
    </h-row>
</template>
<script setup>
import { HMessage } from 'hyperui';

let currentInstance;

const show = () => currentInstance = HMessage({
    content: '此条 Message 将显示 60 秒',
    duration: 60000
});

const close = () => currentInstance.close();

const closeAll = () => HMessage.closeAll();
</script>