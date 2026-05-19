<template>
    <div class="bg-gray-100">
        <h1 class="mx-auto text-center font-bold text-gray-600 p-16">Estoque</h1>

        <table class="mx-auto w-[600px] border border-gray-400 z-20">
            <thead class="bg-gray-400">
                <tr>
                    <th class="p-2">Id Epi</th>
                    <th class="p-2">Tipo Epi</th>
                    <th class="p-2">Vencimento</th>
                    <th class="p-2">Status</th>
                    <th v-if="isAdmin || isAlmoxarife" class="p-2">Deletar</th>
                </tr>
            </thead>

            <tbody class="bg-gray-200">
                <tr v-for="tipo_epi in epi" :key="tipo_epi.id" class="hover:bg-gray-100 items text-center">

                    <td class="p-2 text-center">{{ tipo_epi.id_epi}}</td>
                    <td class="p-2 text-center">{{ tipo_epi.tipo_epi}}</td>
                    <td class="p-2 text-center">{{ tipo_epi.vencimento}}</td>
                    <td class="p-2 text-center">{{ tipo_epi.status}}</td>
                    <td v-if="isAdmin || isAlmoxarife" class="p-2">
                        <button @click="deletarEpi(tipo_epi.id_epi)">
                            <img src="../assets/Users/lixo.png" class="py-2 w-[3vh] mx-auto">
                        </button>
                    </td>

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
import { useToast } from "vue-toastification" //notificação da biblioteca do Vue

const router = useRouter()
const epi = ref([])
const erro = ref('')
const carregando = ref(false)
const toast = useToast()
const user = ref('')
const isAdmin = computed(() => user.value?.classe === 'Administrador')
const isAlmoxarife = computed(() => user.value?.classe === 'Almoxarife')
const isFuncionario = computed(() => user.value?.classe === 'Funcionario')
const isAluno = computed(() => user.value?.classe === 'Aluno')

async function exibirEstoque() {

    const { data, error } = await supabase
        .from('epi')
        .select('*')


    if (error) {
        erro.value = error.message
        console.log(`Error ${erro}`)            //Verificar se tem erro e exibir o erro no console
    }

    epi.value = data   //Se não deu erro, epi recebe a resposta do supabase
    console.log(data)
}

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


async function deletarEpi(id) {

    if (!confirm("Tem certeza que deseja deletar este Epi?")) return

    carregando.value = true

    const { error } = await supabase        //Contato com o supabase
        .from('epi')
        .delete()
        .eq('id_epi', id)

    if (error) {
        toast.error("Erro ao deletar Epi")

    } else {
        toast.success("Epi deletado com sucesso!")
        exibirEstoque()        // recarrega a tabela
    }

    carregando.value = false
}

onMounted(() => {
    exibirEstoque()
    controleClasses()
})





</script>
