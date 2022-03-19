<template>
  <transition
    name="my-message"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div class="my-message" :style="style" v-show="visible">
      <div :class="`my-message-container-${type}`">
        <div class="my-message-content">
            <my-icon :name="type" :color="iconColor"></my-icon>
            {{ content }}
            <my-button v-if="button" type="text" :color="buttonColor || iconColor" @click="handleClick" style="padding: 0 0; font-size: 15px">{{ button }}</my-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { MyIcon } from "components/icon";
import { MyButton } from "components/button";
import { messageProps, messageEmits } from "./message";
import { useTimeoutFn } from "@vueuse/core";

import type { CSSProperties } from "vue";
export default defineComponent({
  name: "MyMessage",
  props: messageProps,
  emits: messageEmits,
  components: { MyIcon, MyButton },

  setup(props) {
    const visible = ref(false);
    const iconColorsMap = {
      error: "#ff5e57",
      info: "#3c6382",
      success: "#2cc46b",
      warn: "#ffa801",
    };

    let stopTimer: (() => void) | undefined = undefined; //两个timer为badge功能准备。

    const iconColor = computed(() => {
      return iconColorsMap[props.type];
    });

    const style = <CSSProperties>computed(() => ({
      top: `${props.offset}px`,
      zIndex: props.zIndex,
    }));

    const close = function () {
      visible.value = false;
    };

    const startTimer = (): void => {
      if (props.duration > 0) {
        ({ stop: stopTimer } = useTimeoutFn((): void => {
          if (visible.value) close();
        }, props.duration));
      }
    };

    // const clearTimer = (): void => {
    //   stopTimer?.();
    // };

    const handleClick = (): void => {
      props.btnOnClick();
      visible.value = false;
    }

    onMounted((): void => {
      startTimer();
      visible.value = true;
    });

    // watch(
    //   () => props.repeatNum,
    //   () => {
    //     clearTimer();
    //     startTimer();
    //   }
    // );

    return {
      visible,
      iconColor,
      style,
      close,
      handleClick,
      // clearTimer,
      // startTiemr
    };
  },
});
</script>