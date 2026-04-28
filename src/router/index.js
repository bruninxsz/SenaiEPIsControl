//importando o Vue Roter
import { createRouter, createWebHistory } from 'vue-router';
import { useSupabase } from '../composables/useSupabase'

const { supabase } = useSupabase()

//Importando os componentes das páginas
import Home from '../views/Homes.vue'
import Login from '../views/Login.vue';
import Activities from '../views/Activities.vue';
import EpiRegister from '../views/EPIRegister.vue';
import Inventory from '../views/Inventory.vue';
import Users from '../views/Users.vue';
import Cadastro from '../views/Cadastro.vue'
import Dashboard from '../views/Dashboard.vue'
import Entrega from '../views/Entrega.vue'
import Devolucao from '../views/Devolucao.vue'


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
            { path: 'users', component: Users },
            { path: 'entrega', component: Entrega },
            { path: 'devolucao', component: Devolucao }
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

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.meta.requiresAuth

    const { data } = await supabase.auth.getUser()    //Função Supabase para pegar informações do usuário logado
    const user = data.user

    if (requiresAuth && !user) {
        next('/login') // Se o supabase reponder que 'user=null', o código redireciona para a página login
    } else {
        next() //  Se o supabase responder com qualquer usuário, o código direciona para a página desejada
    }
})

export default router;