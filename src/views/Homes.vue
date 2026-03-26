<template class="scroll-smooth">

    <div class="bg-gray-100 min-h-screen">
    <!--Montando o Header-->
    <div id="Header" class="flex justify-between px-6 py-6 shadow-md bg-white">
        <img src="../assets/logo.png" alt="Logo Senai Epi Control" class="w-40 rounded-md hover:scale-105"> <!--LOGO-->

        <router-link to='#Funcionalidades'>
            <div class="px-2 py-4 text-black hover:text-red-600 hover:scale-[1.02]">Funcionalidades</div> <!--SOBRE-->
        </router-link>

        <router-link to='#Beneficios'>
            <div class="px-2 py-4 text-black hover:text-red-600 hover:scale-[1.02]">Benefícios</div> <!--CONTATO-->
        </router-link>

        <router-link to='Login'>
            <button class="bg-red-700 px-12 py-4 text-white rounded-md hover:bg-red-800 hover:scale-[1.01]">
                <!--BOTÃO LOGIN-->
                Login
            </button>
        </router-link>
    </div>




    <!--Montando o Corpo da Página-->
    <div class="flex justify-between items-center max-w-7xl mx-auto px-4 mt-32">

        <div class="flex flex-col space-y-5 text-right">
            <h1 class="text-5xl text-right font-medium">Sistema de Controle de EPIs <br> para Instituições de Ensino</h1>

            <p class="text-gray-600 text-xl text-right"> Gerencie entregas, validade e rastreabilidade de equipamentos
                de proteção
                individual de forma simples e eficiente</p><br>

            <router-link to='Login'>
                <button class="bg-red-700 px-12 py-4 text-white rounded-md hover:bg-red-800 hover:scale-[1.01]">
                    Comece agora
                </button>
            </router-link>
        </div>

        <div class="max-w-5xl">
            <img src="../assets/Home/Dashboard-example.png" class="w-[800px]"><br> <!--Imagem notebook-->
        </div>

    </div>



    <div class="flex justify-between space-x-20 mx-auto text-center max-w-7xl items-center mt-32"> <!--CARDS-->

        <div class="mx-auto max-w-6xl p-10">

            <div class="flex flex-col space-y-5 items-center">
                <div><img src="../assets/Home/safety.svg" alt="Capacete de segurança" class="w-32 h-auto"></div>
                <div class="text-red-600 text-xl font-bold">Controle de Entregas</div>
                <p class="text-gray-600 text-xl max-w-sm">Controle de Entregas e rastreamento de equipamentos de
                    proteção individual de forma simples e eficiente.</p>

            </div>
        </div>

        <div class="mx-auto max-w-6xl p-10">

            <div class="flex flex-col space-y-5 items-center">
                <div><img src="../assets/Home/validade.svg" alt="Calendário com validação" class="w-[110px] h-auto"></div>
                <div class="text-red-600 text-xl font-bold">Gestão de Validade</div>
                <p class="text-gray-600 text-xl max-w-sm">Gestão de validade de equipamentos de proteção individual de
                    forma simples e eficiente.</p>

            </div>
        </div>

        <div class="mx-auto max-w-6xl p-10">

            <div class="flex flex-col space-y-5 items-center">
                <div><img src="../assets/Home/rastreability.svg" alt="Corrente e lupa" class="w-[110px] h-auto"></div>
                <div class="text-red-600 text-xl font-bold">Rastreabilidade Completa</div>
                <p class="text-gray-600 text-xl max-w-sm">Rastreabilidade completa de equipamentos de proteção
                    individual de forma simples e eficiente.</p>

            </div>
        </div>
    </div> <!--CARDS-->


    <div class="flex flex-col py-10 space-y-20 text-center mt-32"> <!--Seção porque escolher a EPI Control-->

        <p class="text-black text-4xl font-medium">Por que escolher o Senai Epi Control?</p>
        <p class="text-gray-700 text-xl max-w-6xl mx-auto">O Senai Epi Control é uma solução completa desenvolvida especialmente para instituições de ensino técnico e profissionalizante, voltada à modernização do controle de EPIs. A plataforma oferece gerenciamento centralizado, acompanhamento em tempo real do estoque, controle de validade e relatórios estratégicos, promovendo mais segurança, organização e eficiência administrativa.</p>

    </div>


    <div class="flex justify-between space-x-10 max-w-7xl mx-auto mt-32"> <!--Segunda seção de cards-->

        <div class="flex flex-col space-y-6 p-10 shadow-xl rounded-xl w-[900px] hover:scale-[1.01]">

            <div><img src="../assets/Home/shield.svg" alt="Escudo vermelho" class="w-16 p-2 bg-red-100 rounded-xl"></div>
            <div class="text-xl text-black text-left font-medium">Conformidade garantida</div>
            <p class="text-md text-gray-700 text-left">Mantenha sua instituição em conformidade com as normas regulamentadoras de segurança do trabalho.</p>

        </div>

        <div class="flex flex-col space-y-6 p-10 shadow-xl rounded-xl  w-[900px] hover:scale-[1.01]">

            <div><img src="../assets/Home/timer.svg" alt="Relógio vermelho" class="w-16 p-2 bg-red-100 rounded-xl"></div>
            <div class="text-xl text-black text-left font-medium">Economia de tempo</div>
            <p class="text-md text-gray-700 text-left">Automatize processos manuais e reduza o tempo gasto com controle de EPIs.</p>
            
        </div>

        <div class="flex flex-col space-y-6 p-10 shadow-xl rounded-xl  w-[900px] hover:scale-[1.01]">

            <div><img src="../assets/Home/analytics.svg" alt="Gráfico de barras vermelho" class="w-16 p-2 bg-red-100 rounded-xl"></div>
            <div class="text-xl text-black text-left font-medium">Relatórios Detalhados</div>
            <p class="text-md text-gray-700 text-left">Gere relatórios completos sobre uso, validade e histórico de EPIs com poucos cliques.</p>

        </div>

        <div class="flex flex-col space-y-6 p-10 shadow-xl rounded-xl  w-[900px] hover:scale-[1.02]">

            <div><img src="../assets/Home/client.svg" alt="Procura de um perfil vermelho" class="w-16 p-2 bg-red-100 rounded-xl"></div>
            <div class="text-xl text-black text-left font-medium">Gestão de usuários</div>
            <p class="text-md text-gray-700 text-left">Controle a entrega de EPIs por aluno ou funcionário, conforme turma ou setor de forma organizada e centralizada.</p>

        </div>

    </div>
    


    <div class="mt-32">  <!--Chamada para o componente Footer-->
        <Footer/>
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
