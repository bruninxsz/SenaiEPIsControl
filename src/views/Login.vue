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
import Header from "../components/Header.vue"
import Menu from "../components/Menu.vue"
import Footer from "../components/Footer.vue"
import { useSupabase } from '../composables/useSupabase'
// ===== IMPORTAÇÕES =====
// Importar a função ref do Vue para criar variáveis reativas
// ref() = cria uma variável que, quando muda, atualiza a tela automaticamente
import { ref } from 'vue'

// Importar o composable do Supabase que já está configurado no projeto
// useSupabase() = retorna o cliente Supabase pronto para usar

// Importar o router do Vue Router para navegar entre páginas
// useRouter() = permite usar router.push() para ir para outras páginas
import { useRouter } from 'vue-router'

// ===== CONFIGURAÇÃO =====
// Pegar o cliente Supabase já configurado
// supabase = objeto que tem os métodos para autenticação, banco de dados, etc
const { supabase } = useSupabase()

// Pegar o router para navegar entre páginas
// router = objeto que permite router.push('/pagina') para navegar
const router = useRouter()
const email = ref('')
const senha = ref('')
const erro = ref('')

// Variável que indica se o login está em progresso
// Usamos isso para:
// 1. Desabilitar o botão enquanto aguarda a resposta do Supabase
// 2. Mostrar um spinner de carregamento
// 3. Evitar que o usuário clique múltiplas vezes
const carregando = ref(false)

// ===== FUNÇÃO PRINCIPAL: FAZER LOGIN =====
// Esta função é chamada quando o usuário clica no botão "Entrar"
// async = significa que essa função pode fazer operações que demoram (como chamar o Supabase)
// await = espera a operação terminar antes de continuar
async function fazerLogin() {
  // ===== PASSO 1: LIMPAR ERROS ANTERIORES =====
  // Se havia uma mensagem de erro da tentativa anterior, apagar
  // Assim a tela fica limpa para a nova tentativa
  erro.value = ''

  // ===== PASSO 2: VALIDAR SE OS CAMPOS ESTÃO PREENCHIDOS =====
  // Verificar se o usuário digitou algo nos campos
  // Se não digitou nada, mostrar erro e parar a função
  if (!email.value || !senha.value) {
    // !email.value = se email está vazio (falsy)
    // || = OU (se email está vazio OU senha está vazia)
    // Se algum estiver vazio, entra neste if
    erro.value = 'Por favor, preencha todos os campos'
    // Mostra a mensagem de erro na tela
    return
    // return = para a execução da função aqui
    // Não continua para o Supabase se os campos estão vazios
  }

  // ===== PASSO 3: MOSTRAR QUE ESTÁ CARREGANDO =====
  // Muda carregando para true
  // Isso faz com que:
  // 1. O botão fica desabilitado (não pode clicar de novo)
  // 2. Aparece um spinner de carregamento
  carregando.value = true

  try {
    // ===== PASSO 4: TENTAR FAZER LOGIN COM O SUPABASE =====
    // supabase.auth.signInWithPassword() = função do Supabase que autentica o usuário
    // Recebe um objeto com email e password
    // Retorna um objeto com { data, error }
    // - data = informações do usuário se o login funcionou
    // - error = mensagem de erro se o login falhou
    const { error } = await supabase.auth.signInWithPassword({
      // email: email.value = envia o e-mail que o usuário digitou
      email: email.value,
      // password: senha.value = envia a senha que o usuário digitou
      password: senha.value
    })
    // await = espera o Supabase responder antes de continuar

    // ===== PASSO 5: VERIFICAR SE HOUVE ERRO =====
    // Se o Supabase retornou um erro, significa que:
    // - O e-mail não existe
    // - A senha está incorreta
    // - Algum outro problema de autenticação
    if (error) {
      // if (error) = se houve erro
      // O Supabase retorna um erro se o e-mail ou senha estiverem incorretos
      // Mostrar a mensagem de erro para o usuário
      erro.value = 'E-mail ou senha incorretos. Tente novamente.'
      // Desabilitar o carregamento (botão volta ao normal)
      carregando.value = false
      // return = para a função aqui, não continua
      return
    }

    // ===== PASSO 6: LOGIN BEM-SUCEDIDO - REDIRECIONAR =====
    // Se chegou aqui, significa que o login funcionou!
    // Não houve erro, então o usuário está autenticado
    // Agora precisamos levar o usuário para a página principal
    // router.push('/') = navega para a página inicial
    // '/' = rota raiz (onde está o AppLayout com a Sidebar)
    // Isso acontece sem recarregar a página (SPA - Single Page Application)
       router.push('/Inventory')
    // Depois que router.push() é executado, o usuário é levado para a página inicial
  }
  // ===== PASSO 7: CAPTURAR ERROS INESPERADOS =====
  // Se houver um erro que não foi previsto (erro de rede, erro do servidor, etc)
  // Este catch captura e trata
  catch (err) {
    // err = objeto com informações do erro
    // Mostrar uma mensagem genérica para o usuário
    // Não mostramos o erro técnico para não assustar o usuário
    erro.value = 'Erro ao fazer login. Tente novamente mais tarde.'
    // Mostrar o erro completo no console do navegador (para debug)
    // Isso ajuda o desenvolvedor a entender o que deu errado
    console.error('Erro ao fazer login:', err)
    // Desabilitar o carregamento (botão volta ao normal)
    carregando.value = false
  }
}
  
</script>
