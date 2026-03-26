<template class="scroll-smooth">

<div class="bg-gray-100 min-h-screen ">
    <div class="flex justify-between p-4">
        <router-link to="/">
            <img src="../assets/Login/return.svg" alt="Botão de retorno" class="w-[45px] hover:scale-[1.03]">
        </router-link>
        <img src="../assets/senai.svg" alt="Logo do SENAI" class="w-32 hover:scale-[1.01]">
    </div>

    <div class="flex flex-col bg-gray-300 p-10 shadow-xl max-w-4xl mx-auto rounded-xl mt-32">
        <div class="text-black font-medium text-center text-2xl">Faça seu Login</div>
        <div class="py-3 px-2 shadow-md bg-white max-w-5xl mx-auto rounded-xl mt-4 text-gray-300 text-md font-medium mt-16">
            Digite o seu CPF:⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀</div>
        <div class="py-3 px-2 shadow-md bg-white max-w-5xl mx-auto rounded-xl mt-4 text-gray-300 text-md font-medium mt-8">
            Digite a sua senha:⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ </div>
        <button class="bg-red-700 px-12 py-4 text-white max-w-xl mx-auto font-bold rounded-md mt-12 hover:bg-red-800 hover:scale-[1.01]">Login</button>
        <div class="text-right text-blue-600 text-md mt-8 mr-3">Esqueceu sua senha?</div>
        

    </div>
</div>

</template>

<script>
import Header from "../components/Header.vue"
import Menu from "../components/Menu.vue"
import Footer from "../components/Footer.vue"
export default {
    name: 'Homes',
    components: {
        Header,
        Menu,
        Footer
    }
}
</script>
