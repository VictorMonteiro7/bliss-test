import { createApp } from 'vue'
import FloatingVue from 'floating-vue'
import App from './App.vue'
import { router } from './routes';
import { store } from './store';
import './style.css'
import './assets/scss/variables.scss';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'floating-vue/dist/style.css'
const app = createApp(App);

app.use(router);
app.use(store);
app.use(FloatingVue);
app.mount('#app');
