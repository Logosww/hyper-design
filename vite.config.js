import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/libs'),
      'components': path.resolve(__dirname, 'src/libs/components'),
      'utils': path.resolve(__dirname, 'src/libs/utils'),
      'hooks': path.resolve(__dirname, 'src/libs/hooks'),
      'constants': path.resolve(__dirname, 'src/libs/contants'),
      'mixins': path.resolve(__dirname, 'src/mixins')
    },
    extensions: ['.ts', '.vue', 'js']
  }
})
