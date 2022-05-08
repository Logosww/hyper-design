<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition
      name="hp-dialog-fade"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <div
        class="hp-dialog-overlay"
        v-show="visible"
        @click.self="onModalClick"
        :style="{ zIndex: zIndex }"
      >
        <div class="hp-dialog-wrapper" :style="style">
          <div class="hp-dialog-container" ref="dialogRef">
            <div class="hp-dialog-header" :class="draggable ? 'hp-draggable' : ''" ref="headerRef">
              <slot name="title">
                <span class="hp-dialog-title">{{ title }}</span>
                <span class="hp-dialog-close" @click="handleClose">
                  <h-icon name="close"></h-icon>
                </span>
              </slot>
            </div>
            <div class="hp-dialog-main">
              <div class="hp-dialog-body" v-if="rendered">
                <slot></slot>
              </div>
              <div class="hp-dialog-footer" v-if="$slots.footer">
                <slot name="footer"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { dialogProps, dialogEmits } from "./dialog";
import { useDialog } from "./use-dialog";
import { HIcon } from "@hyper/components/icon";

export default defineComponent({
  name: "HDialog",
  props: dialogProps,
  emits: dialogEmits,
  components: { HIcon },

  setup(props, ctx) {
    const dialogRef = ref<HTMLElement>();
    const headerRef = ref<HTMLElement>();
    const draggable = ref<boolean>(props.draggable);
    const dialog = useDialog(props, ctx, dialogRef, headerRef, draggable);

    // const resetPos = useDraggable(dialogRef, headerRef, draggable);

    return {
      dialogRef,
      headerRef,
      ...dialog,
    };
  },
});
</script>