<template>
    <h-row>
        <h-button type="primary" @click="regularMsg">显示 Message</h-button>
        <h-button @click="VNodeMsg">VNode Message</h-button>
    </h-row>
</template>
<script setup>
import { h } from 'vue';
import { HMessage } from 'hyperui';

const regularMsg = () => HMessage({
    content: '这是一条 Message 哦'
});

const VNodeMsg = () => HMessage(
    h(
        'div',
        null,
        '这是一条 VNode Message 哦，你可以加入任何魔法。'
    )
);
</script>