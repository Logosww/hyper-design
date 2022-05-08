<template>
    <h-row>
       <h-button @click="showMsg0('success')">success</h-button> 
       <h-button @click="showMsg0('error')">error</h-button> 
       <h-button @click="showMsg0('warn')">warn</h-button> 
       <h-button @click="showMsg1('info')">info</h-button> 
    </h-row>
</template>
<script setup>
import { HMessage } from 'hyperui';

const showMsg0 = (type) => HMessage({
    type,
    content: `这是一条 ${type} 类型的 Message 哦`
});

const showMsg1 = () => HMessage.info(
    '这是一条 info 类型的 Message 哦'
);
</script>