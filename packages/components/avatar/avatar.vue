<template>
  <span :class="['hp-avatar', `size-${size}`, `shape-${shape}`]">
      <img 
        v-if="src && !loadError"
        :src="src"
        :alt="alt"
        :style="fitStyle"
        @error="handleError" 
      />
      <h-icon v-else-if="icon" :name="icon" :size="size"></h-icon>
      <slot v-else></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { avatarProps, avatarEmits } from './avatar';
import HIcon from '@hyper/components/icon';
import type { CSSProperties } from 'vue';

export default defineComponent({
    name: 'HAvatar',
    props: avatarProps,
    emits: avatarEmits,
    components: {
      HIcon
    },

    setup(props, { emit }) {

      const loadError = ref(false);

      const sizeStyle = computed(() => {
        return typeof props.size === 'number'
          ? ({
            '--hp-avatar-size': `${props.size}px`
          } as CSSProperties)
          : undefined;
      });

      const fitStyle = <CSSProperties>computed(() => ({
        objectFit: props.fit
      }));

      watch(
        () => props.src,
        () => (loadError.value = false)
      );

      const handleError = (e: Event) => {
        loadError.value = true,
        emit('error', e);
      };

      return {
        loadError,
        sizeStyle,
        fitStyle,
        handleError
      }
    }
});
</script>

<style>

</style>