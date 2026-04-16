<template>
    <div class="bg-gray-100">

        <header>
            <Header />
        </header>

        <div class="flex flex-row"> <!--Justificar por linha (Flex-col - coluna e Flex-row - linha)-->

            <div class="">
                <Menu />
            </div>

            <div class="">

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

</script>

