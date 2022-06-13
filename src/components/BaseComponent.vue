<template>
  <v-container>

    <v-card>
        <v-card-text class="text-center">
            <h5>{{mensagem}}</h5>
            <v-divider></v-divider>
            <h3>{{valor}}</h3>
        </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props:['mensagem','valor']
}
</script>

<style>

</style>