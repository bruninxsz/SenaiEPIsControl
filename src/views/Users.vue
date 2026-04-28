<template>
    <div class="bg-gray-100">
        <h1 class="mx-auto text-center font-bold mt-4 text-gray-600 p-16">Usuários Cadastrados</h1>

        <table class="mx-auto w-[800px] border border-gray-400 z-20">
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
                        <button @click="showCadastroModal = true" class="">
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

        <!--Exibir modal para atualizar informações dos usuários-->

         <div v-if="showCadastroModal" class="modal-overlay" @click.stop>

            <div class="fixed inset-0 max-h-[550px] my-auto bg-black/60 backdrop-blur-xl flex flex-col bg-gray-300 p-10 shadow-xl max-w-3xl mx-auto rounded-xl z-50">
    
                    <button class="text-red-600 font-bold text-right text-4xl" @click="showCadastroModal = false">X</button>
                    <div class="text-white font-medium text-center text-2xl">Atualizar Usuário</div>

                    <div class="flex items-center mx-auto mt-16">
                        <label for="email" class="text-white">Digite o email:</label>
                        <input type="email" id="email" v-model="email" @click="showCadastroModal = true"
                            class="ml-3 px-4 py-3 shadow-md bg-white w-96 rounded-xl text-black text-md"></input>
                    </div>

                    <div class="flex items-center mx-auto mt-8">
                        <label for="classe" class="text-white">Classe usuário:</label>
                        <select id="classe" v-model="classe"
                            class="ml-3 px-4 py-3 shadow-md bg-white w-96 text-black text-md">

                            <option value="" disabled>Selecione uma opção</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Funcionario">Funcionário</option>
                            <option value="Aluno">Aluno</option>

                        </select>
                    </div>

                    <button type="submit"
                        class="botao-cadastro mx-auto bg-red-700 py-3 w-64 text-white font-bold rounded-md mt-16 hover:bg-red-800 hover:scale-[1.01]"
                        :disabled="carregando">Atualizar</button>
                </div>





    </div>
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
const showCadastroModal = ref(false)

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
