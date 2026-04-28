<template>
    <div class="bg-gray-100">
        <h1 class="mx-auto text-center font-bold text-gray-600 p-16">Estoque</h1>

        <table class="mx-auto w-[600px] border border-gray-400 z-20">
            <thead class="bg-gray-400">
                <tr>
                    <th class="p-2">ID_Tipo</th>
                    <th class="p-2">Tipo Epi</th>
                    <th class="p-2">Qtd Disponível</th>
                </tr>
            </thead>

            <tbody class="bg-gray-200">
                <tr v-for="tipo_epi in estoque" :key="tipo_epi.id" class="hover:bg-gray-100">

                    <td class="p-2 text-center">{{ tipo_epi.id_tipo }}</td>
                    <td class="p-2 text-center">{{ tipo_epi.tipo_epi}}</td>
                    <td class="p-2 text-center">{{ tipo_epi.qtd_disponivel }}</td>

                </tr>
            </tbody>
            
        </table>

    </div>

</template>


<script setup>

import { useRouter } from 'vue-router'
import { useSupabase } from '../composables/useSupabase'
const { supabase } = useSupabase()
import { ref, onMounted } from 'vue'  //onMounted é utilizado para exibir os resultados assim que a página carregar

const estoque = ref([])
const erro = ref('')

async function exibirEstoque() {

    const { data, error } = await supabase
        .from('estoque')
        .select('*')


    if (error) {
        erro.value = error.message
        console.log(`Error ${erro}`)            //Verificar se tem erro e exibir o erro no console
    }

    estoque.value = data     //Se não deu erro, usuários recebe a resposta do supabase
}

onMounted(() => {
    exibirEstoque()
})



</script>
