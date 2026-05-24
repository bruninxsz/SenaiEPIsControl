<template>
    <div class="bg-gray-100">
        <h1 v-if="isAdmin || isAlmoxarife" class="mx-auto text-center font-bold mt-4 text-gray-600 p-16">Usuários
            Cadastrados</h1>

        <div class="flex flex-col">

            <div v-if="isAdmin" class="flex justify-between mx-auto mb-8 gap-[200px] mt-8">

                <input v-model="busca" @input="exibirUsuarios" type="text" placeholder="Buscar por usuário..."
                    class="border p-2 rounded w-64" />

                <select v-model="filtroClasse" @change="exibirUsuarios" class="border p-2 mb-4">
                    <option value="">Classe:</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Almoxarife">Almoxarife</option>
                    <option value="Aluno">Aluno</option>
                    <option value="Funcionario">Funcionário</option>
                </select>

                <button @click="limparFiltros"
                    class="px-2 bg-red-700 rounded-lg shadow-lg mt- text-white hover:bg-red-800">Limpar filtros</button>
            </div>
            <table class="mx-auto w-full max-w-[900px] border border-slate-400 z-20 shadow-lg mt-4">
                <thead class="bg-gray-700 text-white">
                    <tr>
                        <th class="p-3">ID</th>
                        <th class="p-3">Nome</th>
                        <th class="p-3">Email</th>
                        <th class="p-3">Classe</th>
                        <th v-if="isAdmin" class="p-2">Editar Usuário</th>
                        <th v-if="isAdmin" class="p-2">Deletar Usuário</th>
                    </tr>
                </thead>

                <tbody class="bg-gray-200 ">
                    <tr v-for="(user, index) in usuarios" :key="user.id + '-' + index" class="hover:bg-gray-100 text-center">
                        <td class="p-3">{{ user.id }}</td>
                        <td class="p-3">{{ user.nome_usuario }}</td>
                        <td class="p-3">{{ user.email }}</td>
                        <td class="p-3">{{ user.classe }}</td>
                        <td v-if="isAdmin" class="p-2">
                            <button @click="abrirModal(user)" class="">
                                <img src="../assets/Users/editar.png" class="p-2 w-[30%] hover:scale-[1.05] mx-auto">
                            </button>
                        </td>
                        <td v-if="isAdmin" class="p-2">
                            <button @click="deletarUsuario(user.id)" class="">
                                <img src="../assets/Users/lixo.png" class="p-2 w-[30%] hover:scale-[1.05] mx-auto">
                            </button>
                        </td>

                    </tr>
                </tbody>

            </table>
        </div>

        <!--Exibir modal para atualizar informações dos usuários-->

       <div v-if="showCadastroModal"
    class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

    <div class="bg-gray-100 w-[90%] max-w-md rounded-2xl shadow-2xl p-6 relative">

        <button @click="fecharModal"
            class="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl font-bold">
            ✕
        </button>

        <h2 class="text-xl font-bold text-center text-gray-700 mb-6">
            Atualizar Usuário
        </h2>

        <div class="flex flex-col mb-4">
            <label class="text-gray-600 mb-1">Email</label>
            <input type="email" v-model="email"
                class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full">
        </div>

        <div class="flex flex-col mb-6">
            <label class="text-gray-600 mb-1">Classe</label>
            <select v-model="classe"
                class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full">
                <option value="" disabled>Selecione uma opção</option>
                <option value="Administrador">Administrador</option>
                <option value="Funcionario">Funcionário</option>
                <option value="Aluno">Aluno</option>
            </select>
        </div>

        <button @click="atualizarUsuario"
            class="w-full bg-red-700 text-white py-2 rounded-lg font-semibold hover:bg-red-800 transition">
            Atualizar
        </button>

    </div>






        </div>
    </div>
</template>


<script setup>


import { useRouter } from 'vue-router'
import { useSupabase } from '../composables/useSupabase'
const { supabase } = useSupabase()
import { ref, onMounted, computed } from 'vue'  //onMounted é utilizado para exibir os resultados assim que a página carregar
import { useToast } from "vue-toastification" //notificação da biblioteca do Vue

const usuarios = ref([])
const erro = ref('')

const editandoUsuario = ref(false)
const showCadastroModal = ref(false)
const usuarioSelecionado = ref(null)
const email = ref('')
const classe = ref('')
const carregando = ref(false)
const isAdmin = computed(() => user.value?.classe === 'Administrador')
const isAlmoxarife = computed(() => user.value?.classe === 'Almoxarife')
const isFuncionario = computed(() => user.value?.classe === 'Funcionario')
const isAluno = computed(() => user.value?.classe === 'Aluno')
const toast = useToast()
const user = ref(null)
const filtroClasse = ref('')
const router = useRouter()
const busca = ref('')

async function controleClasses() {

    const { data: authData } = await supabase.auth.getUser()

    if (!authData?.user) {
        router.push('/Login')
        return
    }

    const userId = authData.user.id

    const { data: userData, error } = await supabase
        .from('usuarios')
        .select('classe')
        .eq('id', userId)
        .single()



    if (error) {
        console.error('Erro ao buscar dados do usuário:', error)
        return
    }

    user.value = userData
}

async function exibirUsuarios() {

    let query = supabase
        .from('usuarios')
        .select('*')

    if (filtroClasse.value) {
        query = query.eq('classe', filtroClasse.value)
    }

    if (busca.value) { 
        query = query.ilike('nome_usuario', `%${busca.value}%`)
    }

    const { data, error } = await query

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

    if (!email.value || !classe.value) {
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

function limparFiltros() {
    filtroClasse.value = ''
    exibirUsuarios()
}

onMounted(() => {
    controleClasses()
    exibirUsuarios()
})



</script>
