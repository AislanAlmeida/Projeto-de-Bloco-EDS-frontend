<template>
    <v-container>
        
        <v-card>
            <v-card-text>
                <v-form ref="formCadastroVaga" @submit="salvarVaga" v-model="valid">
                    <v-text-field outlined dense v-model="vaga.descricao" label="Descrição da vaga" :rules="rules.required"></v-text-field>
                    <v-row>
                        <v-col>
                            <v-text-field outlined dense v-model="vaga.cargo" label="Cargo" :rules="rules.required"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-select outlined dense v-model="vaga.area_atuacao" :items="areasAtuacao" label="Área de Atuação" :rules="rules.required"></v-select>

                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-select outlined dense v-model="vaga.forma_contratacao" :items="formasContratacao" label="Forma de Contração" :rules="rules.required"></v-select>
                        </v-col>
                        <v-col>
                            <v-text-field outlined v-model="vaga.data_validade" dense type="date" label="Data Limite Vaga" :min="dataHoje" :max="dataMaxima" :rules="rules.required"></v-text-field>
                        </v-col>
                    </v-row>
                    
                    <v-row>
                        <v-col>
                            <v-text-field outlined dense v-model="vaga.cidade" label="Cidade" :rules="rules.required"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-select outlined dense v-model="vaga.UF" :items="UFS" label="Estado" :rules="rules.required"></v-select>
                        </v-col>
                    </v-row>
                    <v-btn color="primary" @click="dialogCompetencia = true">Adicionar Competencia</v-btn>
                
                    <v-card class="mt-3">
                        <v-card-title>Competências da Vaga</v-card-title>
                        <v-card-text>
                            <v-data-table :items="vaga.competencias" :headers="headers">
                                <template v-slot:[`item.perfil`]="{item}">
                                    {{perfis[item.perfil - 1]}} {{`(${item.perfil})`}}
                                </template>
                                <template v-slot:[`item.peso`]="{item}">
                                    {{pesos[item.peso - 1]}}
                                </template>
                                <template v-slot:[`item.excluir`]="{item}">
                                    <v-icon color="error" @click="excluirCompetencia(item.id)">mdi-delete</v-icon>
                                </template>
                            </v-data-table>
                            <!-- <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>Perfil</th>
                                        <th>Peso</th>
                                        <th>Excluir</th>
                                        <th>Alterar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="competencia in vaga.competencias" :key="competencia.id">
                                        <td>{{competencia.nome}}</td>
                                        <td>{{competencia.descricao}}</td>
                                        <td>{{perfis[competencia.perfil - 1]}} - {{competencia.perfil}}</td>
                                        <td>{{competencia.peso}}</td>
                                        <td> <v-icon color="error" @click="excluirCompetencia(competencia.id)">mdi-delete</v-icon> </td>
                                    </tr>
                                </tbody>
                            </table> -->
                        </v-card-text>
                    </v-card>

                    <v-card class="mt-3">
                        <v-card-text class="text-center">
                            <v-btn color="success" type="submit" :disabled="vaga.competencias.length == 0">Salvar Vaga</v-btn>
                        </v-card-text>
                    </v-card>
                
                </v-form>
            </v-card-text>
        </v-card>


        <v-dialog v-model="dialogCompetencia" width="50%">
            <CompetenciaForm @adicionarCompetencia="adicionarCompetencia" />
        </v-dialog>
    </v-container>
</template>

<script>
import CompetenciaForm from '../competencias/CompetenciaForm.vue'
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
            valid: false,
            formasContratacao: ['CLT','CNPJ'],
            UFS: ['RJ','MG','ES','SP','PR','SC'],
            rules: {
                required:[value => !!value || 'Campo obrigatório.']
            },
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
            pesos: ['Desejavel (Peso 1)','Importante (Peso 2)','Muito Importante (Peso 3)','Indispensável (Peso 4)','Obrigatório (Peso 5)'],
            vaga:{
                cargo:'',
                descricao: '',
                forma_contratacao: '',
                area_atuacao: '',
                data_validade: '',
                cidade: '',
                UF: '',
                competencias: [],
            },
            headers:[
                {text:'Competência',value:'nome'},
                {text:'Descrição',value:'descricao'},
                {text:'Perfil Esperado',value:'perfil'},
                {text:'Peso',value:'peso'},
                {text:'Excluir',value:'excluir'},
            ]
        }
    },
    methods:{
        adicionarCompetencia(competencia){
            competencia.id = this.vaga.competencias.length + 1;
            this.vaga.competencias.push(competencia);
            this.dialogCompetencia = false;
        },

        salvarVaga(evt){
            evt.preventDefault();
            if(this.$refs.formCadastroVaga.validate()){

                const usuario = JSON.parse(sessionStorage.getItem('usuario'));
                if(usuario){
                    this.$axios.post('/vagas',this.vaga,{headers:{'Authorization':`Bearer ${usuario.token}`}})
                    .then(() => {
                        alert('Vaga salva com sucesso');
                        this.$router.push('/buscar-vagas');
                    }).catch(err =>{
                        alert('Não foi possível salvar vaga');
                        console.log(err);
                    })
                }
            }else{
                alert('É necessário preencher todos os campos obrigatórios');
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