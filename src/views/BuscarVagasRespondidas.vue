<template>
  <v-container fluid>
      <h2 class="text-center">Ver Vagas Respondidas</h2>
      <hr>
      <BuscarVagasRespondidasComponent />
  </v-container>
</template>

<script>
import BuscarVagasRespondidasComponent from '../components/vagas/BuscaVagasRespondidasComponent.vue'
export default {
    components:{
        BuscarVagasRespondidasComponent,
    }
}
</script>

<style>

</style>