<template>
    <div class="bg-gray-100">

        <div class="flex flex-row gap-[25%]"> <!--Justificar por linha (Flex-col - coluna e Flex-row - linha)-->

            <div class="">

            </div>

            <div class="mt-6">

                <form @submit.prevent="novoUsuario"
                    class="flex flex-col bg-gray-300 p-10 shadow-xl max-w-3xl mx-auto rounded-xl mt-16">

                    <div class="text-black font-medium text-center text-2xl">Novo Usuário</div>

                    <div class="flex items-center mx-auto mt-16">
                        <label for="nome">Digite seu nome:</label>
                        <input id="nome" v-model="nome"
                            class="ml-3 px-4 py-3 shadow-md bg-white w-96 rounded-xl text-black text-md"></input>
                    </div>

                    <div class="flex items-center mx-auto mt-8">
                        <label for="email">Digite seu email:</label>
                        <input type="email" id="email" v-model="email"
                            class="ml-3 px-4 py-3 shadow-md bg-white w-96 rounded-xl text-black text-md"></input>
                    </div>

                    <div class="flex items-center mx-auto mt-8">
                        <label for="senha">Digite sua senha:</label>
                        <input type="password" v-model="senha"
                            class="ml-3 px-4 py-3 shadow-md bg-white w-96 rounded-xl text-black text-md"></input>
                    </div>

                    <div class="flex items-center mx-auto mt-8">
                        <label for="confSenha">Confirmar senha:</label>
                        <input type="password" v-model="confSenha"
                            class="ml-3 px-4 py-3 shadow-md bg-white w-96 rounded-xl text-black text-md"></input>
                    </div>

                    <div class="flex items-center mx-auto mt-8">
                        <label for="classe">Classe do usuário:</label>
                        <select id="classe" v-model="classe"
                            class="ml-3 px-4 py-3 shadow-md bg-white w-96 text-black text-md">

                            <option value="" disabled>Selecione uma opção</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Funcionario">Funcionário</option>
                            <option value="Aluno">Aluno</option>

                        </select>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabase } from '../composables/useSupabase'
import { useToast } from "vue-toastification" //notificação da biblioteca do Vue
import { data } from 'autoprefixer'


const { supabase } = useSupabase()
const router = useRouter()

const nome = ref('')
const email = ref('')
const number = ref('')
const senha = ref('')
const classe = ref('')
const confSenha = ref('')
const erro = ref('')
const carregando = ref(false)
const toast = useToast()

async function novoUsuario() {
    erro.value = ''

    // Validação básica (Vendo se todos os campos foram preenchidos)
    if (!nome.value || !email.value || !senha.value || !confSenha.value || !classe.value) {
        toast.warning('Preencha todos os campos para prosseguir!')

        return
    }

    carregando.value = true

    try {

        if (senha.value !== confSenha.value) {
            toast.warning('As senhas não coincidem!')
            return                                      //Verificando se as senhas digitadas são iguais     
        }

        const { data, error } = await supabase.auth.signUp({         //Recolhendo os dados digitados no formulário e enviando ao Auth do supabase
            email: email.value,
            password: senha.value,                                          
            options:{
                data: { 
                    nome_usuario: nome.value,         //Colocando o nome do usuário no auth para facilitar a criação de Policy
                    classe: classe.value                    //Colocando a classe na no auth para facilitar a criação de Policy
                }
            }          
            
        })

        if (error) {
            console.error('Erro do Supabase:', error)
            erro.value = `Error: ${error.message}`
            toast.error('Erro ao cadastrar usuário')
            return                                      //Erro na requisição
        }

        const user = data.user              //Pegando os dados retornados pelo supabase

        if (!user) {
            console.error('Erro do Supabase:', error)
            erro.value = `Error: ${error.message}`
            toast.error('Erro ao cadastrar usuário')
            return
        }                                   //Verifica se o usuário foi realmente criado

        toast.success('Usuário cadastrado com sucesso')

        nome.value = ''          //Limpando os dados para próximos cadastros
        email.value = ''         //Limpando os dados para próximos cadastros
        senha.value = ''
        confSenha.value = ''
        classe.value = ''
        erro.value = ''

    }
    catch (err) {
        erro.value = 'Erro inesperado'   //Captura erros inesperados
        console.error(err)
        toast.error('Erro ao cadastrar usuário')
    }

    finally {
        carregando.value = false        //Depois de dar certo ou errado, libera o uso do botão
    }


}



</script>
