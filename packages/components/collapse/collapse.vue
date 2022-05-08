<template>
    <div class="hp-collapse" role="tablist" aria-multiselectable="true">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { collapseProps, collapseEmits } from './collapse';
import { ensureArray } from '@hyper/utils';

export default defineComponent({
   name: 'HCollapse',
   props: collapseProps,
   emits: collapseEmits,

   setup(props, { slots }) {
       const activeNames = ref(ensureArray(props.modelValue));

       const setActiveNames = (_activeNames: CollapseActiveName[]) => {
           activeNames.value = _activeNames;
           const value = props.accordion
       }
   }
});
</script>