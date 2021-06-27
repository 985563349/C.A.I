import { createApp } from 'vue';
import router from '@/router';
import { store, key } from '@/store';
import App from '@/App.vue';
import naive from '@/plugins/naive';

createApp(App).use(router).use(store, key).use(naive).mount('#root');
