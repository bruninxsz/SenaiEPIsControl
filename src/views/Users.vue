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
                        <button @click="abrirModal(user)" class="">
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

            <div class="fixed inset-0 max-h-[550px] my-auto flex flex-col bg-black/40 backdrop-blur-xl p-10 shadow-xl max-w-3xl mx-auto rounded-xl z-50">
    
                    <button class="text-red-600 font-bold text-right text-4xl" @click="showCadastroModal = false">X</button>
                    <div class="text-white font-medium text-center text-2xl">Atualizar Usuário</div>

                    <div class="flex items-center mx-auto mt-16">
                        <label for="email" class="text-white">Digite o email:</label>
                        <input type="email" id="email" v-model="email"
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

                    <button type="submit" @click="atualizarUsuario()"
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
import { useToast } from "vue-toastification" //notificação da biblioteca do Vue

const usuarios = ref([])
const erro = ref('')
    
const editandoUsuario = ref(false)
const showCadastroModal = ref(false)
const usuarioSelecionado = ref(null)
const email = ref('')
const classe = ref('')
const carregando = ref(false)

const toast = useToast()


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

function abrirModal(user) {
    usuarioSelecionado.value = user     //Função para abrir o modal e recolher os dados
    email.value = user.email
    classe.value = user.classe
    showCadastroModal.value = true
}

async function atualizarUsuario() { 
    if (!usuarioSelecionado.value) return       //Tratamento de erro

    if(!email.value || !classe.value){
        toast.warning('Preencha todos os campos para prosseguir')
        return
    }



    carregando.value = true        

    const { error } = await supabase        //Contato com o supabase
        .from('usuarios')
        .update({
            email: email.value,             //Trocando os campos que estavam no banco pelos novos
            classe: classe.value
        })
        .eq('id', usuarioSelecionado.value.id)

    if (error) {
        console.log(error.message)
    } else {
        showCadastroModal.value = false
        toast.success("Usuário atualizado com sucesso!")
        exibirUsuarios() // recarrega a tabela
    }

    carregando.value = false
}

async function deletarUsuario(id) { 

    if (!confirm("Tem certeza que deseja deletar este usuário?")) return

    carregando.value = true        

    const { error } = await supabase        //Contato com o supabase
        .from('usuarios')
        .delete()
        .eq('id', id)

    if (error) {
        toast.error("Erro ao deletar usuário")

    } else {
        showCadastroModal.value = false
        toast.success("Usuário deletado com sucesso!")
        exibirUsuarios()        // recarrega a tabela
    }

    carregando.value = false
}

function fecharModal() {
    usuarioSelecionado.value = null     //Função para fechar o modal e apagar os dados
    email.value = ''
    classe.value = ''
    showCadastroModal.value = false
}

onMounted(() => {
    exibirUsuarios()
})



</script>
