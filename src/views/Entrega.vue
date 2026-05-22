<template>
    <div class="bg-gray-100">

        <div class="flex flex-row gap-[25%]"> <!--Justificar por linha (Flex-col - coluna e Flex-row - linha)-->

            <div class="">

            </div>

            <div class="mt-6">

                <form @submit.prevent="realizarEntrega"
                    class="flex flex-col bg-gray-300 p-10 shadow-xl max-w-3xl mx-auto rounded-xl mt-16">

                    <div class="text-black font-medium text-center text-2xl">Registrar Entrega</div>

                    <div class="flex justify-between items-center mt-16">
                        <label for="epi">Digite o ID do Epi:</label>
                        <input type="number" id="epi" v-model="epi"
                            class="ml-3 px-4 py-3 shadow-md bg-white w-96 rounded-xl text-black text-md"></input>
                    </div>

                    <div class="flex justify-between items-center mt-8">
                        <label for="email">Email do recebedor:</label>
                        <input type="email" id="email" v-model="email"
                            class="ml-3 px-4 py-3 shadow-md bg-white w-96 rounded-xl text-black text-md"></input>
                    </div>

                    <div class="flex justify-between items-center mt-8">
                        <label for="classe">Assinaturas:</label>
                        <select id="classe" v-model="assinaturas"
                            class="ml-3 px-4 py-3 shadow-md bg-white w-96 text-black text-md">

                            <option value="" disabled>Selecione uma opção</option>
                            <option value="1">Realizadas</option>
                            <option value="0">Não realizadas</option>

                        </select>
                    </div>

                    <div class="flex justify-between items-center mt-8">
                        <label for="observacoes">Digite suas observações:</label>
                        <input type="text" id="observacoes" v-model="observacoes"
                            class="ml-3 px-4 py-3 shadow-md bg-white w-96 rounded-xl text-black text-md"></input>
                    </div>



                    <button type="submit"
                        class="botao-cadastro mx-auto bg-red-700 py-3 w-64 text-white font-bold rounded-md mt-24 hover:bg-red-800 hover:scale-[1.01]"
                        :disabled="carregando">Entregar</button>


                </form>

            </div>
        </div>

    </div>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabase } from '../composables/useSupabase'
import { useToast } from "vue-toastification" //notificação da biblioteca do Vue

const { supabase } = useSupabase()
const router = useRouter()

const epi = ref('')
const assinaturas = ref('')
const observacoes = ref('')
const email = ref('')
const erro = ref('')
const carregando = ref(false)
const epiId = ref('')
const toast = useToast()

async function realizarEntrega() {
    erro.value = ''

    // Validação básica (Vendo se todos os campos foram preenchidos)
    if (!epi.value || !email.value || !assinaturas.value || !observacoes.value) {
        toast.warning('Por favor, preencha todos os campos.') //Exibe uma notificação de aviso usando a biblioteca de toast
        return
    }



    carregando.value = true

    try {

        const { data: epiData, error: epiError } = await supabase
            .from('epi')
            .select('id_epi, status')
            .eq('id_epi', Number(epi.value))
            .maybeSingle()

        if (!epiData) {
            toast.error('EPI não encontrado')
            console.log('Erro ao buscar EPI: ', epiError)
            return
        }

        if (epiError) {
            toast.error('Erro ao buscar Epi')
            console.log('Erro ao buscar Epi', epiError)
            return
        }

        if (epiData.status !== 'Disponível') {
            toast.error('Epi indisponível, por favor escolha outra!')
            return
        }

        


        const { data: usuario, error: erroUsuario } = await supabase
            .from('usuarios')
            .select('id')
            .eq('email', email.value)
            .single()

        if (erroUsuario) {
            toast.error('Erro ao buscar usuário')
            console.log(erroUsuario)
            return
        }

        if (!usuario) {
            toast.error('Usuário não encontrado')
            return
        }



        
        const { error } = await supabase

            .from('entregas')
            .insert([                                   //insert tradicional

                {
                    epi_id: epi.value,
                    emprestado_por_id: usuario.id,
                    assinaturas: assinaturas.value,
                    observacoes: observacoes.value,

                }
            ])



        if (error) {
            toast.error('Ocorreu um erro ao cadastrar a entrega.') //Exibe uma notificação de erro usando a biblioteca de toast
            console.error('Erro do Supabase:', error)
            erro.value = `Error: ${error.message}`
            return                                      //Erro na requisição
        }

        if (!error) {
            toast.success('Entrega cadastrada com sucesso!')

            const { error: updateError } = await supabase
                .from('epi')
                .update({ status: 'Emprestado' })
                .eq('id_epi', Number(epi.value))



            if (updateError) {
                console.log('Erro ao atualizar status do Epi', updateError)
            }

            epi.value = ''         //Limpando os dados para próximos cadastros
            assinaturas.value = ''
            observacoes.value = ''
            erro.value = ''

        }

    }
    catch (err) {
        toast.error('Ocorreu um erro inesperado.') //Exibe uma notificação de erro usando a biblioteca de toast
        erro.value = 'Erro inesperado'   //Captura erros inesperados
        console.error(err)
    }

    finally {
        carregando.value = false      //Depois de dar certo ou errado, libera o uso do botão
    }


}



</script>
