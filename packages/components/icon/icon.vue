<template>
  <i :class="`hp-icon-${name}`" :style="style"></i>
</template>

<script lang="ts">

import { defineComponent, computed } from 'vue';
import { iconProps } from './icon';
import { addUnit } from '@hyper/utils';
import { isNumber } from '@vueuse/core';
import type { CSSProperties } from 'vue';

export default defineComponent({
    name: 'HIcon',
    props: iconProps,
    
    setup(props) {
        const SIZE_MAP = {
            small: '12px',
            medium: '18px',
            large: '28px'
        };
        let size;
        const style = <CSSProperties>computed(() => {
            // console.log(props.size)
            if(!props.size && !props.color) return {};
            if(isNumber(props.size)) size = addUnit(props.size);
            else size = SIZE_MAP[props.size];
            return {
                fontSize: size,
                color: props.color
            }
        });

        return {
            style
        };
    }
});


</script>

<style>

</style>