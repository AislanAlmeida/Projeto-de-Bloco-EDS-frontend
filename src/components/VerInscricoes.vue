<template>
  <div>
      <v-container>
          <v-row dense>
              <v-col cols="12" md="4" v-for="inscricao in inscricoes" :key="inscricao.id">
                <v-card class="mt-3" >
                    <v-card-text>
                            <v-card-title class="text-center">Candidato: {{inscricao.candidato.nome}}</v-card-title>
                            <p><strong>Ranking: </strong> {{inscricao.ranking}}</p>
                            <p><strong>Data Resposta: </strong> {{new Date(inscricao.dataResposta).toLocaleDateString('pt-br')}}</p>
                            <v-btn class="mx-2 mb-3" color="primary" small @click="candidato = !candidato">{{candidato ? 'ocultar':'ver'}}{{' perfil'}}</v-btn>
                            <v-btn class="mx-2 mb-3" color="primary" outlined small @click="respostas = !respostas">ver respostas</v-btn>
                            <!-- {{inscricao.vaga.competencias[0]}} -->
                        <v-row>
                        </v-row>
                    </v-card-text>
                    <v-card v-if="candidato" class="mt-2 mx-2">
                        <v-card-text>
                            <v-card-title>Perfil Candidato</v-card-title>
                            <p><strong>Nome: </strong>{{inscricao.candidato.nome}}</p>
                            <p><strong>Endereço: </strong>{{inscricao.candidato.endereco}}</p>
                            <p><strong>Cidade: </strong>{{inscricao.candidato.cidade}}</p>
                            <p><strong>UF: </strong>{{inscricao.candidato.UF}}</p>
                            <p><strong>Telefone: </strong>{{inscricao.candidato.telefone}}</p>
                            <p><strong>Email: </strong>{{inscricao.candidato.email}}</p>
                            <p><strong>Instagram: </strong><a :href="inscricao.candidato.instagram" target="_blank" >{{inscricao.candidato.instagram}}</a></p>
                            <p><strong>Linkedin: </strong><a :href="inscricao.candidato.linkedin" target="_blank" >{{inscricao.candidato.linkedin}}</a></p>
                        </v-card-text>
                    </v-card>
                    <v-card v-if="respostas" class="mt-2 mx-2">
                        <v-card-text>
                            <div v-for="competencia in inscricao.vaga.competencias" :key="competencia.id">
                                <v-card-title>{{competencia.nome}}</v-card-title>
                                <p>{{competencia.descricao}}</p>
                                    <v-chip class="ma-2" :color="obterCores(competencia.resposta_competencia.resposta)">{{obterPerfilResposta(competencia.resposta_competencia.resposta)}}</v-chip>
                                <v-divider></v-divider>
                                <!-- {{competencia}} -->
                            </div>
                        </v-card-text>
                    </v-card>
                </v-card>
              </v-col>
          </v-row>
      </v-container>
  </div>
</template>

<script>
export default {
    props:{
        id_vaga:Number
    },
    data(){
        return{
            usuario:null,
            inscricoes:[],
            candidato:false,
            respostas:false,
            perfilRespostas:[
                {text:'Excelente',value:5,color:'teal'},
                {text:'Muito Bom',value:4,color:'cyan'},
                {text:'Bom',value:3,color:'lime'},
                {text:'Pouco',value:2,color:'deep-orange'},
                {text:'Nenhum/Muito Pouco',value:1,color:'red'},
            ]
            
        }
    },
    mounted(){
        this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    },
    created(){
        console.log(`Obtendo inscricoes da vaga ${this.id_vaga}`);
        
        this.$nextTick(() =>{
            this.obterInscricoes();
        });
    },
    beforeDestroy(){
        console.log(`Destruindo componente`)
        this.inscricoes = [];
    },
    methods:{
        obterInscricoes(){
            this.inscricoes = [];
            this.$axios.get(`/responder/${this.id_vaga}`,{headers:{'Authorization':`Bearer ${this.usuario.token}`}})
            .then(resp =>{
                this.inscricoes = resp.data;
                if(this.inscricoes.length == 0){
                    alert('Nenhuma inscrição para esta vaga');
                }
                if(this.inscricoes.length > 0){
                    this.inscricoes.sort((a,b) => b.ranking - a.ranking);
                }
            }).catch(err =>{
                console.log(err);
                alert('Não foi possível buscar as inscrições');
            })
        },
        obterPerfilResposta(resposta){
            let resp = this.perfilRespostas.find(p => p.value == resposta);
            if(resp){
                return resp.text;
            }else{
                return '## Sem Resposta ##'
            }
        },
        obterCores(resposta){
            let resp = this.perfilRespostas.find(p => p.value == resposta);
            if(resp){
                return resp.color;
            }else{
                return 'secondary'
            }
        }
    },

}
</script>

<style>

</style>