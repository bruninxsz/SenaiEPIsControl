import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index' //Importando o Vue Router
import Toast from "vue-toastification" //Toast notification - biblioteca de notificação do Vue
import "vue-toastification/dist/index.css"



const app = createApp(App)  
app.use(router)
app.mount('#app')
app.use(Toast)