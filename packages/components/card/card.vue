<template>
  <div :class="['hp-card', `shadow-${shadow}`]">
      <div v-if="header" class="hp-card-header">
        <slot name="header">{{ header }}</slot>
      </div>
      <div class="hp-card-body">
        <slot></slot>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { cardProps } from './card';

export default defineComponent({
  name: 'HCard',
  props: cardProps,
  setup(props, { slots }) {
    const header = slots.header || props.header;

    return { 
      header
    };
  }
});
</script>

<style>

</style>