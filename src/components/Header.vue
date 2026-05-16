  <template>
    <div class="flex justify-between bg-white p-6 shadow-md">
      <img src="../assets/logo.png" class="w-40 hover:scale-105">

      <div class="flex items-center">
        <p v-if="user">{{ user.nome }}</p>
        <img src="../assets/Header/Profile.svg" class="w-[50px] ml-3">
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

  </script>
