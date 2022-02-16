import { createApp } from 'vue';
import App from './App';
import MyUI from '@/MyUI/full-import';
// import MyIcon from 'components/icon';

createApp(App).use(MyUI).mount('#app');
