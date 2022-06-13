<template>
  <v-container fluid>
      <h2 class="text-center">Buscar Vagas</h2>
      <hr>
      <BuscarVagasComponent />
  </v-container>
</template>

<script>
import BuscarVagasComponent from '../components/vagas/BuscaVagasComponent.vue'
export default {
    components:{
        BuscarVagasComponent,
    }
}
</script>

<style>

</style>