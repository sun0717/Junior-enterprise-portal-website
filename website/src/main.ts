import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router/index';
import VueScrollTo from 'vue-scrollto';
import pinia from './stores';
import '@/permission';

// import '@/mock/mockServer';
import '@/assets/style/common.css';
import '@/assets/font/iconfont';

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.use(mavonEditor);
app.use(VueScrollTo, {
    container: 'body',
    duration: 500,
    easing: 'ease',
    offset: 0,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
})
app.mount('#app');
