<template>
    <button
        @click="handleClick"
        :class="['my-button', `btn-size-${ size }`, `btn-${ type }`, round ? 'btn-round' : '', circle && icon ? 'btn-circle' : '']"
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


        const handleClick = (event: MouseEvent) => {
            emit('click', event);
        };

        return {
            iconStyle,
            iconSize,
            handleClick
        }
    }
});

</script>

<style lang="scss">
    *{
        user-select: none;
    }
    .my-button{
        display: inline-block;
        -webkit-appearance: none;
        outline: none;
        border: none;
        cursor: pointer;
        border-radius: 8px;
        transition: all .3s ease;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: 500;
        padding: 12px 19px;
        color: #606266;
        margin-left: 10px;

        &.my-button:hover{
            background-color: rgb(218, 216, 216);
        }
        &.btn-default{
            color: #606266;
        }

        &.btn-default:hover{
            background-color: rgb(218, 216, 216);
        }

        &.btn-primary{
            background-color: #1abc9c;
            color: #fff;
        }

        &.btn-primary:hover{
            background-color: #3adbbb;
        }

        &.btn-warn{
            background-color: #ffba3b;
            color: #fff;
        }

        &.btn-warn:hover{
            background-color: #e99c29;
        }

        &.btn-danger{
            background-color: #ff7a73;
            color: #fff;
        }

        &.btn-text{
            background-color: transparent !important;
            padding: none !important;
        }

        &.btn-danger:hover{
            background-color: #eb4940;
        }

        &.btn-size-large{
            padding: 12px 19px;
        }

        &.btn-size-small{
            font-size: 12px;
            padding: 9px 12px;
        }

        &.btn-size-medium{
            padding: 9px 13px;
        }

        &.btn-round{
            border-radius: 20px;
        }

        &.btn-circle{
            border-radius: 50%;
            padding: 12px;
        }
    }


</style>