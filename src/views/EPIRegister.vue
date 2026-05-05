<template>
    <div class="bg-gray-100">

        <div class="flex flex-row gap-[25%]"> <!--Justificar por linha (Flex-col - coluna e Flex-row - linha)-->

            <div class="">

            </div>

            <div class="mt-6">

                <form @submit.prevent="cadastrarEpi"
                    class="flex flex-col bg-gray-300 p-10 shadow-xl max-w-3xl mx-auto rounded-xl mt-32">

                    <div class="text-black font-medium text-center text-2xl">Cadastrar EPI</div>

                    <div class="flex items-center mx-auto mt-8">
                        <label for="tipo">Tipo do EPI:</label>
                        <select id="tipo" v-model="tipo"
                            class="ml-3 px-4 py-3 shadow-md bg-white w-96 text-black text-md">

                            <option value="Capacete">Capacete</option>
                            <option value="OculosSeguranca">Óculos de Segurança</option>
                            <option value="OculosSolda">Óculos de Solda</option>
                            <option value="ProtetorFacial">Protetor Facial</option>
                            <option value="MascaraSolda">Máscara de Solda</option>
                            <option value="RespiradorDescartavel">Respirador Descartável (PFF2)</option>
                            <option value="RespiradorCartucho">Respirador com Cartucho</option>
                            <option value="ProtetorAuricularPlug">Protetor Auricular (Plug)</option>
                            <option value="ProtetorAuricularConcha">Protetor Auricular (Concha)</option>
                            <option value="LuvaRaspa">Luva de Raspa</option>
                            <option value="LuvaLatex">Luva de Látex</option>
                            <option value="LuvaNitrilica">Luva Nitrílica</option>
                            <option value="LuvaIsolante">Luva Isolante (Elétrica)</option>
                            <option value="AventalRaspa">Avental de Raspa</option>
                            <option value="AventalPVC">Avental de PVC</option>
                            <option value="PerneiraRaspa">Perneira de Raspa</option>
                            <option value="Mangote">Mangote de Proteção</option>
                            <option value="Bota">Bota Bico de Aço</option>
                            <option value="BotaPVC">Bota de PVC</option>
                            <option value="SapatoSeguranca">Sapato de Segurança</option>
                            <option value="CintoSeguranca">Cinto de Segurança (Tipo Paraquedista)</option>
                            <option value="Talabarte">Talabarte</option>
                            <option value="TravaQuedas">Trava-Quedas</option>
                            <option value="ColeteRefletivo">Colete Refletivo</option>
                            <option value="CapuzSolda">Capuz para Solda</option>
                            <option value="BlusaoProtecao">Blusão de Proteção</option>
                            <option value="CalcaProtecao">Calça de Proteção</option>

                        </select>
                    </div>

                    <div class="flex items-center mx-auto mt-8">
                        <label for="quantidade">Quantidade:</label>
                        <select id="quantidade" v-model="quantidade"
                            class="ml-3 px-4 py-3 shadow-md bg-white w-96 text-black text-md">

                            <option value="" disabled>Selecione uma opção</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>                           

                        </select>
                    </div>

                    <div class="flex items-center mx-auto mt-8">
                        <label for="vencimento">Vencimento:</label>
                        <input type="date" v-model="vencimento"
                            class="ml-3 px-4 py-3 shadow-md bg-white w-96 text-black text-md">

                    </input>
                    </div>


                    <button type="submit"
                        class="botao-cadastro mx-auto bg-red-700 py-3 w-64 text-white font-bold rounded-md mt-24 hover:bg-red-800 hover:scale-[1.01]"
                        :disabled="carregando">Cadastrar</button>


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

const tipo = ref('')
const quantidade = ref('')
const vencimento = ref('')

const erro = ref('')
const carregando = ref(false)
const toast = useToast( )

async function cadastrarEpi() {
    erro.value = ''

    if (!tipo.value || !quantidade.value || !vencimento.value) {
        toast.warning('Preencha todos os campos para prosseguir!')
        return
    }

    carregando.value = true

    try {
        const epi = []         //Uso de arrays para inserir vários epis de uma só vez

        for (let i = 0; i < Number(quantidade.value); i++) {        //repete o insert enquanto i for menor que a quantidade inserida
            epi.push({
                tipo_epi: tipo.value,
                vencimento: vencimento.value
            })
        }

        const { error } = await supabase
            .from('epi')
            .insert(epi)

        if (error) {
            console.error(error)
            toast.error('Erro ao cadastrar EPI')
            return
        }

        toast.success('EPIs cadastrados com sucesso!')

        tipo.value = ''
        quantidade.value = ''
        vencimento.value = ''

    } catch (err) {
        console.error(err)
        toast.error('Erro inesperado')
    } finally {
        carregando.value = false
    }
}



</script>
