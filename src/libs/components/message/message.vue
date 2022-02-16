<template>
  <transition
    name="my-message"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      class="my-message"
      :style="style"
      v-show="visible"
    >
      <div :class="`my-message-container-${type}`">
        <div class="my-message-content">
          <span>
            <!-- <i :class="[`my-icon-${params.type}`, `my-message-${params.type}`]"></i> -->
            <my-icon :name="type" :color="iconColor"></my-icon>
          </span>
          <span>
            {{ content }}
          </span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { MyIcon } from "components/icon";
import { messageProps, messageEmits } from "./message";
import { useTimeoutFn } from "@vueuse/core";

import type { CSSProperties } from "vue";
export default defineComponent({
  name: "MyMessage",
  props: messageProps,
  emits: messageEmits,
  components: { MyIcon },

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
      // clearTimer,
      // startTiemr
    };
  },
});
</script>

<style lang="scss">
.my-message {
  position: fixed;
  width: 100%;
  text-align: center;
  transition: top 0.8s cubic-bezier(0.17, 0.84, 0.44, 1);
  transform-origin: 50% 0;
}
[class*="my-message-container-"],
[class^="my-message-container-"] {
  display: inline-block;
  padding: 10px 16px 8px 16px;
  border-radius: 16px;
}
.my-message-container-info {
  box-shadow: 0 5px 3px #dce5ee, 0 4px 2px #dce5ee, 0 9px 28px #dce5ee;
  background-color: #eef7ff;
  & span:nth-of-type(2) {
    color: #3c6382;
  }
}
.my-message-container-success {
  box-shadow: 0 5px 3px #d7f5e3, 0 4px 2px #d7f5e3, 0 9px 28px #d7f5e3;
  background-color: #e3ffea;
  & span:nth-of-type(2) {
    color: #2cc46b;
  }
}
.my-message-container-error {
  box-shadow: 0 5px 3px #ffdede, 0 4px 2px #ffdede, 0 9px 28px #ffdede;
  background-color: #ffefec;
  & span:nth-of-type(2) {
    color: #ff5e57;
  }
}
.my-message-container-warn {
  box-shadow: 0 5px 3px #ffe9be, 0 4px 2px #ffe9be, 0 9px 28px #ffe9be;
  background-color: #fff2da;
  & span:nth-of-type(2) {
    color: #ffa801;
  }
}
.my-message-content {
  font-size: 15px;
  color: #000000d9;
  line-height: 1.5715;
  display: flex;
  align-items: center;

  & i {
    font-size: 19px;
    margin-right: 8px;
  }
}
.my-message-enter-active {
  animation: my-message-enter 0.6s cubic-bezier(0.2, 0.89, 0.32, 1.4);
}
.my-message-leave-active {
  animation: my-message-leave 0.5s ease;
}
.my-message-leave-to {
  opacity: 0;
}
@keyframes my-message-enter {
  0% {
    transform: scaleX(0.4) scaleY(0.5) rotateX(150deg);
    opacity: 0;
  }
  to {
    transform: scaleX(1) scaleY(1) rotateX(0);
    opacity: 1;
  }
}
@keyframes my-message-leave {
  0% {
    transform: scaleX(1) scaleY(1) rotateX(0);
    opacity: 1;
  }
  to {
    transform: scaleX(0.4) scaleY(0.5) rotateX(150deg);
    opacity: 0;
  }
}
</style>