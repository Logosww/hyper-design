<template>
    <div style="text-align: right">
        <ul class="demo-icon-list">
            <li 
              v-for="comp in icons"
              :key="comp"
              @click="copyName(comp)"
              class="icon-item"
            >
                <span class="demo-icon">
                    <h-icon :name="comp" :size="28" />
                    <span class="icon-name">{{ comp }}</span>
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useCopy } from '../../composables';

const icons = [
  'search',
  'success',
  'error',
  'info',
  'warn',
  'question',
  'code',
  'copy'
]

const copyName = (content: string) => useCopy(content);

</script>

<style scoped lang="scss">
.demo-icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0 !important;
  border-top: 1px solid #dcdfe6;
  border-left: 1px solid #dcdfe6;
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  .icon-item {
    text-align: center;
    color: var(--hp-text-color);
    height: 90px;
    font-size: 13px;
    border-right: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    transition: background-color .3s ease;
    &:hover {
      background-color: rgba(220, 223, 230, .4);
      color: var(--hp-color-primary);
    }

    .demo-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      cursor: pointer;

      .icon-name {
        // margin-top: 2px;
      }
    }
  }
}  
</style>