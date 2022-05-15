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
      <v-row dense>
        <v-col cols="12" md="4" v-if="usuario ? usuario.usuario.role == 'admin' : false">
          <BaseComponent :mensagem="'Quantidade de vagas postadas'" :valor="'90 (valor fake)'" />
        </v-col>
        <v-col cols="12" md="4"><BaseComponent :mensagem="'Quantidade de respostas de vagas'" :valor="'350 (valor fake)'"/></v-col>
        <v-col cols="12" md="4"><BaseComponent :mensagem="'Quantidade de candidatos Cadastrados'" :valor="'800 (valor fake)'"/></v-col>
        <v-col cols="12" md="4"><BaseComponent :mensagem="'Quantidade de empresas Cadastradas'" :valor="'200 (valor fake)'"/></v-col>
      </v-row>
      </v-container>
    </v-app>
</template>

<script>
import VagasRecentes from '@/components/VagasRecentes.vue'
import HeaderBanners from '@/components/HeaderBanners.vue'
import BaseComponent from '@/components/BaseComponent.vue'
export default {

  data(){
    return{
      usuario: null,
    }
  },
  mounted(){
      this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
  },

  components: {
    VagasRecentes,
    HeaderBanners,
    BaseComponent
  },

  methods:{
    
  }
}
</script>

<style>

</style>