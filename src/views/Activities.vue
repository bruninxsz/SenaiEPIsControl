<template>
    <div class="bg-gray-100">
        <h1 v-if="isAdmin" class="mx-auto text-center font-bold text-gray-600 p-16">Movimentações</h1>
        <h1 v-if="!isAdmin" class="mx-auto text-center font-bold text-gray-600 p-16">Suas Movimentações</h1>


        <table class="mx-auto w-[600px] border border-gray-400 z-20">
            <thead class="bg-gray-400">
                <tr>
                    <th class="py-2 px-8">Id</th>
                    <th class="py-2 px-8">Tipo</th>
                    <th class="py-2 px-8">Epi_id</th>
                    <th class="py-2 px-8">Usuário</th>
                    <th class="py-2 px-8">Data</th>
                </tr>
            </thead>

            <tbody class="bg-gray-200">
                <tr v-for="mov in movimentacoes" :key="mov.id" class="hover:bg-gray-100">

                    <td class="py-2 text-center">{{ mov.id }}</td>
                    <td class="py-2 text-center">{{mov.tipo}}</td>
                    <td class="py-2 text-center">{{mov.epi_id}}</td>
                    <td class="py-2 px-4 text-center">{{mov.usuario_nome}}</td>
                    <td class="py-2 text-center">{{mov.data}}</td>

                </tr>
            </tbody>
            
        </table>

    </div>

</template>


<script setup>

import { useRouter } from 'vue-router'
import { useSupabase } from '../composables/useSupabase'
const { supabase } = useSupabase()
import { ref, onMounted, computed } from 'vue'  //onMounted é utilizado para exibir os resultados assim que a página carregar

const movimentacoes = ref([])
const erro = ref('')
const user = ref(null)
const router = useRouter()
const isAdmin = computed(() => user.value?.classe === 'Administrador')


async function controleClasses(){

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
}

async function exibirMovimentacoes() {

    const { data, error } = await supabase
        .from('movimentacoes')
        .select('*')
        .order('data', { ascending: false })


    if (error) {
        erro.value = error.message
        console.log(`Error ${erro}`)            //Verificar se tem erro e exibir o erro no console
    }

    movimentacoes.value = data     //Se não deu erro, usuários recebe a resposta do supabase
}

onMounted(() => {
    exibirMovimentacoes()
    controleClasses()
})



</script>
