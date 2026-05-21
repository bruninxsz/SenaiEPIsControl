  <template>
    <div class="flex justify-between bg-white p-6 shadow-md">
      <img src="../assets/logo.png" class="w-40 hover:scale-105">

      <div class="flex items-center">
        <p v-if="user">{{ user.nome_usuario }}</p>
        <button @click="mostrarModal = !mostrarModal">
          <img src="../assets/Header/arrow.png" class="w-[20px] ml-3">
        </button>
      </div>

      <div v-if="mostrarModal" class="absolute right-0 mt-16 bg-gray-100 shadow-2xl rounded-lg px-6 py-3 z-50">

        <button @click="Sair" class="block w-full text-sm text-left px-2 py-1 rounded">
          Sair da Conta
        </button>

      </div>
    </div>


  </template>

<script setup>
import { useRouter } from 'vue-router'
import { useSupabase } from '../composables/useSupabase'
import { ref, computed, onMounted } from 'vue'

const { supabase } = useSupabase()
const router = useRouter()
const user = ref(null)
const mostrarModal = ref(false)

onMounted(async () => {

  const { data: authData } = await supabase.auth.getUser()

  if (!authData?.user) {
    router.push('/Login')
    return
  }

  const userId = authData.user.id

  const { data: userData, error } = await supabase
    .from('usuarios')
    .select('nome_usuario')
    .eq('id', userId)
    .single()



  if (error) {
    console.error('Erro ao buscar dados do usuário:', error)
    return
  }

  user.value = userData


})


async function Sair(){      

   try{
      await supabase.auth.signOut()    //Função do supabase para deslogar
      router.push('/Login')
   }
   catch(err){
         console.error('Erro ao fazer logout:', err)         //Validação
   }
}


</script>
