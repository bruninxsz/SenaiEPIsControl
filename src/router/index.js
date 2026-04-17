//importando o Vue Roter
import { createRouter, createWebHistory } from 'vue-router';

//Importando os componentes das páginas
import Home from '../views/Homes.vue'
import Login from '../views/Login.vue';
import Activities from '../views/Activities.vue';
import EpiRegister from '../views/EPIRegister.vue';
import Inventory from '../views/Inventory.vue';
import Users from '../views/Users.vue';
import Cadastro from '../views/Cadastro.vue'
import Dashboard from '../views/Dashboard.vue'


//Definindo as rotas
const routes = [
    {
        path: '/',                 // Rota para a página
        component: Home           // Apelido para chamar depois
    },

    {
        path: '/login', 
        component: Login
    },

    {
        path: '/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
        children: [
            { path: 'inventory', component: Inventory },
            { path: 'cadastro', component: Cadastro },
            { path: 'activities', component: Activities },
            { path: 'epiregister', component: EpiRegister },
            { path: 'users', component: Users }
        ]
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