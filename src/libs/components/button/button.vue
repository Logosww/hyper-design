<template>
    <button
        @click="handleClick"
        :style="buttonStyle"
        :class="['my-button', `size-${ size }`, `${ type }`, round ? 'round' : '', circle && icon ? 'circle' : '', plain ? 'plain' : '']"
    >
        <span>
            <my-icon v-if="icon" :size="iconSize" name="search" :style="iconStyle" ></my-icon>
            <slot v-if="!circle"></slot>
        </span>
    </button>
</template>

<script lang="ts">
import { MyIcon } from 'components/icon';
import { defineComponent, computed } from 'vue';
import { buttonEmits, buttonProps } from './button';
import { TinyColor } from '@ctrl/tinycolor';
import { useCssVar } from '@vueuse/core';

export default defineComponent({
    name: 'MyButton',
    components: { MyIcon },
    emits: buttonEmits,
    props: buttonProps,

    setup(props, { slots, emit }) {
        const iconStyle = computed(() => {
            const slotDefault = slots.default?.();
            if(slotDefault){
                let marginMap = {
                    small: '3px',
                    medium: '2px',
                    large: '2px'
                };
                return {marginRight: marginMap[props.size]};
            } else return {};
        });

        const iconSize = computed(() => {
            let sizeMap = {
                small: 12,
                medium: 16,
                large: 16
            };
            return sizeMap[props.size];
        });

        const typeColor = useCssVar(`--my-color-button-${props.type}`);

        const buttonStyle = computed(() => {
            let styles = {};
            const originBgColor = new TinyColor(props.color || typeColor.value);
            styles[`--my-color-button-${props.type}`] = originBgColor;
            const tintBgColor = originBgColor.tint(20).toString();
            const shadeBgColor = originBgColor.shade(10).toString();
            if(props.type !== 'default') styles[`--my-color-button-${props.type}-hover`] = tintBgColor;
            styles[`--my-color-button-active`] = shadeBgColor;
            if(props.color) {
                styles[`--my-color-button-${props.type}-hover`] = tintBgColor;
                styles['--my-color-button-text-custom'] = originBgColor.isLight() ? '#000' : '#fff';
            } else if(props.type === 'default'){
                styles['--my-color-button-border-default'] = '#5b5e63';
            }
            if(props.plain) {
                if(props.type !== 'default') {
                    styles['--my-color-button-plain'] = originBgColor.tint(90).toString();
                    styles['--my-color-button-plain-hover'] = originBgColor.toString();
                    styles['--my-color-button-plain-active'] = shadeBgColor;
                } else if(!props.color){
                    styles['--my-color-button-plain'] = '#fff';
                    styles['--my-color-text-plain'] = '#111';
                    styles['--my-color-button-plain-hover'] = 'var(--my-color-primary)'
                    styles['--my-color-button-plain-active'] = new TinyColor(useCssVar('--my-color-primary').value).shade(20).toString();
                } else {
                    styles['--my-color-button-plain'] = originBgColor.tint(90).toString();
                    styles['--my-color-text-plain'] = originBgColor.toString();
                    styles['--my-color-button-plain-custom-hover'] = originBgColor.toString();
                    styles['--my-color-button-plain-text-custom'] = originBgColor.isLight() ? '#000' : '#fff';
                    styles['--my-color-button-plain-custom-active'] = shadeBgColor;
                    styles['--my-color-button-plain-border-custom'] = shadeBgColor;
                }
                
            }
            styles['--my-color-text-active'] = shadeBgColor;
            return styles;
        });

        const handleClick = (event: MouseEvent) => {
            emit('click', event);
        };

        return {
            iconStyle,
            iconSize,
            buttonStyle,
            handleClick
        }
    }
});

</script>