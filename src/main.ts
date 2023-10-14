import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createClient } from '@supabase/supabase-js';
import components from '@/components/UI';
import App from './App.vue'
import router from './router'
const supabase = createClient(
  import.meta.env.VITE_VUE_APP_SUPABASE_URL as string,
  import.meta.env.VITE_VUE_APP_SUPABASE_KEY as string
);

const app = createApp(App)
components.forEach((component) => {
  app.component(component.name, component);
});
app.use(createPinia())
app.use(router) 

app.mount('#app')
