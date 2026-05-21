<template>

     <aside class="flex flex-col bg-gray-500 px-4 text-white w-[200px] min-h-screen sticky bottom-0 top-0">

        <router-link to="/Dashboard/Inventory" class="mt-8 hover:font-bold">Estoque</router-link>

        <router-link v-if="isAdmin" to="/Dashboard/Cadastro" class="mt-8 hover:font-bold">Cadastro</router-link>

        <router-link to="/Dashboard/Activities" class="mt-8 hover:font-bold">Movimentações</router-link>

        <router-link v-if="isAdmin || isAlmoxarife" to="/Dashboard/EPIRegister" class="mt-8 hover:font-bold">Cadastrar EPI</router-link>

        <router-link v-if="isAdmin" to="/Dashboard/Users" class="mt-8 hover:font-bold">Usuários</router-link>

        <router-link v-if="isAdmin || isAlmoxarife" to="/Dashboard/Entrega" class="mt-8 hover:font-bold">Registrar Entrega</router-link>

        <router-link v-if="isAdmin || isAlmoxarife" to="/Dashboard/Devolucao" class="mt-8 hover:font-bold">Registrar Devolução</router-link>

     </aside>


</template>

<script setup>

import { useRouter } from 'vue-router'
import { useSupabase } from '../composables/useSupabase'
import { ref, computed, onMounted } from 'vue'    

const { supabase } = useSupabase()
const router = useRouter()
const user = ref(null)

const isAdmin = computed(() => user.value?.classe === 'Administrador')
const isAlmoxarife = computed(() => user.value?.clase === 'Almoxarife')
const isFuncionario = computed(() => user.value?.classe === 'Funcionario')
const isAluno = computed(() => user.value?.classe === 'Aluno')

onMounted(async () => {
    const { data:authData} = await supabase.auth.getUser()
    
    if(!authData?.user){
      router.push('/Login')
      return
    }

    const userId = authData.user.id

    const {data: userData, error} = await supabase
      .from('usuarios')
      .select('classe')
      .eq('id', userId)
      .single()

      

      if(error){
         console.error('Erro ao buscar dados do usuário:', error)
         return
      }

      user.value = userData
      
})


</script>
