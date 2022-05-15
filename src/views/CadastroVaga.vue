<template>
  <div>
      <h2 class="text-center mt-3">Cadastrando uma nova vaga</h2>
      <v-divider></v-divider>
      <FormNovaVaga />
  </div>
</template>

<script>
import FormNovaVaga from '../components/NovaVagaForm.vue'
export default {
  components:{
    FormNovaVaga,
  }
}
</script>

<style>

</style>