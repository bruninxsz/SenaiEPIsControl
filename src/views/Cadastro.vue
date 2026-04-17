<template>
    <div class="bg-gray-100">

        <header>
            <Header />
        </header>

        <div class="flex flex-row gap-[25%]"> <!--Justificar por linha (Flex-col - coluna e Flex-row - linha)-->

            <div class="">
                <Menu />
            </div>

            <div class="mt-6">
        
                <form @submit.prevent="novoUsuario" class="flex flex-col bg-gray-300 p-10 shadow-xl max-w-3xl mx-auto rounded-xl mt-32">

        <div class="text-black font-medium text-center text-2xl">Novo Usuário</div>

        <div class="flex items-center mx-auto mt-16">
            <label for="email">Digite o email:</label>
            <input type="email" id="email" v-model="email" class="ml-3 px-4 py-3 shadow-md bg-white w-96 rounded-xl text-black text-md"></input>
        </div>

        <div class="flex items-center mx-auto mt-8">
            <label for="senha">Digite a senha:</label>
            <input id="senha" v-model="senha" class="ml-3 px-4 py-3 shadow-md bg-white w-96 rounded-xl text-black text-md"></input>
        </div>  

        <div class="flex items-center mx-auto mt-8">
            <label for="classe">Classe usuário:</label>
            <select id="classe" v-model="classe" class="ml-3 px-4 py-3 shadow-md bg-white w-96 text-black text-md">

                <option value="" disabled>Selecione uma opção</option>
                <option value="Administrador">Administrador</option>
                <option value="Funcionario">Funcionário</option>
                <option value="Aluno">Aluno</option>         

            </select>
        </div>
        
        <!-- Mensagem de erro -->
        <!-- v-if="erro" = só mostra a mensagem se houver um erro -->
        <div v-if="erro" class="mensagem-erro">
          <i class="fas fa-exclamation-circle"></i>
          {{ erro }}
        </div>

        <button type="submit" class="botao-cadastro mx-auto bg-red-700 py-3 w-64 text-white font-bold rounded-md mt-24 hover:bg-red-800 hover:scale-[1.01]" :disabled="carregando">Cadastrar</button>
        
        
    </form>

            </div>
        </div>
        <Footer />
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

   // Validação básica
    if (!email.value || !senha.value) {
    erro.value = 'Por favor, preencha todos os campos'
    return
  }

  carregando.value = true

  try{
    const {data,error} = await supabase.auth.signUp({ 
        email: email.value,
        password: senha.value
    })

    if (error) {
        erro.value = 'Erro ao criar usuário, tente novamente.'
        return
    }

    const user = data.user

    if (!user) {
        erro.value = 'Erro ao criar usuário'
        return
    }
    

  } 
  catch(err){

  }

  finally{

  }

}


  
</script>
