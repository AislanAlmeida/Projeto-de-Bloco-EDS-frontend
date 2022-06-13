<template>
    <v-app>
      <v-container>
      <div>
        <HeaderBanners />
      </div>
      <v-card>
        <v-card-text >
          <h2 class="text-center"> Assertividade nos processos seletivos</h2>
        
          <article>
          <p>

            As empresas tradicionais de RH sofrem com a seleção de candidatos para setor de T.I.
            devido as dificuldades técnicas e complexidades específicas da área, onde a seleção de 
            profissionais capacitados para as vagas solicitadas se tornam muito complexas.
          </p>
          <p>

            Diante deste cenário fica evidente a necessidade da inovação na seleção de talento para vagas 
            específicas do setor de TI, reduzindo o tempo e selecionando melhor os candidatos certos para a 
            vaga certa, aumentando cada vez mais a eficiência do crescimento do setor acompanhando 
            assim a evolução da necessidade das empresas.
          </p>
          <p>

            O público alvo do sistema são empresas que desejam publicar vagas de tecnologia e realizar 
            processos seletivos para contratação de mão-de-obra qualificada.
          </p>
          </article> 

        </v-card-text>
      </v-card>
      <v-row dense>
        <v-col cols="12">
          <VagasRecentes />
        </v-col>
      </v-row>
      <v-row dense v-if="relatorios.quantidade_vagas_criadas">
      <v-col>
        <v-card :loading="loading" v-if="usuario ? usuario.usuario.role == 'admin' : false">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="3"><BaseComponent :mensagem="'Quantidade de Vagas criadas'" :valor="relatorios.quantidade_vagas_criadas"/></v-col>
              <v-col cols="12" md="3"><BaseComponent :mensagem="'Quantidade de Vagas respondidas'" :valor="relatorios.quantidade_vagas_respondidas"/></v-col>
              <v-col cols="12" md="3"><BaseComponent :mensagem="'Quantidade de Vagas criadas HOJE'" :valor="relatorios.quantidade_vagas_criadas_hoje"/></v-col>
              <v-col cols="12" md="3"><BaseComponent :mensagem="'Quantidade de Vagas respondidas HOJE'" :valor="relatorios.quantidade_vagas_respondidas_hoje"/></v-col>
              <v-col cols="12" md="3"><BaseComponent :mensagem="'Quantidade de Usuarios inscritos HOJE'" :valor="relatorios.quantidade_usuarios_inscritos_hoje"/></v-col>
              <v-col cols="12" md="3"><BaseComponent :mensagem="'Quantidade de Candidatos Cadastradas'" :valor="relatorios.quantidade_usuarios_inscritos.find(u => u.role == 'candidato').qtd"/></v-col>
              <v-col cols="12" md="3"><BaseComponent :mensagem="'Quantidade de Empresas Cadastrados'" :valor="relatorios.quantidade_usuarios_inscritos.find(u => u.role == 'empresa').qtd"/></v-col>
              <v-col cols="12" md="3"><BaseComponent :mensagem="'Quantidade de Administradores Cadastrados'" :valor="relatorios.quantidade_usuarios_inscritos.find(u => u.role == 'admin').qtd"/></v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      </v-row>
      <!-- {{relatorios}} -->
      </v-container>
    </v-app>
</template>

<script>
import VagasRecentes from '@/components/vagas/VagasRecentes.vue'
import HeaderBanners from '@/components/HeaderBanners.vue'
import BaseComponent from '@/components/BaseComponent.vue'
export default {

  data(){
    return{
      usuario: null,
      loading: false,
      relatorios: {},
    }
  },
  beforeMount(){

    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
  },
  mounted(){
      this.obterRelatorios();
  },

  components: {
    VagasRecentes,
    HeaderBanners,
    BaseComponent
  },

  methods:{
    obterRelatorios(){
      if(this.usuario){
        this.loading = true;
        // this.axios.get('http://10.3.152.220:3001/relatorios',{headers:{'Authorization':`Bearer ${this.usuario.token}`}})
        this.$axios.get('/relatorios',{headers:{'Authorization':`Bearer ${this.usuario.token}`}})
        .then(resp => {
          this.relatorios = resp.data;
          this.loading = false;
        }).catch(err =>{
          console.log(err);
          this.loading = false;
        })
      }
    }
  }
}
</script>

<style>

</style>