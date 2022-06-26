import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

const app = createApp(App)
// kita gunakan router didalam app
app.use(router);
app.mount('#app');
