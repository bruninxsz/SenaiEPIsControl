<template>
    <div class="bg-gray-100">
        <h1 v-if="isAdmin || isAlmoxarife" class="mx-auto text-center font-bold text-gray-600 p-16">
            Estoque
        </h1>
        <h1 v-if="isAluno || isFuncionario" class="mx-auto text-center font-bold text-gray-600 p-16">
            Epis disponíveis
        </h1>

        <div class="flex flex-col">
            <div v-if="isAdmin || isAlmoxarife" class="flex justify-between mx-auto mt-12 mb-6 gap-[70px]">
                <select v-model="filtroStatus" @change="exibirEstoque" class="border p-2">
                    <option value="">Status:</option>
                    <option value="Disponível">Disponível</option>
                    <option value="Emprestado">Emprestado</option>
                    <option value="Vencido">Vencido</option>
                </select>

                <select id="tipo" v-model="filtroTipo" @change="exibirEstoque" class="border p-2">
                    <option value="">Tipo:</option>
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

                <button @click="limparFiltros" class="px-2 bg-red-700 rounded-lg shadow-lg text-white hover:bg-red-800">
                    Limpar filtros
                </button>
            </div>

            <table class="mx-auto w-[700px] border border-slate-400 z-20 shadow-lg mt-4">
                <thead class="bg-gray-700 text-white">
                    <tr>
                        <th class="p-3">Id Epi</th>
                        <th class="p-3">Tipo Epi</th>
                        <th class="p-3">Vencimento</th>
                        <th v-if="isAdmin || isAlmoxarife" class="p-3">Status</th>
                        <th v-if="isAdmin || isAlmoxarife" class="p-3">Deletar</th>
                    </tr>
                </thead>

                <tbody class="bg-gray-200">
                    <tr v-for="tipo_epi in epi" :key="tipo_epi.id" class="hover:bg-gray-100 items text-center">
                        <td class="p-3 text-center">{{ tipo_epi.id_epi }}</td>
                        <td class="p-3 text-center">{{ tipo_epi.tipo_epi }}</td>
                        <td class="p-3 text-center">{{ tipo_epi.vencimento }}</td>
                        <td v-if="isAdmin || isAlmoxarife" class="p-3 text-center">{{ tipo_epi.status }}</td>
                        <td v-if="isAdmin || isAlmoxarife" class="p-3">
                            <button @click="deletarEpi(tipo_epi.id_epi)">
                                <img src="../assets/Users/lixo.png" class="py-2 w-[3vh] mx-auto" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useSupabase } from "../composables/useSupabase";
const { supabase } = useSupabase();
import { ref, onMounted, computed } from "vue"; //onMounted é utilizado para exibir os resultados assim que a página carregar
import { useToast } from "vue-toastification"; //notificação da biblioteca do Vue

const router = useRouter();
const epi = ref([]);
const erro = ref("");
const carregando = ref(false);
const toast = useToast();
const user = ref("");
const isAdmin = computed(() => user.value?.classe === "Administrador");
const isAlmoxarife = computed(() => user.value?.classe === "Almoxarife");
const isFuncionario = computed(() => user.value?.classe === "Funcionario");
const isAluno = computed(() => user.value?.classe === "Aluno");
const filtroStatus = ref("");
const filtroTipo = ref("");

async function exibirEstoque() {
    let query = supabase.from("epi").select("*");

    if (filtroStatus.value) {
        query = query.eq("status", filtroStatus.value);
    }

    if(filtroTipo.value){
        query = query.eq("tipo_epi", filtroTipo.value)
    }

    const { data, error } = await query;

    if (error) {
        erro.value = error.message;
        console.log(`Error ${erro}`); //Verificar se tem erro e exibir o erro no console
    }

    epi.value = data; //Se não deu erro, epi recebe a resposta do supabase
    console.log(data);
}

async function controleClasses() {
    const { data: authData } = await supabase.auth.getUser();

    if (!authData?.user) {
        router.push("/Login");
        return;
    }

    const userId = authData.user.id;

    const { data: userData, error } = await supabase
        .from("usuarios")
        .select("classe")
        .eq("id", userId)
        .single();

    if (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        return;
    }

    user.value = userData;
}

async function deletarEpi(id) {
    if (!confirm("Tem certeza que deseja deletar este Epi?")) return;

    carregando.value = true;

    const { error } = await supabase //Contato com o supabase
        .from("epi")
        .delete()
        .eq("id_epi", id);

    if (error) {
        toast.error("Erro ao deletar Epi");
    } else {
        toast.success("Epi deletado com sucesso!");
        exibirEstoque(); // recarrega a tabela
    }

    carregando.value = false;
}

function limparFiltros() {
    filtroTipo.value = '';
    filtroStatus.value = "";
    exibirEstoque();
}

onMounted(() => {
    exibirEstoque();
    controleClasses();
});
</script>
