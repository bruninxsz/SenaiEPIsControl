<template>
    <div class="bg-gray-100">

        <div class="flex flex-row gap-[25%]"> <!--Justificar por linha (Flex-col - coluna e Flex-row - linha)-->

            <div class="">
           
            </div>

            <div class="mt-6">

                <form @submit.prevent="novoUsuario"
                    class="flex flex-col bg-gray-300 p-10 shadow-xl max-w-3xl mx-auto rounded-xl mt-32">

                    <div class="text-black font-medium text-center text-2xl">Novo Usuário</div>

                    <div class="flex items-center mx-auto mt-16">
                        <label for="email">Digite o email:</label>
                        <input type="email" id="email" v-model="email"
                            class="ml-3 px-4 py-3 shadow-md bg-white w-96 rounded-xl text-black text-md"></input>
                    </div>

                    <div class="flex items-center mx-auto mt-8">
                        <label for="senha">Digite a senha:</label>
                        <input id="senha" v-model="senha"
                            class="ml-3 px-4 py-3 shadow-md bg-white w-96 rounded-xl text-black text-md"></input>
                    </div>

                    <div class="flex items-center mx-auto mt-8">
                        <label for="classe">Classe usuário:</label>
                        <select id="classe" v-model="classe"
                            class="ml-3 px-4 py-3 shadow-md bg-white w-96 text-black text-md">

                            <option value="" disabled>Selecione uma opção</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Funcionario">Funcionário</option>
                            <option value="Aluno">Aluno</option>

                        </select>
                    </div>

                    <!-- Mensagem de erro -->
                    <!-- v-if="erro" = só mostra a mensagem se houver um erro -->
                    <div v-if="erro" class="mensagem-erro mt-12 text-red-600 font-bold">
                        <i class="fas fa-exclamation-circle"></i>
                        {{ erro }}
                    </div>

                    <button type="submit"
                        class="botao-cadastro mx-auto bg-red-700 py-3 w-64 text-white font-bold rounded-md mt-24 hover:bg-red-800 hover:scale-[1.01]"
                        :disabled="carregando">Cadastrar</button>


                </form>

            </div>
        </div>
     
    </div>

</template>

<script setup>
import Header from "../components/Header.vue"
import Menu from "../components/Menu.vue"
import Footer from "../components/Footer.vue"
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabase } from '../composables/useSupabase'

const { supabase } = useSupabase()
const router = useRouter()

const email = ref('')
const senha = ref('')
const classe = ref('')
const erro = ref('')
const carregando = ref(false)

async function novoUsuario() {
    erro.value = ''

    // Validação básica (Vendo se todos os campos foram preenchidos)
    if (!email.value || !senha.value || !classe.value) {
        erro.value = 'Por favor, preencha todos os campos'
        return
    }

    carregando.value = true

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email.value,
            password: senha.value                       //Recolhendo os dados digitados no formulário e enviando ao Auth do supabase
        })

        if (error) {
            console.error('Erro do Supabase:', error)
            erro.value = `Error: ${error.message}`
            return                                      //Erro na requisição
        }   

        const user = data.user              //Pegando os dados retornados pelo supabase

        if (!user) {
            console.error('Erro do Supabase:', error)
            erro.value = `Error: ${error.message}`
            return
        }                                   //Verifica se o usuário foi realmente criado

        const { error: erroInsert } = await supabase  //Inserindo os dados na tabela usuarios
            .from('usuarios')
            .insert([
                {
                    id: user.id,
                    email: email.value,
                    classe: classe.value
                }
            ])

        if (erroInsert) {
            console.error('Erro do Supabase:', error)
            erro.value = `Error: ${error.message}`
            return                                          //erro no insert
        }

        alert('Usuário cadastrado com sucesso!')

        email.value = ''         //Limpando os dados para próximos cadastros
        senha.value = ''
        classe.value = ''
        erro.value = ''

    }
    catch (err) {
        erro.value = 'Erro inesperado'   //Captura erros inesperados
        console.error(err)
    }

    finally {
        carregando.value = false        //Depois de dar certo ou errado, libera o uso do botão
    }


}



</script>
