<template>

     <aside class="flex flex-col bg-gray-500 px-4 text-white w-[200px] h-screen">

        <router-link to="/Dashboard/Inventory" class="mt-8 hover:font-bold">Estoque</router-link>

        <router-link to="/Dashboard/Cadastro" class="mt-8 hover:font-bold">Cadastro</router-link>

        <router-link to="/Dashboard/Activities" class="mt-6 hover:font-bold">Movimentações</router-link>

        <router-link to="/Dashboard/EPIRegister" class="mt-8 hover:font-bold">Realizar entrega</router-link>

        <router-link to="/Dashboard/Users" class="mt-8 hover:font-bold">Usuários</router-link>

        <button to="/" class="my-8 font-medium hover:font-bold text-left">
         
         Sair da Conta

        </button>
     </aside>


</template>
