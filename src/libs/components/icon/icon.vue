<template>
  <i :class="`my-icon-${name}`" :style="style"></i>
</template>

<script lang="ts">

import { defineComponent, computed } from 'vue';
import { iconProps } from './icon';
import type { CSSProperties } from 'vue';

export default defineComponent({
    name: 'MyIcon',
    props: iconProps,
    
    setup(props) {
        let sizes = {
            small: '12px',
            medium: '18px',
            large: '28px'
        }, size;
        const style = <CSSProperties>computed(() => {
            // console.log(props.size)
            if(!props.size && !props.color) return {};
            if(typeof props.size === 'string'){
                size = sizes[props.size];
            } else size = props.size + 'px';
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