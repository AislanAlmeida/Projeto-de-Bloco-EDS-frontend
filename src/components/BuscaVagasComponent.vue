<template>
  <v-container fluid>

      <v-row class="text-center justify-content-center">
          <h2>Filtros</h2>
            <v-text-field class="ma-2" v-model="filtros.cidade" outlined dense label="Cidade"></v-text-field>
            <v-text-field class="ma-2" v-model="filtros.UF" outlined dense label="Estado"></v-text-field>
            <v-text-field class="ma-2" v-model="filtros.cargo" outlined dense label="Cargo"></v-text-field>
            <v-select class="ma-2" v-model="filtros.area_atuacao" outlined dense :items="areasAtuacao" label="Área de Atuação"></v-select>
            <v-select class="ma-2" v-model="filtros.status" outlined dense :items="[{text:'todas',value:''},'ativa','encerrada','expirada','cancelada']" label="Status"></v-select>
      </v-row>
      <v-row class="text-center justify-content-center">
        <v-btn color="primary" class="ma-2" small @click="obterVagas()" :loading="loadingData">Buscar Vagas</v-btn>
        <v-btn color="success" class="ma-2" small @click="obterMinhasVagas()" v-if="usuario.usuario.role == 'empresa'">Buscar Minhas Vagas</v-btn>
      </v-row>

    <v-divider></v-divider>

      <v-row class="text-center justify-content-center" dense>
        <v-data-table :items="vagasBuscadas" :headers="headers" :loading="loadingData" dense>
            <template v-slot:[`item.status`]="{ item }">
                <v-chip small :color="item.status == 'ativa' ? 'success' : item.status == 'cancelada' ? 'error': item.status == 'expirada' ? 'orange' : 'deep-orange'" >{{item.status}}</v-chip>
            </template>
            <template v-slot:[`item.competencias`]="{ item }">
                <v-btn small color="primary" @click="verCompetenciasVaga(item.id,usuario.usuario.id == item.id_usuario)" :disabled="usuario.usuario.role=='candidato' && item.status != 'ativa'">{{usuario.usuario.role == 'candidato' ? 'Responder':'Competencias'}}</v-btn>
            </template>
            <template v-slot:[`item.inscricoes`]="{ item }">
                <v-btn color="success" small @click="verInscricoes(item.id)" v-if="usuario.usuario.role == 'empresa' && usuario.usuario.id == item.id_usuario">Inscrições</v-btn>
            </template>
            <template v-slot:[`item.encerrar`]="{ item }">
                <v-btn color="deep-orange" small @click="encerrarVaga(item.id)" v-if="usuario.usuario.role == 'empresa' && usuario.usuario.id == item.id_usuario && item.status == 'ativa'">Encerrar</v-btn>
                <v-btn color="deep-orange" outlined small @click="reativarVaga(item.id)" v-if="usuario.usuario.role == 'empresa' && usuario.usuario.id == item.id_usuario && item.status == 'expirada'">Reativar</v-btn>
            </template>
            <template v-slot:[`item.cancelar`]="{ item }">
                <v-btn outlined color="error" small @click="cancelarVaga(item.id)" v-if="usuario.usuario.role == 'empresa' && usuario.usuario.id == item.id_usuario && item.status == 'ativa'">Cancelar</v-btn>
            </template>
        </v-data-table>
      </v-row>

      <v-dialog v-model="dialogCompetencias">
          <v-card>
              <v-card-text>
                    <v-card-title>Competencias da Vaga</v-card-title>
                    <VerCompetencias :key="competenciaIdVaga" :id_vaga="competenciaIdVaga" :role="usuario.usuario.role" :mostrarPerfis="mostrarPerfis" @salvarResposta="salvarResposta" />
              </v-card-text>
          </v-card>
      </v-dialog>

      <v-dialog v-model="dialogInscricoes">
          <v-card>
              <v-card-text>
                    <v-card-title>Inscrições da Vaga</v-card-title>
                    <VerInscricoes :key="inscricoesIdVaga" :id_vaga="inscricoesIdVaga" />
              </v-card-text>
          </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
