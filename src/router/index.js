//importando o Vue Roter
import {createRouter, createWebHistory} from 'vue-router';

//Importando os componentes das páginas
import Home from '../views/Homes.vue'
import Login from '../views/Login.vue'; 
import Activities from '../views/Activities.vue'; 
import EPIRegister from '../views/EPIRegister.vue'; 
import Inventory from '../views/Inventory.vue'; 
import Users from '../views/Users.vue'; 


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
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;