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

<style lang="scss">
.my-scrollbar__wrap {
  overflow: auto;
  height: 100%;
}
.my-popup-parent--hidden {
  overflow: hidden;
}
@keyframes my-overlay-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes my-overlay-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.my-draggable{
    cursor: move;
}
.my-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
}
.my-dialog-wrapper{
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   height: 20%;
//   width: 100%;
//   margin: auto;
}
.my-dialog-container {
//   position: absolute;
  //   left: 50%;
  //   top: 50%;
  //   transform: translate(-50%, -50%);
//   float: left;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
    0 9px 28px 8px #0000000d;
}
.my-dialog-header {
  padding: 15px 35px 0 25px;
  // width: 100%;
}

.my-dialog-main {
  padding: 15px 35px 20px 25px;
}

.my-dialog-title {
  line-height: 24px;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 10px;
}
.my-dialog-close {
  float: right;
}
.my-dialog-close > i {
  color: #4e4e4e;
  font-size: 15px;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: rgb(26, 188, 156);
  }
}
.my-dialog-body {
  margin-top: 10px;
  margin-left: 20px;
  min-width: 300px;
  max-width: 600px;
  word-break: break-all;
  color: #606266;
  margin-bottom: 17px;
}
.my-dialog-footer {
  text-align: right;
}

.my-dialog-fade-enter-active {
  animation: my-overlay-in 0.2s ease;
  .my-dialog-wrapper {
    animation: my-slide-up-in 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  }
}

.my-dialog-fade-leave-active {
  animation: my-overlay-out 0.2s ease;
  .my-dialog-wrapper {
    animation: my-slide-up-out 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }
}
@keyframes my-slide-up-in {
  0% {
    opacity: 0;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.8);
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
}
@-webkit-keyframes my-slide-up-in {
  0% {
    opacity: 0;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.8);
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
}
@-webkit-keyframes my-slide-up-out {
  0% {
    opacity: 1;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
  to {
    opacity: 0;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.8);
    transform: scaleY(0.8);
  }
}
@keyframes my-slide-up-out {
  0% {
    opacity: 1;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
  to {
    opacity: 0;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.8);
    transform: scaleY(0.8);
  }
}
/* @-webkit-keyframes antSlideDownIn{0%{opacity:0;-webkit-transform-origin:100% 100%;transform-origin:100% 100%;-webkit-transform:scaleY(.8);transform:scaleY(.8)}to{opacity:1;-webkit-transform-origin:100% 100%;transform-origin:100% 100%;-webkit-transform:scaleY(1);transform:scaleY(1)}}
    @keyframes antSlideDownIn{0%{opacity:0;-webkit-transform-origin:100% 100%;transform-origin:100% 100%;-webkit-transform:scaleY(.8);transform:scaleY(.8)}to{opacity:1;-webkit-transform-origin:100% 100%;transform-origin:100% 100%;-webkit-transform:scaleY(1);transform:scaleY(1)}}
    @-webkit-keyframes antSlideDownOut{0%{opacity:1;-webkit-transform-origin:100% 100%;transform-origin:100% 100%;-webkit-transform:scaleY(1);transform:scaleY(1)}to{opacity:0;-webkit-transform-origin:100% 100%;transform-origin:100% 100%;-webkit-transform:scaleY(.8);transform:scaleY(.8)}}
    @keyframes antSlideDownOut{0%{opacity:1;-webkit-transform-origin:100% 100%;transform-origin:100% 100%;-webkit-transform:scaleY(1);transform:scaleY(1)}to{opacity:0;-webkit-transform-origin:100% 100%;transform-origin:100% 100%;-webkit-transform:scaleY(.8);transform:scaleY(.8)}}
    @-webkit-keyframes antSlideLeftIn{0%{opacity:0;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.8);transform:scaleX(.8)}to{opacity:1;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(1);transform:scaleX(1)}} */
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>