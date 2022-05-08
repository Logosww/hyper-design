<template>
  <div class="countdown">
    <h2>Nov 28, 2022, 11 AM GMT+8</h2>
    <div class="time">
      <div>
        <span>{{day}}</span>
        <div class="unit">DAYS</div>
      </div>
      <div>
        <span>{{hour}}</span>
        <div class="unit">HOURS</div>
      </div>
      <div>
        <span>{{minute}}</span>
        <div class="unit">MINUTES</div>
      </div>
      <div>
        <span>{{second}}</span>
        <div class="unit">SECONDS</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";

const deadline = ref(new Date('2022-11-28 00:00')), now = ref();
const remainingTime = computed(() => deadline.value - now.value)
const second = computed(() => Math.floor(remainingTime.value / 1000 % 60));
const minute = computed(() => Math.floor(remainingTime.value / 1000 / 60 % 60));
const hour = computed(() => Math.floor(remainingTime.value / 1000 / 60 / 60 % 24));
const day = computed(() => Math.floor(remainingTime.value / 1000 / 60 / 60 / 24));
const countdown = () => {
    now.value = new Date();
    setTimeout(countdown, 1000);
};
onMounted(() => countdown());
</script>