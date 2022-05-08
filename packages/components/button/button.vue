<template>
  <button
    @click="handleClick"
    :style="buttonStyle"
    :class="[
      'hp-button',
      `size-${size}`,
      `${type}`,
      round ? 'round' : '',
      circle && icon ? 'circle' : '',
      plain ? 'plain' : '',
      disabled ? 'disabled' : ''
    ]"
    :disabled = "buttonDisabled"
  >
    <span 
      :class="shouldAddSpace ? 'text-expand' : ''"
    >
      <h-icon
        v-if="icon"
        :size="iconSize"
        :name="icon"
        :style="iconStyle"
      ></h-icon>
      <slot v-if="!circle"></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { HIcon } from "@hyper/components/icon";
import { defineComponent, computed, inject } from "vue";
import { buttonEmits, buttonProps } from "./button";
import { TinyColor } from "@ctrl/tinycolor";
import { useCssVar, isNumber } from "@vueuse/core";
import { useDisabled } from '@hyper/hooks';
import { addUnit } from '@hyper/utils';

export default defineComponent({
  name: "HButton",
  components: { HIcon },
  emits: buttonEmits,
  props: buttonProps,

  setup(props, { slots, emit }) {
    const MARGIN_MAP = {
          small: '5px',
          medium: '4px',
          large: '3px',
        }, SIZE_MAP = {
        small: 12,
        medium: 16,
        large: 16,
      }, CIRCLE_SIZE_MAP = {
        small: '32px',
        medium: '40px',
        large: '46px'
      };

    // const globalConfig = useGlobalConfig('button');

    const iconStyle = computed(() => {
      const slotDefault = slots.default?.();
      if (slotDefault) {
        return { marginRight: MARGIN_MAP[props.size] };
      } else return {};
    });

    const iconSize = computed(() => {
      return SIZE_MAP[props.size];
    });

    const buttonDisabled = useDisabled();

    const typeColor = useCssVar(`--hp-color-button-${props.type}`);

    const buttonStyle = computed(() => {
      let styles = {};
      const originBgColor = new TinyColor(props.color || typeColor.value);
      const tintBgColor = originBgColor.tint(20).toString();
      const shadeBgColor = originBgColor.shade(10).toString();
      if (props.color) {
        styles[`--hp-color-button-${props.type}`] = originBgColor;
        if(props.plain) {
          styles["--hp-color-button-plain-custom"] = originBgColor.tint(90).toString();
          styles["--hp-color-button-text-plain-custom"] = originBgColor.toString();
          styles["--hp-color-button-plain-custom-hover"] =
            originBgColor.toString();
          styles["--hp-color-button-text-plain-custom-hover"] =
            originBgColor.isLight() ? "#000" : "#fff";
          styles["--hp-color-button-plain-custom-active"] = shadeBgColor;
          styles["--hp-color-button-plain-border-custom"] = shadeBgColor;
        } else {
          styles[`--hp-color-button-${props.type}-hover`] = tintBgColor;
          styles[`--hp-color-button-${props.type}-active`] = shadeBgColor;
          styles["--hp-color-button-text-custom"] = originBgColor.isLight()
            ? "#000"
            : "#fff";
        }

        if(buttonDisabled.value) {
          const disabledButtonColor = new TinyColor(originBgColor).tint(50).toString();
          styles['--hp-color-button-custom-disabled'] = disabledButtonColor;
          styles['--hp-color-button-border-custom-disabled'] = disabledButtonColor;
          styles['--hp-color-button-text-custom'] = '#fff';
        }
      }
      if(props.type === 'text' && props.color) styles["--hp-color-text-active"] = shadeBgColor;
      
      if(props.circle && props.icon) {
        if(isNumber(props.size)) styles.width = styles.height = addUnit(props.size);
        else styles.width = styles.height = CIRCLE_SIZE_MAP[props.size];
      }

      return styles;
    });

    const autoAddSpace = computed(() => 
      // props.addSpace ?? globalConfig.value?.autoAddSpace ?? false
      inject('autoAddSpace', false)
    );

    const shouldAddSpace = computed(() => {
      const defaultSlot = slots.default?.();
      if(autoAddSpace.value && defaultSlot?.length === 1) {
        const slot = defaultSlot[0];
        // if(slot?.type === Text) {   //slot.type: Symbol(Text)
          const text = slot.children as string;
          return /^\p{Unified_Ideograph}{2}$/u.test(text.trim());
        // }
      }
      return false;
    });

    const handleClick = (event: MouseEvent) => {
      emit("click", event);
    };

    return {
      iconStyle,
      iconSize,
      buttonStyle,
      buttonDisabled,
      handleClick,
      shouldAddSpace
    };
  },
});
</script>