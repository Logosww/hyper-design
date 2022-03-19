<template>
  <span :class="['my-avatar', `size-${size}`, `shape-${shape}`]">
      <img 
        v-if="src && !loadError"
        :src="src"
        :alt="alt"
        :style="fitStyle"
        @error="handleError" 
      />
      <my-icon v-else-if="icon" :name="icon" :size="size"></my-icon>
      <slot v-else></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { avatarProps, avatarEmits } from './avatar';
import MyIcon from 'components/icon';
import type { CSSProperties } from 'vue';

export default defineComponent({
    name: 'MyAvatar',
    props: avatarProps,
    emits: avatarEmits,
    components: {
      MyIcon
    },

    setup(props, { emit }) {

      const loadError = ref(false);

      const sizeStyle = computed(() => {
        return typeof props.size === 'number'
          ? ({
            '--my-avatar-size': `${props.size}px`
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