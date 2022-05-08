<template>
  <a
    :class="[
      'hp-link',
      `${type}`,
      underline ? 'underline' : '',
      linkDisabled ? 'disabled' : '',
    ]"
    :style="style"
    :href="linkDisabled || !href ? undefined : href"
    target="_blank"
    @click="handleClick"
  >
    <h-icon v-if="icon" :name="icon"></h-icon>
    <span>
      <slot></slot>
    </span>
  </a>
</template>

<script lang="ts">
import { HIcon } from "@hyper/components/icon";
import { linkProps, linkEmits } from "./link";
import { defineComponent, computed } from "vue";
import { TinyColor } from '@ctrl/tinycolor';
import { useDisabled } from '@hyper/hooks';
import type { CSSProperties } from 'vue';

export default defineComponent({
  name: "HLink",
  components: { HIcon },
  props: linkProps,
  emits: linkEmits,

  setup(props, { emit }) {

    const linkDisabled = useDisabled();

    const handleClick = (e: MouseEvent) => {
      if (!linkDisabled.value) emit("click", e);
    };

    const style = computed(() => {
        let style = {};
        if(props.color) {
            const customColor = new TinyColor(props.color);
            const customHoverColor = customColor.tint(30).toString();
            if(linkDisabled.value) {
              style['--hp-color-link-disabled'] = customHoverColor;
            } else {
              style['--hp-color-link-custom'] = customColor.toString();
              style['--hp-color-link-custom-hover'] = customHoverColor;
            }
        }
        return style as CSSProperties;
    })

    return {
      linkDisabled,
      handleClick,
      style
    };
  },
});
</script>

<style>
</style>