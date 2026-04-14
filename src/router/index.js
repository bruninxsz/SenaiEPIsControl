//importando o Vue Roter
import {createRouter, createWebHistory} from 'vue-router';

//Importando os componentes das páginas
import Home from '../views/Homes.vue'
import Login from '../views/Login.vue'; 
import Activities from '../views/Activities.vue'; 
import EPIRegister from '../views/EPIRegister.vue'; 
import Inventory from '../views/Inventory.vue'; 
import Users from '../views/Users.vue'; 
import Cadastro from '../views/Cadastro.vue'


//Definindo as rotas
const routes = [
    {
        path:'/',                 // Rota para a página
        component: Home           // Apelido para chamar depois
    },

    {
        path:'/Login',
        component: Login
    },

    {
        path:'/Activities',
        component: Activities
    },

    {
        path:'/EPIRegister',
        component: EPIRegister
    },

    {
        path:'/Inventory',
        component: Inventory
    },

    {
        path:'/Users',
        component: Users
    },

    {
        path:'/Cadastro',
        component: Cadastro
    }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

export default router;