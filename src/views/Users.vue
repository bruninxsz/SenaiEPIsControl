<template>
    <div class="bg-gray-100">
        <h1 class="mx-auto text-center font-bold text-gray-600 p-16">Usuários Cadastrados</h1>

        <table class="mx-auto w-[800px] border border-gray-400 ">
            <thead class="bg-gray-400">
                <tr>
                    <th class="p-2">ID</th>
                    <th class="p-2">Email</th>
                    <th class="p-2">Classe</th>
                    <th class="p-2">Editar Usuário</th>
                    <th class="p-2">Deletar Usuário</th>
                </tr>
            </thead>

            <tbody class="bg-gray-200">
                <tr v-for="user in usuarios" :key="user.id" class="hover:bg-gray-100">

                    <td class="p-2">{{ user.id }}</td>
                    <td class="p-2">{{ user.email }}</td>
                    <td class="p-2">{{ user.classe }}</td>
                    <td class="p-2">
                        <button @click="editandoUsuario = true" class="">
                            <img src="../assets/Users/editar.png" class="p-2 w-[30%] mx-auto">
                        </button>
                    </td>
                    <td class="p-2">
                        <button @click="deletarUsuario(user.id)" class="">
                            <img src="../assets/Users/lixo.png" class="p-2 w-[30%] mx-auto">
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
import { ref, onMounted } from 'vue'  //onMounted é utilizado para exibir os resultados assim que a página carregar

const usuarios = ref([])
const erro = ref('')
const editandoUsuario = ref(false)

async function exibirUsuarios() {

    const { data, error } = await supabase
        .from('usuarios')
        .select('*')


    if (error) {
        erro.value = error.message
        console.log(`Error ${erro}`)            //Verificar se tem erro e exibir o erro no console
    }

    usuarios.value = data     //Se não deu erro, usuários recebe a resposta do supabase
}

onMounted(() => {
    exibirUsuarios()
})



</script>
