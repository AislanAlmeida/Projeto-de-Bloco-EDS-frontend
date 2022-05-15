<template>
    <v-container>
        
        <v-card>
            <v-card-text>
                <!-- cargo,cidade,forma_contratacao,UF,descricao,data_validade,area_atuaca-->
                <v-form>
                    <v-text-field outlined dense v-model="vaga.descricao" label="Descrição da vaga"></v-text-field>
                    <v-row>
                        <v-col>
                            <v-text-field outlined dense v-model="vaga.cargo" label="Cargo"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-select outlined dense v-model="vaga.area_atuacao" :items="areasAtuacao" label="Área de Atuação"></v-select>

                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-select outlined dense v-model="vaga.forma_contratacao" :items="formasContratacao" label="Forma de Contração"></v-select>
                        </v-col>
                        <v-col>
                            <v-text-field outlined v-model="vaga.data_validade" dense type="date" label="Data Limite Vaga" :min="dataHoje" :max="dataMaxima"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field outlined dense v-model="vaga.cidade" label="Cidade"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-select outlined dense v-model="vaga.UF" :items="UFS" label="Estado"></v-select>
                        </v-col>
                    </v-row>
                        <v-btn color="primary" @click="dialogCompetencia = true">Adicionar Competencia</v-btn>
                </v-form>
            </v-card-text>
        </v-card>

        <v-card class="mt-3">
            <v-card-title>Competências da Vaga</v-card-title>
            <v-card-text>
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Perfil</th>
                            <th>Peso</th>
                            <th>Excluir</th>
                            <th>Alterar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="competencia in vaga.competencias" :key="competencia.id">
                            <td>{{competencia.descricao}}</td>
                            <td>{{perfis[competencia.perfil - 1]}} - {{competencia.perfil}}</td>
                            <td>{{competencia.peso}}</td>
                            <td> <v-icon color="error" @click="excluirCompetencia(competencia.id)">mdi-delete</v-icon> </td>
                            <td> <v-icon color="primary">mdi-pencil</v-icon> </td>
                        </tr>
                    </tbody>
                </table>
            </v-card-text>
        </v-card>

        <v-card class="mt-3">
            <v-card-text class="text-center">
                <v-btn color="success" @click="salvarVaga()" :disabled="vaga.competencias.length == 0">Salvar Vaga</v-btn>
            </v-card-text>
        </v-card>

        <v-dialog v-model="dialogCompetencia" width="50%">
            <CompetenciaForm @adicionarCompetencia="adicionarCompetencia" />
        </v-dialog>
    </v-container>
</template>

<script>
import CompetenciaForm from '../components/CompetenciaForm.vue'
export default {
    props:{
        token: String,
    },
    components:{
        CompetenciaForm,
    },
    beforeMount(){
        const usuario = JSON.parse(sessionStorage.getItem('usuario'));
        if(usuario.usuario.role == 'candidato'){
            this.$router.push('/');
        }
    },
    mounted(){
        this.vaga.data_validade = this.dataHoje;
    },
    data(){
        return{
            formasContratacao: ['CLT','CNPJ'],
            UFS: ['RJ','MG','ES','SP','PR','SC'],
            areasAtuacao:[    
                {text:'Gestão',value:'gestao'},
                {text:'InfraEstrutura',value:'infra_estrutura'},
                {text:'Desenvolvimento',value:'desenvolvimento'},
                {text:'BancoDeDados',value:'banco_de_dados'},
                {text:'Segurança',value:'seguranca'},
                {text:'Design',value:'design'}
            ],
            dialogCompetencia: false,
            perfis: ['Nenhum','Pouco','Bom','Muito Bom','Excelente'],
            vaga:{
                cargo:'',
                descricao: '',
                forma_contratacao: '',
                area_atuacao: '',
                data_validade: '',
                cidade: '',
                UF: '',
                competencias: [],
            }
        }
    },
    methods:{
        adicionarCompetencia(competencia){
            competencia.id = this.vaga.competencias.length + 1;
            this.vaga.competencias.push(competencia);
            this.dialogCompetencia = false;
        },

        salvarVaga(){
            const usuario = JSON.parse(sessionStorage.getItem('usuario'));
            if(usuario){
                console.log(usuario.token);
                this.$axios.post('/vagas',this.vaga,{headers:{'Authorization':`Bearer ${usuario.token}`}})
                .then(resp => {
                    alert('Vaga salva com sucesso');
                    console.log(resp.data);
                }).catch(err =>{
                    alert('Não foi possível salvar vaga');
                    console.log(err);
                })
            }
        },

        excluirCompetencia(id){
            let index = this.vaga.competencias.findIndex(v => v.id == id);
            if(index !== -1){
                this.vaga.competencias.splice(index,1);
            }
        },

    },
    computed:{

        dataHoje(){
            let data = new Date();
            return `${data.getFullYear()}-${String(data.getMonth()+1).padStart(2,"0")}-${String(data.getDate()).padStart(2,"0")}` 
        },
        dataMaxima(){
            let data = new Date();
            data.setDate(data.getDate() + 30);
            return `${data.getFullYear()}-${String(data.getMonth()+1).padStart(2,"0")}-${String(data.getDate()).padStart(2,"0")}` 
        }
    }
}
</script>

<style>

</style>