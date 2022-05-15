<template>
  <v-container fluid>
      <v-row>
        <v-data-table :items="vagasBuscadas" :headers="headers">
            <template v-slot:[`item.competencias`]="{ item }">
                <v-btn small color="primary" @click="verCompetenciasVaga(item)">Ver Competencias</v-btn>
                <!-- {{item.id_vaga}} -->
            </template>
        </v-data-table>
      </v-row>

      <v-dialog v-model="dialogCompetencias">
          <v-card>
              <v-card-text>
                    <v-card-title>Competencias da Vaga</v-card-title>
                    <VerCompetencias :key="competenciaIdVaga" :id_vaga="competenciaIdVaga" :role="usuario.usuario.role" :respostas="respostasCompetencias" />
              </v-card-text>
          </v-card>
      </v-dialog>

  </v-container>
</template>

<script>
import VerCompetencias from './VerCompetencias.vue'
export default {
    props:{
        token: String,
    },
    components:{
        VerCompetencias,
    },
    data(){
        return{
            usuario:null,
            vagasBuscadas:[],
            competenciaIdVaga: null,
            respostasCompetencias:[],
            inscricoesIdVaga: null,
            dialogCompetencias: false,
            dialogInscricoes: false,
            headers:[
                {text:'Data Criação',value:'Vaga.createdAt'},
                {text:'Empresa',value:'Vaga.Usuario.nome'},
                {text:'Descrição',value:'Vaga.descricao'},
                {text:'Cargo',value:'Vaga.cargo'},
                {text:'Cidade',value:'Vaga.cidade'},
                {text:'Forma de Contratação',value:'Vaga.forma_contratacao'},
                {text:'',value:'competencias'},
                {text:'',value:'inscricoes'},
                {text:'',value:'encerrar'},
            ]
        }
    },
    created(){
        this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    },
    mounted(){
        this.obterVagas();
    },
    methods:{
        obterVagas(){
            if(this.usuario){
                this.$axios.get('/vagas/respondidas',{headers:{'Authorization':`Bearer ${this.usuario.token}`}})
                .then(resp =>{
                    this.vagasBuscadas = resp.data;
                }).catch(err =>{
                    alert('Não foi possível obter vagas');
                    console.log(err);
                })
            }
        },
        verCompetenciasVaga(vaga){
            this.competenciaIdVaga = vaga.id_vaga;
            this.respostasCompetencias = vaga.RespostasCompetencias;
            this.dialogCompetencias = true;
        },
        verInscricoes(id_vaga){
            this.inscricoesIdVaga = id_vaga;
            this.dialogInscricoes = true;
        },
        encerrarVaga(id_vaga){
            alert(`Vaga ${id_vaga} ainda não pode ser encerrada`)
        }
    }
}
</script>

<style>

</style>