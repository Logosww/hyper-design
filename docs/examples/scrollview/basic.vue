<template>
    <h-button type="primary" @click="num++">增加高度</h-button>
    <h-scrollview height="200px" max-height="300px" view-style="text-align: center">
        <div v-for="item in num" :key="item">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br>
            Vel minima labore voluptatum tempora ipsa voluptas quam, <br>
            expedita aut numquam voluptatem dolores ad facilis, <br>
            totam at maiores ratione corporis dolorum aliquid?<br>
        </div>
    </h-scrollview>
</template>
<script setup>
import { ref } from 'vue';
const num = ref(3);
</script>