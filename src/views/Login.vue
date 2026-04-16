<template class="scroll-smooth">

<div class="bg-gray-100 min-h-screen ">
    <div class="flex justify-between p-4">
        <router-link to="/">
            <img src="../assets/Login/return.svg" alt="Botão de retorno" class="w-[45px] hover:scale-[1.03]">
        </router-link>
        <img src="../assets/senai.svg" alt="Logo do SENAI" class="w-32 hover:scale-[1.01]">
    </div>

    <form @submit.prevent="fazerLogin" class="flex flex-col bg-gray-300 p-10 shadow-xl max-w-3xl mx-auto rounded-xl mt-32">

        <div class="text-black font-medium text-center text-2xl">Faça seu Login</div>

        <div class="flex items-center mx-auto mt-16">
            <label for="email">Digite o seu email:</label>
            <input type="email" id="email" v-model="email" class="ml-3 px-4 py-3 shadow-md bg-white w-96 rounded-xl text-black text-md"></input>
        </div>

        <div class="flex items-center mx-auto mt-8">
            <label for="senha">Digite a sua senha:</label>
            <input type="password" id="senha" v-model="senha" class="ml-3 px-4 py-3 shadow-md bg-white w-96 rounded-xl text-black text-md"></input>
        </div>
        
        <!-- Mensagem de erro -->
        <!-- v-if="erro" = só mostra a mensagem se houver um erro -->
        <div v-if="erro" class="mensagem-erro">
          <i class="fas fa-exclamation-circle"></i>
          {{ erro }}
        </div>

        <button type="submit" class="botao-entrar mx-auto bg-red-700 py-3 w-64 text-white font-bold rounded-md mt-24 hover:bg-red-800 hover:scale-[1.01]" :disabled="carregando">
        <!-- Mostra um spinner enquanto está carregando -->
          <i v-if="carregando" class="fas fa-spinner fa-spin"></i>
          <!-- Mostra o texto normal quando não está carregando -->
          <span v-else>Entrar</span>
        </button>
                         
        <router-link to="/Login">
            <div class="text-right text-blue-600 text-md mt-16 mr-3 hover:underline">Esqueceu sua senha?</div>
        </router-link>
        
    </form>
</div>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabase } from '../composables/useSupabase'

// Cliente Supabase e router
const { supabase } = useSupabase()
const router = useRouter()

// Estados do formulário
const email = ref('')
const senha = ref('')
const erro = ref('')
const carregando = ref(false)

// Função de login
async function fazerLogin() {
  erro.value = ''

  // Validação básica
  if (!email.value || !senha.value) {
    erro.value = 'Por favor, preencha todos os campos'
    return
  }

  carregando.value = true

  try {
    // Tentativa de login no Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: senha.value
    })

    if (error) {
      erro.value = 'E-mail ou senha incorretos. Tente novamente.'
      carregando.value = false
      return
    }

    // Redireciona após login
    router.push('/Inventory')
  } catch (err) {
    // Erro inesperado
    erro.value = 'Erro ao fazer login. Tente novamente mais tarde.'
    console.error('Erro ao fazer login:', err)
    carregando.value = false
  }
}
</script>