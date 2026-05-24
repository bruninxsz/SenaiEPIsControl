<template>
    <div class="bg-gray-100">
        <h1 v-if="isAdmin || isAlmoxarife" class="mx-auto text-center font-bold text-gray-600 p-16">Movimentações</h1>
        <h1 v-else class="mx-auto text-center font-bold text-gray-600 p-16">Suas Movimentações</h1>

        <div class="flex flex-col">

            <div v-if="isAdmin" class="flex justify-between mx-auto mt-6 mb-8 gap-[260px]">

                <input v-model="busca" @input="exibirMovimentacoes" type="text" placeholder="Buscar por usuário..."
                    class="border p-2 rounded w-64" />

                <select v-model="filtroTipo" @change="exibirMovimentacoes" class="border p-2 mb-4">
                    <option value="">Tipo:</option>
                    <option value="Entrega">Entrega</option>
                    <option value="Devolucao">Devolução</option>
                </select>

                <button @click="limparFiltros"
                    class="px-2 bg-red-700 rounded-lg shadow-lg text-white hover:bg-red-800">Limpar filtros</button>
            </div>

            <table class="mx-auto w-[1000px] border border-gray-400 z-20 rounded-md shadow-lg mt-4">
                <thead class="bg-gray-700 text-white">
                    <tr>
                        <th class="py-3 px-8">Id Movimentação</th>
                        <th class="px-8">Tipo</th>
                        <th class="px-8">Id Epi</th>
                        <th class="px-8">Tipo Epi</th>
                        <th class="px-8">Usuário</th>
                        <th class="px-8">Data</th>
                        
                    </tr>
                </thead>

                <tbody class="bg-gray-200">
                    <tr v-for="(mov, index) in movimentacoes" :key="mov.id + '-' + index" class="text-center">
                        <td class="py-3 text-center">{{ mov.id }}</td>
                        <td class="text-center">{{ mov.tipo }}</td>
                        <td class="text-center">{{ mov.epi_id }}</td>
                        <td class="text-center">{{ mov.tipo_epi }}</td>
                        <td class="px-6 text-center">{{ mov.usuario_nome }}</td>
                        <td class="text-center">{{ mov.data }}</td>

                    </tr>
                </tbody>

            </table>
        </div>
    </div>

</template>


<script setup>

import { useRouter } from 'vue-router'
import { useSupabase } from '../composables/useSupabase'
const { supabase } = useSupabase()
import { ref, onMounted, computed } from 'vue'  //onMounted é utilizado para exibir os resultados assim que a página carregar

const movimentacoes = ref([])
const erro = ref('')
const user = ref(null)
const router = useRouter()
const isAdmin = computed(() => user.value?.classe === 'Administrador')
const filtroTipo = ref('')
const busca = ref('')


async function controleClasses() {

    const { data: authData } = await supabase.auth.getUser()

    if (!authData?.user) {
        router.push('/Login')
        return
    }

    const userId = authData.user.id

    const { data: userData, error } = await supabase
        .from('usuarios')
        .select('classe')
        .eq('id', userId)
        .single()


    if (error) {
        console.error('Erro ao buscar dados do usuário:', error)
        return
    }

    user.value = userData
}


async function exibirMovimentacoes() {

    const { data: authData, erroAuth } = await supabase.auth.getUser()

    if (erroAuth) {
        console.log(erroAuth)
        return
    }

    let query = supabase
        .from('movimentacoes')
        .select('*')
        .order('data', { ascending: false })

    if (filtroTipo.value) {
        query = query.eq('tipo', filtroTipo.value)
    }

    if (busca.value) {
        query = query.ilike('usuario_nome', `%${busca.value}%`)
    }

    const { data: user, erroUser } = await supabase
        .from('usuarios')
        .select('classe')
        .eq('id', authData.user.id)
        .single()

    if (erroUser) {
        console.log(erroUser)
        return
    }

    if (user.classe == "Aluno" || user.classe == "Funcionario") {                     //Se for aluno ou funcionário vê apenas as suas movimentações
        const { data, error } = await supabase
            .from('movimentacoes')
            .select('*')
            .eq('usuario_id', authData.user.id)
            .order('data', { ascending: false })

        if (error) {
            erro.value = error.message
            console.log(`Error ${erro}`)            //Verificar se tem erro e exibir o erro no console
        }

        movimentacoes.value = data

    } else {                                                                            //Se for admin ou almoxarife vê todas as movimentações

        const { data, error } = await query

        if (error) {
            erro.value = error.message
            console.log(`Error ${erro}`)            //Verificar se tem erro e exibir o erro no console
        }

        movimentacoes.value = data     //Se não deu erro, usuários recebe a resposta do supabase
    }
}

function limparFiltros() {
    filtroTipo.value = ''
    exibirMovimentacoes()
}



onMounted(() => {
    controleClasses()
    exibirMovimentacoes()
})



</script>
