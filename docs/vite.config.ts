import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
// import { projRoot } from './.vitepress/utils/path';
import { MarkdownTransform } from './.vitepress/plugins/md-transform';
// console.log(projRoot)
export default defineConfig({
    plugins: [vueJsx(), MarkdownTransform()],
    server: {
        fs: {
            // allow: [projRoot]
        }
    }
});

// export * as paths from './.vitepress/utils/path';