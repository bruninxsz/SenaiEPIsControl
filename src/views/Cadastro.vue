<template>
    <div class="bg-gray-100">

        <header>
            <Header />
        </header>

        <div class="flex flex-row gap-[25%]"> <!--Justificar por linha (Flex-col - coluna e Flex-row - linha)-->

            <div class="">
                <Menu />
            </div>

            <div class="">
        
                <form @submit.prevent="fazerLogin" class="flex flex-col bg-gray-300 p-10 shadow-xl max-w-3xl mx-auto rounded-xl mt-32">

        <div class="text-black font-medium text-center text-2xl">Novo Usuário</div>

        <div class="flex items-center mx-auto mt-16">
            <label for="email">Digite o email:</label>
            <input type="email" id="email" v-model="email" class="ml-3 px-4 py-3 shadow-md bg-white w-96 rounded-xl text-black text-md"></input>
        </div>

        <div class="flex items-center mx-auto mt-8">
            <label for="senha">Digite a senha:</label>
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

</script>
