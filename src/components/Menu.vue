<template>

     <aside class="flex flex-col bg-gray-500 px-4 text-white w-[200px] h-screen">

        <router-link to="/Dashboard/Inventory" class="mt-8 hover:font-bold">Estoque</router-link>

        <router-link to="/Dashboard/Cadastro" class="mt-8 hover:font-bold">Cadastro</router-link>

        <router-link to="/Dashboard/Activities" class="mt-6 hover:font-bold">Movimentações</router-link>

        <router-link to="/Dashboard/EPIRegister" class="mt-8 hover:font-bold">Realizar entrega</router-link>

        <router-link to="/Dashboard/Users" class="mt-8 hover:font-bold">Usuários</router-link>

        <button @click="Sair" class="my-8 font-medium hover:font-bold text-left">
         
         Sair da Conta

        </button>
     </aside>


</template>

<script setup>

import { useRouter } from 'vue-router'
import { useSupabase } from '../composables/useSupabase'    

const { supabase } = useSupabase()
const router = useRouter()

async function Sair(){      

   try{
      await supabase.auth.signOut()    //Função do supabase para deslogar
      router.push('/Login')
   }
   catch(err){
         console.error('Erro ao fazer logout:', err)        //Validação
   }
}


</script>