import VerCompetencias from './VerCompetencias.vue'
import VerInscricoes from './VerInscricoes.vue'
export default {
    props:{
        token: String,
    },
    components:{
        VerCompetencias,
        VerInscricoes,
    },
    data(){
        return{
            loadingData:false,
            usuario:null,
            vagasBuscadas:[],
            competenciaIdVaga: null,
            mostrarPerfis:false,
            inscricoesIdVaga: null,
            dialogCompetencias: false,
            dialogInscricoes: false,
            filtros:{
                cidade:'',
                UF:'',
                cargo:'',
                area_atuacao:'',
                id_usuario:'',
                status:'ativa',
            },
            headers:[
                // {text:'ID',value:'id'},
                {text:'Data Criação',value:'createdAt'},
                {text:'Data Validade',value:'data_validade'},
                {text:'Empresa',value:'Usuario.nome'},
                {text:'Descrição',value:'descricao'},
                {text:'Cargo',value:'cargo'},
                {text:'Área de Atuação',value:'area_atuacao'},
                {text:'Cidade',value:'cidade'},
                {text:'Forma de Contratação',value:'forma_contratacao'},
                {text:'Status',value:'status'},
                {text:'',value:'competencias'},
                {text:'',value:'inscricoes'},
                {text:'',value:'encerrar'},
                {text:'',value:'cancelar'},
            ],
            areasAtuacao:[    
                {text:'Gestão',value:'gestao'},
                {text:'InfraEstrutura',value:'infra_estrutura'},
                {text:'Desenvolvimento',value:'desenvolvimento'},
                {text:'BancoDeDados',value:'banco_de_dados'},
                {text:'Segurança',value:'seguranca'},
                {text:'Design',value:'design'}
            ],
        }
    },
    created(){
        this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
        // this.obterVagas();
    },
    methods:{
        obterVagas(){
            this.loadingData = true;
            this.vagasBuscadas = [];
            if(this.usuario){
                this.$axios.get('/vagas',{
                    params:{
                        cidade: this.filtros.cidade,
                        UF: this.filtros.UF,
                        cargo: this.filtros.cargo,
                        area_atuacao: this.filtros.area_atuacao,
                        status: this.filtros.status
                    },headers:{'Authorization':`Bearer ${this.usuario.token}`}})
                .then(resp =>{

                    if(resp.data != ''){

                        this.vagasBuscadas = resp.data;
                    }else{
                        alert('Nenhuma vaga encontrada')
                    }
                    this.loadingData = false;

                }).catch(err =>{
                    alert('Não foi possível obter vagas');
                    console.log(err);
                    this.loadingData = false;
                })
            }
            
        },
        obterMinhasVagas(){
            this.vagasBuscadas = [];
            this.loadingData = true;
            if(this.usuario){
                this.$axios.get('/vagas',{
                    params:{
                        cidade: this.filtros.cidade,
                        UF: this.filtros.UF,
                        cargo: this.filtros.cargo,
                        area_atuacao: this.filtros.area_atuacao,
                        status: this.filtros.status,
                        id_usuario: this.usuario.usuario.id,
                    },headers:{'Authorization':`Bearer ${this.usuario.token}`}})
                .then(resp =>{

                    if(resp.data != ''){

                        this.vagasBuscadas = resp.data;
                    }else{
                        alert('Nenhuma vaga encontrada')
                    }

                    this.loadingData = false;

                }).catch(err =>{
                    alert('Não foi possível obter vagas');
                    console.log(err);
                    this.loadingData = false;
                })
            }
        },
        verCompetenciasVaga(id_vaga,mostrarPerfis){
            this.mostrarPerfis = mostrarPerfis;
            this.competenciaIdVaga = id_vaga;
            this.dialogCompetencias = true;
        },
        verInscricoes(id_vaga){
            this.inscricoesIdVaga = id_vaga;
            this.dialogInscricoes = true;
        },
        encerrarVaga(id_vaga){
            this.$axios.post('/vagas/encerrar',{id_vaga:id_vaga},{headers:{'Authorization':`Bearer ${this.usuario.token}`}})
            .then(resp => {
                alert('Vaga encerrada');
                console.log(resp.data);
                this.obterVagas();
            }).catch(err => {
                console.log(err);
            })
        },
        cancelarVaga(id_vaga){
            this.$axios.post('/vagas/cancelar',{id_vaga:id_vaga},{headers:{'Authorization':`Bearer ${this.usuario.token}`}})
            .then(resp => {
                alert('Vaga cancelada');
                console.log(resp.data);
                this.obterVagas();
            }).catch(err => {
                console.log(err);
            })
        },
        reativarVaga(id_vaga){
            this.$axios.post('/vagas/reativar',{id_vaga:id_vaga},{headers:{'Authorization':`Bearer ${this.usuario.token}`}})
            .then(resp => {
                alert('Vaga reativada');
                console.log(resp.data);
                this.obterVagas();
            }).catch(err => {
                console.log(err);
            })
        },
        salvarResposta(){
            alert('Alerta propagado!');
            this.dialogCompetencias = false;
            this.obterVagas();
        },

    }
}
</script>

<style>

</style>