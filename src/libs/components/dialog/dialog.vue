<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition
      name="my-dialog-fade"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <div
        class="my-dialog-overlay"
        v-show="visible"
        @click.self="closeOnModalClick"
        :style="{ zIndex: zIndex }"
      >
        <div class="my-dialog-wrapper">
          <div class="my-dialog-container" :style="style" ref="dialogRef">
            <div class="my-dialog-header" :class="draggable ? 'my-draggable' : ''" ref="headerRef">
              <slot name="title">
                <span class="my-dialog-title">{{ title }}</span>
                <span class="my-dialog-close" @click="handleClose">
                  <my-icon name="close"></my-icon>
                </span>
              </slot>
            </div>
            <div class="my-dialog-main">
              <div class="my-dialog-body" v-if="rendered">
                <slot></slot>
              </div>
              <div class="my-dialog-footer" v-if="$slots.footer">
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
import { MyIcon } from "components/icon";

export default defineComponent({
  name: "myDialog",
  props: dialogProps,
  emits: dialogEmits,
  components: { MyIcon },

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