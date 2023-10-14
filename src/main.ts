import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createClient } from '@supabase/supabase-js';
import components from '@/components/UI';
import App from './App.vue'
import router from './router'
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const app = createApp(App)
components.forEach((component) => {
  app.component(component.name, component);
});
app.use(createPinia())
app.use(router) 

app.mount('#app')
