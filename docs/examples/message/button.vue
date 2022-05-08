<template>
    <h-button @click="showMsg">显示 Message</h-button>
</template>
<script setup>
import { HMessage } from 'hyperui';

const showMsg = () => HMessage({
    type: 'success',
    content: '我踏马莱纳',
    button: '知道了',
    btnOnClick() {
        HMessage('OK')
    }
});
</script>