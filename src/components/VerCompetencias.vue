<template>
  <div>
      <v-container>
          <v-row dense>
              <v-col cols="12" md="4" v-for="competencia in competencias" :key="competencia.id">
                <v-card class="mt-3 h-100" >
                    <v-card-text>
                        <v-row>
                            <v-col>
                                <v-card-title>{{competencia.nome}}</v-card-title>
                                <small>{{competencia.descricao}}</small>
                                <v-card v-if="mostrarPerfis">
                                    <v-card-text>
                                        <p><strong>Peso: </strong>{{competencia.peso}}</p>
                                        <p><strong>Perfil Desejado: </strong> <v-chip :color="perfis.find(p => p.value == competencia.perfil-1).color"> {{perfis.find(p => p.value == competencia.perfil-1).text}}</v-chip></p>
                                    </v-card-text>
                                </v-card>
                                <hr>
                                <v-select v-if="role=='candidato' && routePage=='/buscar-vagas'" :items="perfis" v-model="competencia.resposta" label="Seu conhecimento"></v-select>
                                <div v-if="routePage=='/buscar-vagas-respondidas'">
                                    <p><strong>Resposta: </strong> 
                                    <v-chip :color="perfis.find(p => p.value == (respostas.find(c => c.id_competencia == competencia.id).resposta)).color"> 
                                        {{perfis.find(p => p.value == (respostas.find(c => c.id_competencia == competencia.id).resposta)).text }} 
                                    </v-chip></p>
                                    <!-- <p><strong>Resposta: </strong> <v-chip :color="perfis.find(p => p.value == resposta.find(c => c.id_competencia == competencia.id).resposta).color"> {{perfis.find(p => p.value == competencia.perfil-1).text}}</v-chip></p> -->
                                </div>
                                <!-- <v-btn class="mb-3" color="primary" outlined small @click="respostas = !respostas">ver respostas</v-btn> -->
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>


              </v-col>
          </v-row>
        <v-row dense>
            <v-col>
                <v-btn class="mt-3" color="primary" @click="salvarResposta()" v-if="role == 'candidato' && routePage=='/buscar-vagas'">Salvar Resposta</v-btn>
            </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
export default {
    props:{
        id_vaga: Number,
        role: String,
        mostrarPerfis: Boolean,
        respostas: Array
    },
    data(){
        return{
            routePage:'',
            competencias:[],
            perfis:[
                {text:'Excelente',value:5,color:'teal'},
                {text:'Muito Bom',value:4,color:'cyan'},
                {text:'Bom',value:3,color:'lime'},
                {text:'Pouco',value:2,color:'deep-orange'},
                {text:'Nenhum/Muito Pouco',value:1,color:'red'},
            ]
        }
    },
    mounted(){
        this.obterCompetencias();
        this.routePage = this.$route.fullPath;
    },
    methods:{
        obterCompetencias(){
            this.$axios.get(`/competencias/${this.id_vaga}`)
            .then(resp =>{
                this.competencias = resp.data;
            }).catch(err =>{
                console.log(err);
            })
        },
        salvarResposta(){
            const usuario = JSON.parse(sessionStorage.getItem('usuario'));
            if(usuario){
                if(!this.faltouResposta()){
                    this.$axios.post(`/responder/`,{id_vaga:this.id_vaga,competencias:this.competencias},{headers:{'Authorization':`Bearer ${usuario.token}`}}).then(resp =>{
                        console.log(resp.data);
                        alert('Resposta salva com sucesso!!');
                        this.$emit('salvarResposta');
                    }).catch(err =>{
                        console.log(err);
                    })
                }else{
                    alert('Atenção! Existem competencias sem resposta');
                }
            }else{
                alert('Sessão expirada');
                
            }
        },
        faltouResposta(){
            console.log(this.competencias.filter(r => !r.resposta));
            return this.competencias.filter(r => !r.resposta).length > 0
        },
        obterCores(resposta){
            let resp = this.perfilRespostas.find(p => p.value == resposta);
            if(resp){
                return resp.color;
            }else{
                return 'secondary'
            }
        }
    }
}
</script>

<style>

</style>